<template>
	<el-card class="content">
		<div slot="header" class="clearfix">
			<el-form :inline="true" :rules="searchRules" :model="searchData" ref="searchForm" class="demo-form-inline">
				<el-form-item label="用户手机" prop="phone">
					<el-input v-model="searchData.phone" placeholder="用户手机"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="cardId">
					<el-input v-model="searchData.cardId" placeholder="身份证号"></el-input>
				</el-form-item>
				<el-form-item label="用户状态" prop="state">
					<el-select v-model="searchData.state" placeholder="用户状态">
						<el-option label="正常" value="0"></el-option>
						<el-option label="冻结" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
					<el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
					<el-button type="primary" class="addUserBtn" @click="openAddUser" icon="el-icon-plus">新增用户</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-tabs v-model="tabsData" @tab-click="tabsClick">
		    <el-tab-pane label="农场直达" name="0">
				<eltable :tableData="tableData" @tableOperation="tableOperation"></eltable>
			</el-tab-pane>
		    <el-tab-pane label="服务市场" name="1">
				<eltable></eltable>
			</el-tab-pane>
		    <el-tab-pane label="智能装备" name="2">
				<eltable></eltable>
			</el-tab-pane>
		    <el-tab-pane label="大数据" name="3">
				<eltable></eltable>
			</el-tab-pane>
			<el-tab-pane label="论坛培训" name="4">
				<eltable></eltable>
			</el-tab-pane>
		</el-tabs>
		
		<pagina-tion v-if="tableData.length > 0" :totalNum="pageData.totalNum" @paginaClick="paginaClick"></pagina-tion>
		<el-dialog :title="dialogTitle" :visible.sync="addOrEditerUser" width="500px" @close="closeAddUserDialog('addOrEditerForm')">
			<div class="adduserForm">
				<el-form label-width="110px" :rules="addOrEditerFormRules" ref="addOrEditerForm" :model="addOrEditerForm">
					<!-- <el-form-item label="用户昵称" prop="nickName">
						<el-input v-model="addOrEditerForm.nickName" :validate-event="false"></el-input>
					</el-form-item> -->
					<el-form-item label="用户姓名" prop="name">
						<el-input v-model="addOrEditerForm.name" auto-complete="off" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="账户(手机号)" prop="phone">
						<el-input v-model="addOrEditerForm.phone" auto-complete="off" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="addOrEditerForm.password" auto-complete="off" type="password" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="用户性别">
						<el-radio-group v-model="addOrEditerForm.sex">
						  <el-radio label="1">男</el-radio>
						  <el-radio label="2">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="身份证号" prop="cardId">
						<el-input v-model="addOrEditerForm.cardId" auto-complete="off" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="用户年龄" prop="age">
						<el-input-number v-model="addOrEditerForm.age" auto-complete="off" :validate-event="false"></el-input-number>
						<!-- <el-input v-model="addOrEditerForm.age" :validate-event="false"></el-input> -->
					</el-form-item>
					<el-form-item label="地址" prop="address">
						<el-input v-model="addOrEditerForm.address" auto-complete="off" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-radio-group v-model="addOrEditerForm.frozen">
						  <el-radio label="0">正常</el-radio>
						  <el-radio label="1">冻结</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="选择头像">
						<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
							:http-request="uploadHeaderImage"
						 >
							<img v-if="addOrEditerForm.head" :src="addOrEditerForm.head" fit="cover" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeAddUserDialog('addOrEditerForm')">取 消</el-button>
				<el-button type="primary" @click="addOrEditerUserConfirm('addOrEditerForm')">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	import eltable from './components/elTable.vue'
	export default {
		components:{
			eltable
		},
		data() {
			var password = (rule, value, callback) => {
				let reg = /^[a-zA-Z0-9_]{8,}$/
				if(value == '********'){
					// 如果为八个*号证明没有修改密码
					return callback();
				} else {
					if (!value || !reg.test(value)) {
						return callback(new Error('密码长度不能小于8个字符且不能有中文或特殊字符'));
					} else {
						callback();
					}
				}
			};
			return {
				addOrEditerUser: false,
				dialogTitle: '新增用户',
				searchData: {
					// 用户筛选数据，后台接口请求数据
					phone: '',
					cardId: '',
					state: '',
					page: 1,
					pageSize: $globalData.pageSize
				},
				searchRules:{
					// 筛选表单验证，规则为空
					phone:[],
					cardId:[],
					state:[]
				},
				tabsData: '0', // tabs切换位置的初始值
				addOrEditerForm: {
					// 添加新用户，编辑用户表单数据
					// nickName: '', // 用户昵称
					phone: '', // 账号
					password: '', // 用户密码
					name: '', // 用户姓名
					sex: '1', // 用户性别
					age: '', // 用户年龄
					cardId: '', // 身份证号
					address: '', // 地址
					frozen: '0', // 是否冻结
					head: '' // 用户头像
				},
				pageData: '',//页面请求数据
				tableData: [],//表格数据
				addOrEditerFormRules: {
					// 添加新用户，编辑用户表单验证
					// nickName: [
					// 	{ min: 0, max: 10, message: '用户昵称不能超过10个字'}
					// ], // 用户昵称
					phone: [
						{ required: true,pattern: /^1[3-9]\d{9}$/,message: '手机号码不合法'}
					], // 账号
					password: [
						{ required: true,validator: password}
					], // 用户密码
					name: [
						{ required: true,min: 2, max: 5,message: '姓名为2至5个字'}
					], // 用户姓名
					// sex: [], // 用户性别
					age: [
						{ type: 'number', message: '年龄必须为数字值'}
					], // 用户年龄
					cardId: [
						{ pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,message: '身份证号不合法'}
					], // 身份证号
					// address: [], // 地址
					// frozen: [], // 是否冻结
					head: [] ,// 用户头像		
				}
			}
		},
		mounted() {
			this.getPageData()
		},
		methods: {
			tabsClick(val){
				// 标签卡切换
				console.log(val.name)
			},
			openAddUser(){
				// 新增用户
				this.dialogTitle = '新增用户'
				this.addOrEditerUser = true
			},
			closeAddUserDialog(e){
				// 关闭弹窗
				this.addOrEditerUser = false
				this.$refs[e].resetFields();
			},
			paginaClick(e){
				// 分页组件点击事件
				this.searchData.page = e
				this.getPageData()
			},
			search(){
				// 条件筛选
				this.searchData.page = 1
				this.getPageData()
			},
			resetForm(formName) {
				// 重置表单
				if(this.searchData.phone != '' || this.searchData.cardId != '' || this.searchData.state != ''){
					// 避免用户在没有使用查询之前误点重置按钮
					this.$refs[formName].resetFields();
					this.getPageData()
				}
			},
			getPageData(){
				// 获取页面数据
				this.$request.get(this.$api.queryUser, this.searchData).then( res => {
					if(res.code == 200){
						this.pageData = res.data
						this.tableData = this.pageData.items
					}
				})
			},
			tableOperation(row, type){
				// 表格操作事件分发
				// type   1编辑2冻结3解冻4删除
				if(type == 1){
					this.editeorUser(row)
				} else if(type == 2){
					this.freezeUser(row)
				} else if(type == 3){
					this.thawUser(row)
				} else if(type == 4){
					this.deleteUser(row)
				}
			},
			addOrEditerUserConfirm(e){
				// 新增or编辑用户信息提交

				console.log(this.addOrEditerForm.password)
				this.$refs[e].validate( validate => {
					if(validate){
						let reqApi = ''
						let postData = this.addOrEditerForm
						if(this.dialogTitle == '新增用户'){
							reqApi = this.$api.saveUser
						} else {
							reqApi = this.$api.updateUser
							// 如果为八个*号证明没有修改密码,传空给后台
							if(this.addOrEditerForm.password == '********'){
								postData.password = null
							}
						}
						console.log(this.addOrEditerForm.password)
						this.$request.postForm(reqApi, postData).then( res => {
							if(res.code == 200){
								this.$message.success(res.message || '操作成功')
								if(this.dialogTitle == '新增用户'){
									this.searchData.page = 1
								}
								this.getPageData()
								this.closeAddUserDialog(e)
							}
						})
					} else {
						this.$message.error('请认真核对输入信息！')
						return false;
					}
				})
			},
			editeorUser(row){				
				// 编辑用户			
				this.dialogTitle = '编辑用户信息'
				this.addOrEditerForm.id = row.id// 用户ID
				this.addOrEditerForm.phone = row.phone// 账号
				this.addOrEditerForm.password = row.password?'********':''// 用户密码
				this.addOrEditerForm.name = row.name// 用户姓名
				this.addOrEditerForm.sex = row.sex?row.sex:'1'// 用户性别
				this.addOrEditerForm.age = row.age// 用户年龄
				this.addOrEditerForm.cardId = row.cardId// 身份证号
				this.addOrEditerForm.address = row.address// 地址
				this.addOrEditerForm.frozen = row.frozen?row.frozen:'0'// 是否冻结
				this.addOrEditerForm.head = row.head// 用户头像
				this.addOrEditerUser = true
			},
			freezeUser(row){
				// 冻结用户
				this.$confirm('确定要冻结该用户吗?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  this.$request.postForm(this.$api.frozenUser, {
					  id: row.id
				  }).then( res => {
				  	if(res.code == 200){
				  		this.$message.success(res.message || '操作成功')
				  		this.getPageData()
				  	}
				  })
				})
			},
			thawUser(row){
				// 解冻用户
				this.$request.postForm(this.$api.thawUser, {
					id: row.id
				}).then( res => {
					if(res.code == 200){
						this.$message.success(res.message || '操作成功')
						this.getPageData()
					}
				})
			},
			deleteUser(row){
				// 删除用户
				this.$confirm('确定要删除该用户吗?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  this.$request.postForm(this.$api.removeUser, {
					  id: row.id
				  }).then( res => {
				  	if(res.code == 200){
				  		this.$message.success(res.message || '操作成功')
						if(this.searchData.page > 1){
							this.searchData.page = Math.ceil((Number(this.pageData.totalNum) - 1) / $globalData.pageSize)
						}
				  		this.getPageData()
				  	}
				  })
				})
			},
			uploadHeaderImage(file){
				// 上传用户头像
				let that = this
				let files = file.file
				let imageSize = 1024 * 1024 * 5 // 限制上传图片大小为1MB
				if(files.size > imageSize){
					this.$message.error('上传图片大小超过限制，请上传1MB以内大小的图片')
					return
				}
				if(files.type != 'image/jpeg'){
					this.$message.error('头像只能是jpg、jpeg格式')
					return
				}
				let fileRead = new FileReader();
				fileRead.readAsDataURL(files)
				fileRead.onload = function(e){
					// 转换成base64格式传给后台
					that.addOrEditerForm.head = this.result
				}

			

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

	.avatar-uploader>>>.el-upload {
		border: 1px dashed #d9d9d9 !important;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}

	.avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
</style>
