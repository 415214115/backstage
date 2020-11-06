<template>
	<el-card>
		<div slot="header" class="clearfix">
		    <span>案例管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="addCase">新增案例</el-button>
		  </div>
		  <el-form :inline="true"  class="demo-form-inline" :model="searchData">
		    <!-- <el-form-item label="标题">
		      <el-input  placeholder="标题"></el-input>
		    </el-form-item> -->
			<el-form-item label="案例类型">
			  <el-select v-model="searchData.showType" placeholder="请选择">
				  <el-option  label="全部" value=""></el-option>
			      <el-option  label="精彩案例" value="1"></el-option>
				  <el-option  label="最新案例" value="1"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="车辆颜色">
			  <el-select v-model="searchData.colorId" placeholder="请选择">
				  <el-option  label="全部" value=""></el-option>
			      <el-option  label="item.label" value="item.value"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="贴膜类型">
			  <el-select v-model="searchData.chemoId" placeholder="请选择">
				  <el-option  label="全部" value=""></el-option>
			      <el-option  label="item.label" value="item.value"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="车辆类型">
			  <el-select v-model="searchData.typeId" placeholder="请选择">
				  <el-option  label="全部" value=""></el-option>
			      <el-option  label="item.label" value="item.value"></el-option>
			    </el-select>
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
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button @click="deleteBanner(scope.row)" type="text">设为最新案例</el-button>
					<el-button @click="deleteBanner(scope.row)" type="text">设为精彩案例</el-button>
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
				tableData: [],
				searchData: {
					showType: '',
					colorId: '红色',
					chemoId: '',
					typeId: '',
					pageNum: 1,
					pageSize: this.$globalData.pageSize
				}
			}
		},
		mounted() {
			this.getCaseData()
		},
		methods:{
			editorBanner(row){
				// 编辑轮播图
				this.dialogTitle = row.name
				this.dialogVisible = true
			},
			addCase(){
				this.$router.push('/casemanage/addcase')
			},
			editorCase(row){
				this.$router.push(`/casemanage/details/${row.id}`)
			},
			getCaseData(){
				this.$request.postJson(this.$api.selectAnLi, this.searchData).then( res => {
					if(res.code == 'succes'){
						
					}
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
