<template>
	<el-card>
		<div slot="header" class="clearfix">
		    <span>资讯管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="addCase">新增资讯</el-button>
		  </div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="title" label="标题"></el-table-column>
		    <el-table-column label="封面图">
				<template slot-scope="scope">
					<el-image class="bannerImage" :src="scope.row.cover" fit="cover"></el-image>
				  </template>
			</el-table-column>
			<!-- <el-table-column label="内容">
				<template slot-scope="scope">
					<div v-html="scope.row.context"></div>
				  </template>
			</el-table-column> -->
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="deleteBanner(scope.row.id)" type="text">删除</el-button>
				  </template>
			</el-table-column>
		  </el-table>
		  <paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
	</el-card>
</template>

<script>
	export default{
		data(){
			return{
				tableData: [],
				queryData: {
					pageNum: 1,
					pageSize: $globalData.pageSize
				},
				pageData: ''
			}
		},
		mounted() {
			this.getSelectInformations()
		},
		methods:{
			addCase(){
				this.$router.push('/information/addinformation')
			},
			paginaClick(page){
				this.queryData.pageNum = page
				this.getSelectInformations()
			},
			getSelectInformations(){
				// selectInformations
				this.$request.postJson(this.$api.selectInformations, this.queryData).then(res => {
					if (res.code == 'succes') {
						this.pageData = res.data
						this.tableData = this.pageData.list
					}
				})
			},
			deleteBanner(id){
				this.$confirm('此操作将永久删除该资讯, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.queryData.pageNum > 1){
						this.queryData.pageNum = Math.ceil((this.pageData.total - 1) / $globalData.pageSize)
					}
					this.$request.postJson(this.$api.delInformation, {
						id: id
					}).then(res => {
						if (res.code == 'succes') {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getSelectInformations()
						}
					})
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.bannerImage{
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}
	
</style>
