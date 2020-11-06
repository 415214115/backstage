<template>
	<el-card>
		<div slot="header" class="clearfix">
		    <span>资讯管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="addCase">新增资讯</el-button>
		  </div>
		  <el-form :inline="true"  class="demo-form-inline">
		    <el-form-item label="标题">
		      <el-input  placeholder="标题"></el-input>
		    </el-form-item>
		    <el-form-item>
		      <el-button type="primary" icon="el-icon-search">查询</el-button>
		    </el-form-item>
		  </el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="标题"></el-table-column>
		    <el-table-column prop="date" label="封面图">
				<template slot-scope="scope">
					<el-image class="bannerImage" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image>
				  </template>
			</el-table-column>
			<el-table-column prop="address" label="简介"></el-table-column>
			<el-table-column prop="address" label="浏览次数"></el-table-column>
		    <el-table-column prop="address" label="创建时间"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="deleteBanner(scope.row)" type="text">设为热门</el-button>
					<el-button @click="deleteBanner(scope.row)" type="text">取消热门</el-button>
					<el-button type="text" @click="editorCase(scope.row)">查看</el-button>
					<el-button @click="deleteBanner(scope.row)" type="text">删除</el-button>
				  </template>
			</el-table-column>
		  </el-table>
	</el-card>
</template>

<script>
	export default{
		data(){
			return{
				tableData: [
					{
						name: '最新案例',
						id: '1',
						address: '1'
					},
					{
						name: '精彩案例',
						id: '1',
						address: '1'
					}
				]
			}
		},
		methods:{
			editorBanner(row){
				// 编辑轮播图
				this.dialogTitle = row.name
				this.dialogVisible = true
			},
			addCase(){
				this.$router.push('/information/addinformation')
			},
			editorCase(row){
				this.$router.push(`/information/details/${row.id}`)
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
