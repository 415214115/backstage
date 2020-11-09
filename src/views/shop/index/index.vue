<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>店铺管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="add">新增店铺</el-button>
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
			<el-form-item label="店铺名称">
				<el-input v-model="queryData.name" placeholder="店铺名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="getShopList">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="店铺名称"></el-table-column>
			<el-table-column label="封面图">
				<template slot-scope="scope">
					<el-image class="bannerImage" :src="scope.row.image" fit="cover"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="phone" label="电话"></el-table-column>
			<el-table-column prop="roadName" label="地址"></el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button @click="deleteRow(scope.row.id)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
			<div class="dialogContent">
				<el-form label-width="80px" :model="dialogForm">
					<el-form-item label="店铺名称">
						<el-input v-model="dialogForm.name"></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input v-model="dialogForm.roadName"></el-input>
					</el-form-item>
					<el-form-item label="电话">
						<el-input v-model="dialogForm.phone"></el-input>
					</el-form-item>
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
				<el-button type="primary" :disabled="submitDisabled" @click="addStores">确 定</el-button>
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
					name: '',
					roadName: '',
					phone: '',
					image: ''
				},
				submitDisabled: true,
				dialogVisible: false,
				dialogTitle: '新增店铺',
				imageUrl: '',
				queryData: {
					name: ''
				}
			}
		},
		mounted() {
			this.getShopList()
		},
		watch: {
			dialogVisible: function(newData, oldData) {
				if (!newData) {
					this.dialogForm.name = ''
					this.dialogForm.roadName = ''
					this.dialogForm.phone = ''
					this.dialogForm.image = ''
					this.imageUrl = ''
				}
			}
		},
		methods: {
			add() {
				// 新增店铺
				this.dialogVisible = true
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
				this.$request.uploading(this.$api.upLoadImg, formData).then(res => {
					if (res.code == 'succes') {
						this.dialogForm.image = res.data
						this.submitDisabled = false
					}
				})
			},
			getShopList() {
				this.$request.get(this.$api.getStoreList, this.queryData).then(res => {
					if (res.code == 'succes') {
						this.tableData = res.data
					}
				})
			},
			addStores() {
				this.$request.postJson(this.$api.addStore, this.dialogForm).then(res => {
					if (res.code == 'succes') {
						this.$message.success('添加成功')
						this.dialogVisible = false
						this.submitDisabled = true
						this.getShopList()
					}
				})
			},
			deleteRow(id) {
				this.$confirm('此操作将永久删除该店铺, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$request.postJson(this.$api.delStore, {
						id: id
					}).then(res => {
						if (res.code == 'succes') {
							this.$message.success('删除成功')
							this.getShopList()
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
