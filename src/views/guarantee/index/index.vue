<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>质保卡管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="add">新增质保卡</el-button>
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
		  <el-form-item label="手机号码">
		    <el-input v-model="queryData.phone" placeholder="手机号码"></el-input>
		  </el-form-item>
		  <el-form-item label="车牌号码">
		    <el-input  v-model="queryData.carNum" placeholder="车牌号码"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" icon="el-icon-search" @click="queryFunc">查询</el-button>
		  </el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="userName" label="客户姓名"></el-table-column>
			<el-table-column prop="phone" label="手机号码"></el-table-column>
			<el-table-column prop="carType" label="受保车型"></el-table-column>
			<el-table-column prop="carNum" label="车牌号码"></el-table-column>
			<el-table-column prop="chemoName" label="施工膜类"></el-table-column>
			<el-table-column prop="updateTime" label="质保日期"></el-table-column>
			<el-table-column prop="createTime" label="交车日期"></el-table-column>
			<el-table-column prop="storeName" label="施工店铺"></el-table-column>
			<el-table-column prop="price" label="整车价格"></el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="deleteRow(scope.row.id)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				queryData: {
					phone: '',
					carNum: '',
					pageNum: 1,
					pageSize: $globalData.pageSize
				},
				pageData: ''
			}
		},
		mounted() {
			this.getSelectUserTypeList()
		},
		methods: {
			add() {
				// 新增质保卡
				this.$router.push('/guarantee/add')
			},
			queryFunc(){
				this.queryData.pageNum = 1
				this.getSelectUserTypeList()
			},
			paginaClick(page){
				this.queryData.pageNum = page
				this.getSelectUserTypeList()
			},
			getSelectUserTypeList(){
				this.$request.postJson(this.$api.selectUserTypeList, this.queryData).then( res => {
					if (res.code == 'succes'){
						this.pageData = res.data
						this.tableData = this.pageData.list
					}
				})
			},
			deleteRow(id){
				this.$confirm('此操作将永久删除该质保卡信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.queryData.pageNum > 1){
											this.queryData.pageNum = Math.ceil((this.pageData.total - 1) / $globalData.pageSize)
										}
					this.$request.postJson(this.$api.delUserTypeList, {
						id: id
					}).then(res => {
						if (res.code == 'succes') {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getSelectUserTypeList()
						}
					})
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.bannerImage {
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}
</style>
