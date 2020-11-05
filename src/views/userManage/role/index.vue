<!--角色所拥有的菜单权限查询 因为该接口需要行类row参数 导致下拉框 change方法调用时会出现问题-->

<template>
	<el-card class="content">
		<div slot="header" class="clearfix">
			<el-form :inline="true" :model="searchData" :rules="searchRules" ref="searchData" class="demo-form-inline">
				<el-form-item label="角色名称" prop="name">
					<el-input v-model="searchData.name" placeholder="角色名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
					<el-button type="primary" @click="rulesSearch('searchData')">重置</el-button>
					<el-button type="primary" class="addUserBtn" @click="addOrEditerRole" icon="el-icon-plus">添加</el-button>
				</el-form-item>
			</el-form>
		</div>
		<eltable :tableData="tableData" @tableOperation="tableOperation"></eltable>
		<pagina-tion v-if="tableData.length > 0" :totalNum="pageData.totalNum" @paginaClick="paginaClick"></pagina-tion>
		<el-dialog :title="dialogTitle" :visible.sync="addOrEditerRoleDialog" width="500px" @close="closeAddRoleDialog()">
			<div class="adduserForm">
				<el-form label-width="100px" ref="addOrEditerForm" :model="addForm" :rules="addFormRules">
					<el-form-item label="角色名称" prop="name">
						<el-input v-model="addForm.name" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="角色描述" prop="description">
						<el-input v-model="addForm.description" :validate-event="false"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeAddRoleDialog()">取 消</el-button>
				<el-button type="primary" @click="roleDialogConfirm('addOrEditerForm')">确 定</el-button>
			</span>
		</el-dialog>

<<<<<<< HEAD
	<!-- web权限分配弹框 -->
	<!-- 	<el-dialog :title="webDialogTitle" :visible.sync="webAddOrEditerRoleDialog" width="50%">
			<el-tree
				:data="webDeiteorList"
				show-checkbox
				default-expand-all				
				:props="treeProps"
				node-key="id"
				:default-checked-keys="defKeys"
				ref="treeRef"
				>
=======
		<!-- web权限分配弹框 -->
		<el-dialog :title="webDialogTitle" :visible.sync="webAddOrEditerRoleDialog" width="50%">
			<!--下拉框-->
			<el-select v-model="value" placeholder="请选择" @change="tabsClick">
				<el-option :label="item.sysName" v-for="(item, index) in tabsDataList" :name="item.id" :key="item.id" :value="item.id">
				</el-option>
			</el-select>
			<!--树形控件-->
			<el-tree :data="webDeiteorList" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys"
			 :props="treeProps" ref="treeRef">
>>>>>>> 2266c85aaead05f8f8d8d3101ffd4ec2e3a3cc99
			</el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeWebRoleDialog()">取消</el-button>
				<el-button type="primary" @click="webDialogDetermine()">确定</el-button>
			</span>
<<<<<<< HEAD
		</el-dialog> -->
<!-- app权限分配弹框 -->
<el-dialog :title="appDialogTitle"  :visible.sync="appAddOrEditerRoleDialog" width="50%">
=======
		</el-dialog>
		<!-- app权限分配弹框 -->
		<el-dialog :title="appDialogTitle" :visible.sync="appAddOrEditerRoleDialog" width="50%">
>>>>>>> 2266c85aaead05f8f8d8d3101ffd4ec2e3a3cc99
			<!--树形控件-->
			<el-tree :data="appDeiteorList" show-checkbox default-expand-all node-key="id" :props="appTreeProps">
			</el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button>取消</el-button>
				<el-button type="primary">确定</el-button>
			</span>
		</el-dialog>

		<!-- 权限弹框 -->
		<el-dialog :title="dialogTitle" width="500px" @close="closeAddRoleDialog()">
			<div class="adduserForm">
				<el-form label-width="100px" ref="addOrEditerForm" :model="addForm" :rules="addFormRules">
					<el-form-item label="权限名称" prop="name">
						<el-input v-model="addForm.name" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="权限描述" prop="description">
						<el-input v-model="addForm.description" :validate-event="false"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeAddRoleDialog()">取 消</el-button>
				<el-button type="primary" @click="roleDialogConfirm('addOrEditerForm')">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	import eltable from './components/elTable.vue'
	export default {
		components: {
			eltable
		},
		data() {
			return {
				value: '',
				addOrEditerRoleDialog: false,
				webAddOrEditerRoleDialog: false, //web权限弹框
				appAddOrEditerRoleDialog: false, //app权限弹框
				dialogTitle: '新增角色',
				webDialogTitle: '',
				appDialogTitle: '',
				searchData: {
					name: '',
					page: 1,
					pageSize: $globalData.pageSize,
					sysId: '',
					name: ''
				},
				searchRules: {
					name: []
				},
				tabsData: '',
				pageData: '',
				tabsDataList: '',
				webDeiteorList: [], //存储角色对应的权限菜单
				appDeiteorList: [],
				//默认选中的节点ID值数组
				defKeys: [],
				treeProps: {
					label: 'menuName',
					children: 'children'
				},
				appTreeProps: {
					label: 'menuName',
					children: 'children'
				},
				tableData: [],
				addForm: {
					name: '',
					description: '',
					sysId: ''
				},
				addFormRules: {
					name: [{
						required: true,
						message: '请输入角色名称'
					}],
					description: [{
						required: true,
						message: '请输入角色描述'
					}]
				},
				//web权限分配所传的数据
				webAssigin: {
					permissionId: '', //角色id
					sysId: '' //权限id
				},
				//web权限分配确定按钮所传的数据	
				webSureAssigin: {
					permissionId: '',
					menuId: []
				},
			}
		},
		mounted() {
			this.getSysmenu()
			this.getPageData()
		},
		methods: {
			tabsClick(val) {
				// 下拉框切换
				this.searchData.sysId = val;
				this.searchData.page = 1
				//调用查询角色菜单方法

				this.getPageData()
			},
			paginaClick(e) {
				// 分页组件点击事件
				this.searchData.page = e
				this.getPageData()
			},
			getPageData() {
				this.$request.get(this.$api.queryRole, this.searchData).then(res => {
					if (res.code == 200) {
						this.pageData = res.data
						this.tableData = this.pageData.items
					}
				})
			},
			//表头渲染系统名称
			getSysmenu() {
				this.$request.get(this.$api.querySystemNoPage, this.searchData).then(res => {
					if (res.code == 200) {
						this.tabsDataList = res.data
						this.searchData.sysId = this.tabsData = this.tabsDataList[0].id
					}
					if (this.tabsData) {
						this.getPageData()
					}
				})

			},

			search() {
				// 条件筛选
				this.searchData.page = 1
				this.getPageData()
			},
			rulesSearch(e) {
				// 重置表单
				if (this.searchData.name != '') {
					// 避免用户在没有使用查询之前误点重置按钮
					this.$refs[e].resetFields();
					this.getPageData()
				}
			},
			roleDialogConfirm(e) {
				// 添加角色或者编辑角色
				let reqApi = ''
				this.$refs[e].validate(validate => {
					if (validate) {
						if (this.dialogTitle == '新增角色') {
							reqApi = this.$api.saveRole
						} else {
							reqApi = this.$api.updateRole
							//删除createTime操作，避免报错							
							delete this.addForm.createTime
						}
						this.addForm.sysId = this.searchData.sysId
						this.$request.postForm(reqApi, this.addForm).then(res => {
							if (res.code == 200) {
								this.$message.success(res.message || '操作成功')
								if (this.dialogTitle == '新增角色') {
									this.searchData.page = 1
								}
								this.getPageData()
								this.closeAddRoleDialog(e)
							}
						})
					} else {
						this.$message.error('请认真核对输入信息！')
						return false;
					}
				})
			},
			tableOperation(row, type) {
				// 表格操作事件分发
				// type   1编辑2删除3web权限分配4APP权限分配
				if(type == 1){
					this.editeorRole(row)
				} else if (type == 2) {
					this.deleteRole(row)
				}else if(type==3){
					this.$router.push(`/usermanage/jurisdiction/${row.id}`)
					// this.webDeiteorLimit(row)
				}else if(type==4){
					this.appDeiteorLimit(row)
				}

				// console.log(row)
			},
			editeorRole(row) {
				// 编辑角色
				this.dialogTitle = '编辑角色'
				this.addForm = row
				// this.addForm.id = row.id
				// this.addForm.name = row.name
				// this.addForm.description = row.description

				this.addOrEditerRoleDialog = true
			},
			deleteRole(row) {
				// 删除角色
				this.$confirm('确定要删除该角色吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$request.get(this.$api.removeRole, {
						id: row.id
					}).then(res => {
						if (res.code == 200) {
							this.$message.success(res.message || '操作成功')
							this.searchData.page = Math.ceil((Number(this.pageData.totalNum) - 1) / $globalData.pageSize)
							this.getPageData()
						}
					})
				})
			},
		//编辑web权限
			// webDeiteorLimit(row){	
			// 	this.webAssigin.permissionId = row.id //获取角色id									
			// 	this.webAddOrEditerRoleDialog = true;
			// 	this.webDialogTitle = 'web权限菜单'
			// 		this.$request.get(this.$api.queryMenuNoPage).then( res => {
			// 		if(res.code == 200){					
			// 			this.webDeiteorList = res.data	
			// 			let menuId = this.webDeiteorList//取菜单id				 					
			// 			for(var key of menuId){
			// 				this.webAssigin.menuId=key.id
			// 			}																							
			// 		}
			// 	})								
			// },
		//web权限分配确定
		// webDialogDetermine(){
		// 	this.$request.postForm(this.$api.saveRoleMenu,this.webAssigin).then(res=>{
		// 		if(res.code==200){
		// 			this.$message.success('分配权限成功')
		// 			console.log(res.data,11111)
		// 			this.closeWebRoleDialog()
		// 		}else{
		// 			this.$message.error('分配权限失败')
		// 		    return false;	
		// 		}
		// 	})		
		// },		
		//编辑app权限
		// appDeiteorLimit(row){
			//编辑web权限
			webDeiteorLimit(row) {
				this.defKeys = []
				this.webAddOrEditerRoleDialog = true;
				this.webDialogTitle = 'web权限菜单'
				this.webAssigin.permissionId = row.id //获取角色id	
				this.webSureAssigin.permissionId = row.id //获取角色id										
				this.webAssigin.sysId = this.searchData.sysId //获取系统id
				this.$request.get(this.$api.queryRoleMenu, this.webAssigin).then(res => {
					if (res.code == 200) {
						this.webDeiteorList = res.data
						this.webDeiteorList.forEach((v) => {
							if (v.isHave) {
								this.defKeys.push(v.id)
							}
							if (v.children && v.children.length > 0) {
								v.children.forEach((v) => {
									if (v.isHave) {
										this.defKeys.push(v.id)
									}
									this.getSelectKey(v.children)
								})
							}

						})

						console.log(this.defKeys, 5555);
					}
				})

			},

			//通过isHave判断这个节点是否为选中的状态，用递归的方式将所有选中的数据的id放在数组this.defKeys里面
			getSelectKey(list) {
				if (list.children && list.children.length > 0) {
					list.forEach((ele) => {
						if (ele.isHave) {
							this.defKeys.push(ele.id)
						}
						this.getSelectKey(ele.children)
					})
				}
				return list
			},
			//拿到所有选中的id之后,将对应的menuName默认选中	
			checkedKeys(val) {
				this.$refs.treeRef.setCheckedKeys([]) // 先清空选中
				this.$nextTick(() => {
					const that = this
					val.forEach((i, n) => {
						const node = that.$refs.treeRef.getNode(i)
						if (node.isLeaf) {
							that.$refs.treeRef.setChecked(node, true)
						}
					})
				})
			},
			//web权限分配确定
			webDialogDetermine() {
				//获取权限勾选的已选中和半选中的操作，赋值给menuId		
				let muenKeys = [
					...this.$refs.treeRef.getCheckedKeys(),
					...this.$refs.treeRef.getHalfCheckedKeys()
				]
				let keysStr = muenKeys.join(',')
				this.webSureAssigin.menuId = keysStr
				this.$request.postForm(this.$api.saveRoleMenu, this.webSureAssigin).then(res => {
					if (res.code == 200) {
						this.$message.success('分配权限成功')
						this.closeWebRoleDialog()
					} else {
						this.$message.error('分配权限失败')
						return false;
					}
				})
			},
			//编辑app权限
			appDeiteorLimit(row) {
				this.appDialogTitle = 'app权限菜单'
				this.appAddOrEditerRoleDialog = true
				this.$request.get(this.$api.getAppMenu).then(res => {
					if (res.code == 200) {
						this.appDeiteorList = res.data

					}
				})
			},

			addOrEditerRole() {
				// 添加角色
				this.dialogTitle = '新增角色'
				this.addOrEditerRoleDialog = true
			},
			closeAddRoleDialog() {
				// 关闭弹窗
				this.addOrEditerRoleDialog = false
				this.addForm = {}
				this.addForm.name = ''
				this.addForm.description = ''
				// this.$refs[e].resetFields();
			},
			closeWebRoleDialog() {
				//关闭web弹窗
				this.webAddOrEditerRoleDialog = false;
				this.webDeiteorList = []

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

	.addUserBtn {
		float: right;
	}

	.deleteBtn {
		color: red;
	}
</style>
