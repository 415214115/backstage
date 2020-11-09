<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>产品系列管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="add">新增产品系列</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="系列名称"></el-table-column>
			<el-table-column label="背景图">
				<template slot-scope="scope">
					<el-image class="bannerImage" :src="scope.row.img" fit="cover"></el-image>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button @click="deleteRow(scope.row.id)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
			<div class="dialogContent">
				<el-form label-width="80px" :model="dialogForm">
					<el-form-item label="系列名称">
						<el-input v-model="dialogForm.name"></el-input>
					</el-form-item>
					<el-form-item label="背景图片">
						<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
						 :http-request="upLoadFile">
							<img v-if="dialogForm.img" :src="dialogForm.img" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addCarColor">确 定</el-button>
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
					img: ''
				},
				dialogVisible: false,
				dialogTitle: '新增系列',
				queryData: {
					pageNum: 1,
					pageSize: $globalData.pageSize
				},
				pageData: ''
			}
		},
		mounted() {
			this.getCarColor()
		},
		watch: {
			dialogVisible: function(newData, oldData) {
				if (!newData) {
					this.dialogForm.name = ''
					this.dialogForm.img = ''
				}
			}
		},
		methods: {
			add() {
				// 新增系列
				this.dialogTitle = '新增系列'
				this.dialogVisible = true
			},
			paginaClick(page) {
				this.queryData.pageNum = page
				this.getCarColor()
			},
			getCarColor() {
				this.$request.postJson(this.$api.selectCheMoList, this.queryData).then(res => {
					if (res.code == 'succes') {
						this.pageData = res.data
						this.tableData = this.pageData.list
					}
				})
			},
			addCarColor() {
				this.$request.postJson(this.$api.addCheMoType, this.dialogForm).then(res => {
					if (res.code == 'succes') {
						this.$message.success('添加成功')
						this.dialogVisible = false
						this.getCarColor()
					}
				})
			},
			deleteRow(id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (this.queryData.pageNum > 1) {
						this.queryData.pageNum = Math.ceil((this.pageData.total - 1) / $globalData.pageSize)
					}
					this.$request.postJson(this.$api.deleteCheMo, {
						id: id
					}).then(res => {
						if (res.code == 'succes') {
							this.$message.success('删除成功')
							this.getCarColor()
						}
					})
				})
			},
			upLoadFile(file) {
				let Files = file.file
				let formData = new FormData()
				formData.append('fileList', Files)
				this.$request.uploading(this.$api.upLoadImg, formData).then(res => {
					if (res.code == 'succes') {
						this.dialogForm.img = res.data
					}
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
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

	.avatar {
		width: 50px;
		height: 50px;
		display: block;
	}
</style>
