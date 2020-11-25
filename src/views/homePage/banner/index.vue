<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>轮播图管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="addBanner">新增轮播图</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="date" label="缩略图">
				<template slot-scope="scope">
					<el-image class="bannerImage" :src="scope.row.img" fit="cover"></el-image>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="name" label="描述"></el-table-column> -->
			<!-- <el-table-column prop="address" label="创建时间"></el-table-column> -->
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<!-- <el-button type="text" @click="editorBanner">编辑</el-button> -->
					<el-button @click="deleteBanner(scope.row.id)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
			<div class="dialogContent">
				<el-form label-width="80px" :model="dialogForm">
					<!-- <el-form-item label="图片描述">
				    <el-input v-model="dialogForm.name"></el-input>
				  </el-form-item> -->
					<el-form-item label="上传图片">
						<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
						 :http-request="upLoadFile">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" :disabled="submitDisabled" @click="addBannerSubmit">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				dialogForm: {
					imgs: ''
				},
				dialogVisible: false,
				dialogTitle: '新增轮播图',
				imageUrl: '',
				submitDisabled: true
			}
		},
		mounted() {
			this.getBannerData()
		},
		watch: {
			dialogVisible: function(newData, oldData) {
				this.dialogForm.imgs = ''
				this.imageUrl = ''
			}
		},
		methods: {
			addBanner() {
				// 新增轮播图
				// this.dialogTitle = '新增轮播图'
				this.dialogVisible = true
			},
			// editorBanner(){
			// 	// 编辑轮播图
			// 	this.dialogTitle = '编辑轮播图'
			// 	this.dialogVisible = true
			// },
			// handleClose() {

			// 	this.dialogVisible = false
			// },
			getBannerData() {
				this.$request.get(this.$api.getLunBoTu).then(res => {
					if (res.code == 'succes') {
						this.tableData = res.data
					}
				})
			},
			upLoadFile(file) {
				let Files = file.file
				let readFile = new FileReader()
				readFile.readAsDataURL(Files)
				readFile.onload = (e) => {
					this.imageUrl = e.target.result
				}
				let formData = new FormData()
				formData.append('fileList', Files)
				this.$request.uploading('/upload/one/upLoadImg', formData).then(res => {
					if (res.code == 'succes') {
						this.dialogForm.imgs = res.data
						this.submitDisabled = false
					}
				})
			},
			addBannerSubmit() {
				if (this.submitDisabled) return
				this.$request.get(this.$api.addLunBo, this.dialogForm).then(res => {
					if (res.code == 'succes') {
						this.$message.success('添加成功')
						this.dialogVisible = false
						this.getBannerData()
					}
				})
			},
			deleteBanner(id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$request.postJson(this.$api.deleteLunBo, {
						id: id
					}).then(res => {
						if (res.code == 'succes') {
							this.$message.success('删除成功')
							this.getBannerData()
						}
					})
				})

			}
		}
	}
</script>

<style scoped="scoped">
	.bannerImage {
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}

	.dialogContent>>>.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
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
