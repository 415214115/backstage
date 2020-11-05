<template>
	<el-card class="content">
		<div slot="header" class="clearfix">
			<el-form :inline="true" :model="searchData" :rules="searchForm" class="demo-form-inline" ref="searchForm">
				<el-form-item label="系统名称" prop="sysName">
					<el-input v-model="searchData.sysName" placeholder="系统名称"></el-input>
				</el-form-item>
				<el-form-item label="系统编码" prop="sysCode">
					<el-input v-model="searchData.sysCode" placeholder="系统编码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchForms" icon="el-icon-search">查询</el-button>
					<el-button type="primary" @click="searchFormRules('searchForm')">重置</el-button>
					<el-button type="primary" @click="addSys" icon="el-icon-plus">添加</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="sysName" label="系统名称"> </el-table-column>
			<el-table-column prop="sysCode" label="系统编码"> </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="editorSys(scope.row)" type="text" size="small">编辑</el-button>
					<el-button type="text" @click="deleteSys(scope.row)" size="small" class="deleteBtn">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagina-tion v-if="tableData.length > 0" :totalNum="pageData.totalNum" @paginaClick="paginaClick"></pagina-tion>
		<el-dialog :title="dialogTitle" :visible.sync="addSysPop" width="500px" @close="addSysClose('addSysForm')">
			<div class="adduserForm">
				<el-form label-width="100px" class="addSysForm" ref="addSysForm" :model="addSysForm" :rules="addSysFormRules">
					<el-form-item label="系统名称" prop="sysName">
						<el-input v-model="addSysForm.sysName" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="系统编码" prop="sysCode">
						<el-input v-model="addSysForm.sysCode" :validate-event="false"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addSysClose('addSysForm')">取 消</el-button>
				<el-button type="primary" @click="addSysConfirm('addSysForm')">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				addSysPop: false,
				dialogTitle: '新增所属系统',
				searchData: {
					sysName: '',
					sysCode: '',
					page: 1,
					pageSize: $globalData.pageSize
				},
				searchForm: {
					sysName: [],
					sysCode: []
				},
				pageData: '',
				tableData: [],
				addSysForm: {
					sysName: '',
					sysCode: ''
				},
				addSysFormRules: {
					sysName: [{
						required: true,
						min: 1, max: 20,
						message: '系统名称长度在1-20个字符'
					}],
					sysCode: [{
						required: true,
						min: 1, max: 20,
						message: '系统编码长度在1-20个字符'
					}]
				}
			}
		},
		mounted() {
			this.getPageData()
		},
		methods: {
			searchFormRules(e) {
				// 清空查询表单
				if (this.searchData.sysName != '' || this.searchData.sysCode != '') {
					// 避免用户在没有使用查询之前误点重置按钮
					this.$refs[e].resetFields();
					this.getPageData()
				}
			},
			getPageData() {
				this.$request.get(this.$api.querySystem, this.searchData).then(res => {
					if (res.code == 200) {
						this.pageData = res.data
						this.tableData = this.pageData.items
					}
				})
			},
			paginaClick(e) {
				// 分页点击事件
				this.searchData.page = e
				this.getPageData()
			},
			searchForms() {
				// 条件查询
				this.searchData.page = 1
				this.getPageData()
			},
			addSysClose(e) {
				// 添加或编辑系统确定按钮弹窗关闭
				this.addSysPop = false
				this.$refs[e].resetFields();
				this.addSysForm.id = ''
				this.addSysForm.sysName = ''
				this.addSysForm.sysCode = ''
				console.log(this.addSysForm)
			},
			addSysConfirm(e) {
				// 添加或编辑系统确定按钮
				this.$refs[e].validate((valid) => {
					if (valid) {
						let reqUrl = ''
						if (this.dialogTitle == '新增所属系统') {
							reqUrl = this.$api.saveSystem
						} else {
							reqUrl = this.$api.updateSystem
						}
						this.$request.postForm(reqUrl, this.addSysForm).then(res => {
							if(res.code == 200){
								this.$message.success('操作成功')
								this.addSysPop = false
								this.getPageData()
							}
						})
					} else {
						this.$message.error('请认真核对输入信息！')
						return false;
					}
				});
			},
			addSys() {
				// 添加所属系统
				this.dialogTitle = '新增所属系统'
				this.addSysPop = true
			},
			editorSys(row) {
				// 编辑所属系统
				this.dialogTitle = '编辑所属系统'
				this.addSysForm.id = row.id
				this.addSysForm.sysName = row.sysName
				this.addSysForm.sysCode = row.sysCode
				this.addSysPop = true
			},
			deleteSys(row) {
				// 删除所属系统
				this.$confirm('确定要删除该所属系统吗?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  this.$request.postForm(this.$api.removeSystem, {
					  id: row.id
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

	.adduserForm .el-form-item {
		margin-bottom: 20px !important;
	}
	
</style>
