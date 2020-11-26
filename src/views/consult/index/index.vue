<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>咨询管理</span>
			<!-- <el-button style="float: right; padding: 3px 0" type="text" @click="addCase">新增价格</el-button> -->
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
			<el-form-item label="车型">
				<el-input v-model="queryData.text" placeholder="请输入要查询的内容"></el-input>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input v-model="queryData.text" placeholder="请输入要查询的内容"></el-input>
			</el-form-item>
			<el-form-item label="系列">
				<el-input v-model="queryData.text" placeholder="请输入要查询的内容"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="queryFunc">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="carType" label="姓名"></el-table-column>
			<el-table-column prop="chemo" label="电话"></el-table-column>
			<el-table-column prop="price" label="车型"></el-table-column>
			<el-table-column prop="price" label="系列"></el-table-column>
			<el-table-column prop="price" sortable label="咨询时间"></el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="deleteBanner(scope.row.id)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<paginaTion :totalNum="0" @paginaClick="paginaClick"></paginaTion>
	</el-card>
	
</template>

<script>
	export default{
		data(){
			return{
				tableData: [{price:'2020-11-26 13:12:30'},{price:'2020-11-26 13:12:32'},{price:'2020-11-26 13:12:34'},{price:'2020-11-26 13:12:36'}],
				queryData: {
					text: '',
					pageNum: 1,
					pageSize: $globalData.pageSize
				},
			}
		},
		mounted() {
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
				
			},
			deleteBanner(id){
				this.$confirm('确定要删除吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (this.queryData.pageNum > 1) {
						this.queryData.pageNum = Math.ceil((this.pageData.total - 1) / $globalData.pageSize)
					}
					this.getPageData()
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.consult{
		
	}
</style>
