<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>咨询管理</span>
			<!-- <el-button style="float: right; padding: 3px 0" type="text" @click="addCase">新增价格</el-button> -->
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
			<!-- <el-form-item label="车型">
				<el-input v-model="queryData.text" placeholder="请输入要查询的内容"></el-input>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input v-model="queryData.text" placeholder="请输入要查询的内容"></el-input>
			</el-form-item> -->
			<el-form-item label="系列">
				<el-select v-model="queryData.chemoId" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
				    <el-option v-for="item in carSeries" :key="item.id" :label="item.name" :value="item.id"></el-option>
				  </el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="queryFunc">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="pageData.list" border style="width: 100%">
			<el-table-column prop="userName" label="姓名"></el-table-column>
			<el-table-column prop="phone" label="电话"></el-table-column>
			<el-table-column prop="carTypeId" label="车型"></el-table-column>
			<el-table-column prop="chemoName" label="系列"></el-table-column>
			<el-table-column prop="createTime" sortable label="咨询时间"></el-table-column>
			<!-- <el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="deleteBanner(scope.row.id)" type="text">删除</el-button>
				</template>
			</el-table-column> -->
		</el-table>
		<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
	</el-card>
	
</template>

<script>
	export default{
		data(){
			return{
				carSeries: '',
				tableData: [],
				queryData: {
					chemoId: '',
					pageNum: 1,
					pageSize: $globalData.pageSize,
					youke: '1'
				},
				pageData: ''
			}
		},
		mounted() {
			this.getCheMo()
			this.getPageData()
			
		},
		methods:{
			queryFunc(){
				this.queryData.pageNum = 1
				this.getPageData()
			},
			paginaClick(val){
				this.queryData.pageNum = val
				this.getPageData()
			},
			getPageData(){
				this.$request.postJson('/back/selectCarType', this.queryData).then(res => {
					if (res.code == 'succes') {
						this.pageData = res.data
					}
				})
			},
			// deleteBanner(id){
			// 	this.$confirm('确定要删除吗?', '提示', {
			// 		confirmButtonText: '确定',
			// 		cancelButtonText: '取消',
			// 		type: 'warning'
			// 	}).then(() => {
			// 		if (this.queryData.pageNum > 1) {
			// 			this.queryData.pageNum = Math.ceil((this.pageData.total - 1) / $globalData.pageSize)
			// 		}
			// 		this.getPageData()
			// 	})
			// },
			getCheMo() {
				this.$request.postJson('/car/selectCheMoList', {
					pageNum: 1,
					pageSize: 20000
				}).then(res => {
					if (res.code == 'succes') {
						this.carSeries = res.data.list
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.consult{
		
	}
</style>
