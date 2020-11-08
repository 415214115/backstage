<template>
	<el-card>
		<div slot="header" class="clearfix">
		    <span>资讯管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="addCase">新增资讯</el-button>
		  </div>
		  <!-- <el-form :inline="true"  class="demo-form-inline">
		    <el-form-item label="标题">
		      <el-input  placeholder="标题"></el-input>
		    </el-form-item>
		    <el-form-item>
		      <el-button type="primary" icon="el-icon-search">查询</el-button>
		    </el-form-item>
		  </el-form> -->
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="title" label="标题"></el-table-column>
		    <el-table-column label="封面图">
				<template slot-scope="scope">
					<el-image class="bannerImage" :src="scope.row.cover" fit="cover"></el-image>
				  </template>
			</el-table-column>
			<el-table-column prop="context" label="内容"></el-table-column>
			<!-- <el-table-column prop="address" label="浏览次数"></el-table-column> -->
		    <!-- <el-table-column prop="creatTime" label="创建时间"></el-table-column> -->
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<!-- <el-button @click="deleteBanner(scope.row)" type="text">设为热门</el-button>
					<el-button @click="deleteBanner(scope.row)" type="text">取消热门</el-button>
					<el-button type="text" @click="editorCase(scope.row)">查看</el-button> -->
					<el-button @click="deleteBanner(scope.row.id)" type="text">删除</el-button>
				  </template>
			</el-table-column>
		  </el-table>
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
				}
			}
		},
		mounted() {
			this.getSelectInformations()
		},
		methods:{
			// editorBanner(row){
			// 	// 编辑轮播图
			// 	this.dialogTitle = row.name
			// 	this.dialogVisible = true
			// },
			addCase(){
				this.$router.push('/information/addinformation')
			},
			// editorCase(row){
			// 	this.$router.push(`/information/details/${row.id}`)
			// }
			getSelectInformations(){
				// selectInformations
				this.$request.postJson(this.$api.selectInformations, this.queryData).then(res => {
					if (res.code == 'succes') {
						this.tableData = res.data.list
					}
				})
			},
			deleteBanner(id){
				this.$confirm('此操作将永久删除该资讯, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
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
