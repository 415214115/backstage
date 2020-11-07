<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>汽车品牌管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="add">新增汽车品牌</el-button>
		</div>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item label="品牌名称">
				<el-input placeholder="品牌名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="品牌名称"></el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<!-- <el-button type="text" @click="editor(scope.row)">编辑</el-button> -->
					<el-button @click="deleteRow(scope.row.id)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" :close="handleClose">
			<div class="dialogContent">
				<el-form label-width="80px" :model="dialogForm">
					<el-form-item label="品牌名称">
						<el-input v-model="dialogForm.name"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="addCarTypes">确 定</el-button>
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
					name: ''
				},
				dialogVisible: false,
				dialogTitle: '新增品牌',
				queryData: {
					typeId: '-1'
				}
			}
		},
		mounted() {
			this.getCarTypes()
		},
		methods: {
			add() {
				// 新增品牌
				// this.dialogTitle = '新增品牌'
				this.dialogForm.name = ''
				this.dialogVisible = true
			},
			// editor() {
			// 	// 编辑品牌
			// 	this.dialogTitle = '编辑品牌'
			// 	this.dialogVisible = true
			// },
			handleClose() {
				this.dialogForm.name = ''
				this.dialogVisible = false
			},
			getCarTypes() {
				this.$request.postJson(this.$api.selectCarType, this.queryData).then(res => {
					if (res.code == 'succes') {
						this.tableData = res.data
					}
				})
			},
			addCarTypes() {
				this.$request.postJson(this.$api.addCarType, {
					pId: '0',
					name: this.dialogForm.name
				}).then(res => {
					if (res.code == 'succes') {
						this.$message.success('添加成功')
						this.getCarTypes()
						this.dialogVisible = false
					}
				})
			},
			deleteRow(id) {
				this.$confirm('删除该项, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$request.postJson(this.$api.delCarType, {
						id: id
					}).then(res => {
						if (res.code == 'succes') {
							this.$message.success('删除成功')
							this.getCarTypes()
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
</style>
