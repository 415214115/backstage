<template>
	<el-card class="content">
		<div slot="header" class="clearfix">
			<el-form :inline="true" :model="searchData" :rules="searchDataForm" class="demo-form-inline">
				<el-form-item label="用户类型名称">
					<el-input v-model="searchData.typeName" placeholder="用户手机"></el-input>
				</el-form-item>
				<el-form-item label="用户编码">
					<el-input v-model="searchData.typeDescribe" placeholder="用户手机"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
					<el-button type="primary" @click="onSubmit">重置</el-button>
					<el-button type="primary" class="addUserBtn" @click="addUser = true" icon="el-icon-plus">添加用户类型</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="date" label="用户类型编码"> </el-table-column>
			<el-table-column prop="name" label="用户类型名称"> </el-table-column>
			<el-table-column prop="name" label="类型描述"> </el-table-column>
			<el-table-column prop="name" label="创建时间"> </el-table-column>
			<el-table-column prop="address" label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
					<el-button type="text" size="small" class="deleteBtn">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagina-tion></pagina-tion>
		<el-dialog :title="dialogTitle" :visible.sync="addUser" width="500px" :before-close="handleClose">
			<div class="adduserForm">
				<el-form label-width="100px">
					<el-form-item label="用户类型名称">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="用户类型描述">
						<el-input></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addUser = false">取 消</el-button>
				<el-button type="primary" @click="addUser = false">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				addUser: false,
				dialogTitle: '新增用户',
				searchData: {
					typeName: '',
					typeDescribe: '',
					page: 1,
					pageSize: $globalData.pageSize
				},
				searchDataForm:{
					
				},
				addForm: {

				},
				pageData: '',
				tableData: [{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}
				]
			}
		},
		mounted() {
			this.getPageData()
		},
		methods: {
			getPageData(){
				this.$request.get(this.$api.queryUserType, this.searchData).then( res => {
					if(res.code == 200){
						this.pageData = res.data
						this.tableData = this.pageData.items
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.el-form-item {
		margin-bottom: 0 !important;
	}

	.adduserForm .el-form-item {
		margin-bottom: 10px !important;
	}

	.addUserBtn {
		float: right;
	}
</style>
