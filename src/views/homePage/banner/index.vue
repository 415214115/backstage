<template>
	<el-card class="content">
		<div slot="header" class="clearfix">
			<!-- <el-form :inline="true" :model="searchData" :rules="searchDataForm" class="demo-form-inline">
				<el-form-item label="用户类型名称">
					<el-input v-model="searchData.typeName" placeholder="用户手机"></el-input>
				</el-form-item>
				<el-form-item label="用户编码">
					<el-input v-model="searchData.typeDescribe" placeholder="用户手机"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
					<el-button type="primary" @click="onSubmit">重置</el-button>
					<el-button type="primary" class="addUserBtn" @click="addUser = true" icon="el-icon-plus">添加轮播图</el-button>
				</el-form-item>
			</el-form> -->
			<el-button type="primary" class="addUserBtn" @click="addBanners" icon="el-icon-plus">添加轮播图</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="bannerName" label="图片名称"> </el-table-column>
			<el-table-column label="图片">
				<template slot-scope="scope">
					<img :src="scope.row.bannerImage?scope.row.bannerImage:$globalData.defaultImg" fit="cover" class="avatar">
				</template>
			</el-table-column>
			<el-table-column prop="bannerDescribe" label="图片描述"> </el-table-column>
			<el-table-column prop="bannerUrl" label="跳转地址">
				<template slot-scope="scope">
					<a :href="scope.row.bannerUrl?scope.row.bannerUrl:''" target="_blank">{{ scope.row.bannerUrl?scope.row.bannerUrl:'' }}</a>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="操作">
				<template slot-scope="scope">
					<el-button @click="editorBanner(scope.row)" type="text" size="small">编辑</el-button>
					<el-button type="text" @click="deleteBanner(scope.row)" size="small" class="deleteBtn">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- <pagina-tion></pagina-tion> -->
		<el-dialog :title="dialogTitle" :visible.sync="addBanner" width="500px" @close="popsClose('bannerForm')">
			<div class="adduserForm">
				<el-form label-width="100px" ref="bannerForm" :model="addOrEditerForm" :rules="addOrEditerFormRules">
					<el-form-item label="图片名称" prop="bannerName">
						<el-input v-model="addOrEditerForm.bannerName" placeholder="图片名称" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="图片描述" prop="bannerDescribe">
						<el-input v-model="addOrEditerForm.bannerDescribe" placeholder="图片描述" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="跳转地址" prop="bannerUrl">
						<el-input v-model="addOrEditerForm.bannerUrl" placeholder="跳转地址 列:http://www.baidu.com" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="上传图片" prop="bannerImage">
						<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
							:http-request="uploadHeaderImage"
						 >
							<img v-if="addOrEditerForm.bannerImage" :src="addOrEditerForm.bannerImage" fit="cover" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="popsClose('bannerForm')">取 消</el-button>
				<el-button type="primary" @click="bannerConfirm('bannerForm')">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				addBanner: false,
				dialogTitle: '新增轮播图',
				// searchData: {
				// 	// typeName: '',
				// 	// typeDescribe: '',
				// 	page: 1,
				// 	pageSize: $globalData.pageSize
				// },
				// pageData: '',
				tableData: [],
				addOrEditerForm: {
					bannerName: '',
					bannerDescribe: '',
					bannerUrl: '',
					bannerImage: '',
					bannerImageFile: ''// 选择文件过后的图片file，点击弹窗确定按钮上传
				},
				imageData: '', // 选择文件过后的图片file，点击弹窗确定按钮上传
				addOrEditerFormRules: {
					bannerName: [
						{ required: true,pattern: /[\u2E80-\u9FFFa-zA-Z0-9_]{1,10}$/,message: '图片名称为1-10个字符且不能有特殊字符'}
					],
					bannerDescribe: [
						{ required: true,pattern: /[\u2E80-\u9FFFa-zA-Z0-9]{1,20}$/,message: '图片描述为1-20个字符且不能有特殊字符'}/*xrf修改正则*/
					],
					bannerUrl: [
						{ required: true,pattern: /^(http|https):\/\/*/g,message: '跳转地址必须以http或者https开头且必须是一个网址'}
					],
					bannerImage: [
						{ required: true,message: '请先上传图片且必须为jpg格式'}
					]
				}
			}
		},
		mounted() {
			this.getPageData()
		},
		methods: {
			getPageData(){
				this.$request.postForm(this.$api.getFile, this.searchData).then( res => {
					if(res.code == 200){
						this.tableData = res.data
						console.log(res)
						this.tableData.forEach((v, i) => {
							v.bannerImage = 'data:image/jpeg;base64,' + v.bannerImage
						})
					}
				})
			},
			bannerConfirm(e){
				// 确定按钮
				this.$refs[e].validate((valid) => {
				  if (valid) {
					let reqUrl = ''
					if(this.dialogTitle == '新增轮播图'){
						reqUrl = this.$api.uploadFile
					} else {
						reqUrl = this.$api.updateFile
					}
					let formData = new FormData()
					if(this.addOrEditerForm.bannerImageFile){
						formData.append('bannerImageFile', this.addOrEditerForm.bannerImageFile)
					}
					formData.append('bannerName', this.addOrEditerForm.bannerName)
					formData.append('bannerDescribe', this.addOrEditerForm.bannerDescribe)
					formData.append('bannerUrl', this.addOrEditerForm.bannerUrl)
					formData.append('id', this.addOrEditerForm.id)
					this.$request.uploading(reqUrl, formData).then( res => {
						if(res.code == 200){
							this.$message.success(res.message || '操作成功')
							this.addBanner = false
							this.$refs[e].resetFields();
							this.getPageData()
						}
					})
				  } else {
					this.$message.error('请认真核对输入信息！')
					return false;
				  }
				});
			},
			popsClose(e){
				// 弹窗关闭
				this.addBanner = false
				this.$refs[e].resetFields();
				this.addOrEditerForm = {
					bannerName: '',
					bannerDescribe: '',
					bannerUrl: '',
					bannerImage: '',
					bannerImageFile: ''
				}
			},
			addBanners(){
				// 添加轮播图
				this.addBanner = true
				this.dialogTitle =  '新增轮播图'
			},
			editorBanner(row){
				// 编辑轮播图
				this.addBanner = true
				this.dialogTitle =  '编辑轮播图'
				this.addOrEditerForm = {
					bannerName: row.bannerName,
					bannerDescribe: row.bannerDescribe,
					bannerUrl: row.bannerUrl,
					bannerImage: row.bannerImage,
					bannerImageFile: row.bannerImageFile,
					id: row.id
				}
			},
			deleteBanner(row){
				// 删除轮播图
				this.$confirm('确定要删除该轮播图吗?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  this.$request.postForm(this.$api.deleteFile, {
					  id: row.id
				  }).then( res => {
				  	if(res.code == 200){
				  		this.$message.success(res.message || '操作成功')
				  		this.getPageData()
				  	}
				  })
				})
			},
			uploadHeaderImage(files){
				// 上传图片
				let that = this
				let File = files.file
				if(File.type != 'image/jpeg'){
					this.$message.error('必须上传jpg或者jpeg类型图片')
					return
				}
				let fileRead = new FileReader();
				fileRead.readAsDataURL(File)
				fileRead.onload = function(e){
					// 转换成base64进行图片本地预览
					that.addOrEditerForm.bannerImage = this.result
				}
				this.addOrEditerForm.bannerImageFile = File
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
	.avatar{
		width: 100px;
		height: 100px;
		border-radius: 5px;
		cursor: pointer;
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
	a{
		/* text-decoration: none; */
		color: #333333;
	}
</style>
