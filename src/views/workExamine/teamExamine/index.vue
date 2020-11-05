<template>
	<div>
		<el-card class="examine">
			<div class="examineTipBox">
				<div class="examineTipTitle">我的待办</div>
				<div class="examineTipCont">{{ statistics.pendingApproval?statistics.pendingApproval:0 }}个待审批</div>
			</div>
			<div class="examineTipBr"></div>
			<div class="examineTipBox">
				<div class="examineTipTitle">本周完成审批</div>
				<div class="examineTipCont">{{ statistics.approvalCompleted?statistics.approvalCompleted:0 }}个审批</div>
			</div>
			<div class="examineTipBr"></div>
			<div class="examineTipBox">
				<div class="examineTipTitle">本周拒绝审批</div>
				<div class="examineTipCont">{{ statistics.rejectApproval?statistics.rejectApproval:0 }}个审批</div>
			</div>
		</el-card>
		<el-card class="content">
			<div slot="header" class="clearfix">
				<el-form :inline="true" :model="searchData" :rules="searchRules" ref="searchData" class="demo-form-inline">
					<!-- <el-form-item label="申请人" prop="name">
						<el-input v-model="searchData.name" :validate-event="false" placeholder="输入申请人姓名"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phone">
						<el-input v-model="searchData.phone" :validate-event="false" placeholder="输入申请人手机号"></el-input>
					</el-form-item>
					<el-form-item label="身份证号" prop="cardId">
						<el-input v-model="searchData.cardId" :validate-event="false" placeholder="输入申请人身份证号"></el-input>
					</el-form-item>
					<el-form-item label="企业名称" prop="enterpriseName">
						<el-input v-model="searchData.enterpriseName" :validate-event="false" placeholder="输入企业名称"></el-input>
					</el-form-item> -->
					<el-form-item label="审批状态" prop="state">
						<el-select v-model="searchData.state" :validate-event="false" placeholder="选择审批状态">
							<el-option label="审核中" value="PROCESS"></el-option>
							<el-option label="审核通过" value="SUCCESS"></el-option>
							<el-option label="审核失败" value="FAIL"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="searchSubmit('searchData')" icon="el-icon-search">查询</el-button>
						<el-button type="primary" @click="replacement('searchData')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="name" label="申请人"> </el-table-column>
				<el-table-column prop="phone" label="手机号"> </el-table-column>
				<el-table-column prop="cardId" label="身份证号"> </el-table-column>
				<!-- <el-table-column prop="enterpriseName" label="企业名称"> </el-table-column> -->
				<el-table-column prop="createDate" label="申请时间"> </el-table-column>
				<el-table-column prop="state" label="审批状态"> 
					<template slot-scope="scope">
						{{ scope.row.state == 'SUCCESS' ? '审核通过' : scope.row.state == 'PROCESS' ? '审核中' : '审核失败' }}
					</template>
				</el-table-column>
				<el-table-column prop="remarks" label="备注"> </el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="tableOperation(scope.row, 1)" v-if="scope.row.state == 'PROCESS'" type="text" size="small">进入审批</el-button>
						<el-button @click="tableOperation(scope.row, 2)" v-if="scope.row.state != 'SUCCESS'" type="text" size="small">删除申请</el-button>
						<el-button @click="tableOperation(scope.row, 3)" type="text" size="small" v-if="scope.row.state != 'PROCESS'"  class="deleteBtn">审批详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<pagina-tion v-if="tableData.length > 0" :totalNum="pageData.totalNum" @paginaClick="paginaClick"></pagina-tion>
		</el-card>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				searchData:{
					// name: '', // 姓名
					// cardId: '', // 身份证号
					// phone: '', // 手机号
					// enterpriseName: '', // 企业名称
					state: '', // 审核状态
					page: 1, // 当前页
					pageSize: $globalData.pageSize // 页大小
				},
				searchRules:{
					name:[],
					cardId:[],
					phone:[],
					enterpriseName:[],
					state:[],
				},
				pageData: '',
				tableData: [],
				statistics:{
					pendingApproval: 0,//待审批
					approvalCompleted: 0,//完成审批
					rejectApproval: 0//拒绝审批
				}
			}
		},
		mounted() {
			this.getPageData()
			this.getTopData()
		},
		methods:{
			searchSubmit(e){
				// 搜索
				this.searchData.page = 1
				this.getPageData()
			},
			replacement(e){
				// 搜索条件重置
				this.$refs[e].resetFields();
				this.getPageData()
			},
			paginaClick(e){
				// 分页组件点击事件
				this.searchData.page = e
				this.getPageData()
			},
			getPageData(){
				this.$request.get(this.$api.queryAgentCheckList, this.searchData).then( res => {
					if(res.code == 200){
						this.pageData = res.data
						console.log(this.pageData);
						this.tableData = this.pageData.items						
						this.statistics.pendingApproval = this.tableData[0].pendingApproval					
						this.statistics.approvalCompleted = this.tableData[0].approvalCompleted
						this.statistics.rejectApproval = this.tableData[0].rejectApproval
					}
				})
			},
			getTopData(){
				this.$request.get(this.$api.queryAgentCheckTop).then(res=>{
						if(res.code==200){						
						this.statistics.pendingApproval = res.data.pendingApproval					
						this.statistics.approvalCompleted = res.data.approvalCompleted
						this.statistics.rejectApproval = res.data.rejectApproval
						}
				})
			},
			tableOperation(row, type){
				// 表格操作事件分发
				// type   1进入审批2删除申请3审批详情
				if(type == 1 || type == 3){
					this.toExamine(row.id, type)
				} else if(type == 2){
					this.deleteExamine(row.id, type)
				}
			},
			toExamine(id, type){
				// 查看详情，，进行审批
				this.$router.push(`/workexamine/examinedetails?id=${id}&type=${type}`)
			},
			deleteExamine(id, type){
				// 删除该审批
				this.$confirm('确定要删除该审批吗?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  this.$request.postForm(this.$api.removeAgentCheck, {
					  id: id
				  }).then( res => {
				  	if(res.code == 200){
				  		this.$message.success(res.message || '操作成功')
						this.searchData.page = Math.ceil((Number(this.pageData.totalNum) - 1) / $globalData.pageSize)
				  		this.getPageData()
				  	}
				  })
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.el-form-item {
		margin-bottom: 0 !important;
	}
	.examine>>>.el-card__body{
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		align-items: center;
	}
	.examineTipBr{
		width: 1px;
		height: 60px;
		background: #eeeeee;
	}
	.examineTipBox{
		width: 33%;
		text-align: center;
	}
	.examineTipTitle{
		color: #8c8c8c;
		margin-bottom: 20px;
	}
	.examineTipCont{
		font-size: 24px;
		color: #333333;
	}
	.content{
		margin-top: 20px;
		min-height: 765px;
	}
</style>
