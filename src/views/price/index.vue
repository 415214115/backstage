<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>价格管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="addCase">新增价格</el-button>
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
			<el-form-item label="车辆类型">
				<el-select v-model="queryData.typeId" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
					<el-option v-for="item in carTypes" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="queryFunc">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="carType" label="车辆型号"></el-table-column>
			<el-table-column prop="chemo" label="车膜型号"></el-table-column>
			<el-table-column prop="price" label="价格"></el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="deleteBanner(scope.row.id)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
		<el-dialog title="新增价格" :visible.sync="dialogVisible" width="30%">
			<el-form label-width="80px" :model="postData" class="demo-form-inline">
				<el-form-item label="车辆类型">
					<el-select v-model="postData.carTypeId" placeholder="请选择">
						<el-option v-for="item in carJTypes" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="贴膜类型">
					<el-select v-model="postData.carChemoId" placeholder="请选择">
						<el-option v-for="item in chemoList" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="价格">
					<el-input v-model="postData.price" placeholder="请输入内容"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="postAddModelPrice">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				queryData: {
					typeId: '',
					pageNum: 1,
					pageSize: $globalData.pageSize
				},
				pageData: '',
				postData: {
					carTypeId: '',
					carChemoId: '',
					price: ''
				},
				dialogVisible: false,
				carTypes: '',
				carJTypes: '',
				chemoList: ''
			}
		},
		mounted() {
			// this.getSelectInformations()
			this.getCarMo()
			this.getCarTypes()
			this.getCarJTypes()
			this.getSelectModelPrice()
		},
		watch: {
			dialogVisible: function(newData, oldData) {
				if (!newData) {
					this.postData.carTypeId = ''
					this.postData.carChemoId = ''
					this.postData.price = ''
				}
			}
		},
		methods: {
			addCase() {
				this.dialogVisible = true
			},
			queryFunc() {
				this.queryData.pageNum = 1
				this.getSelectModelPrice()
			},
			paginaClick(page) {
				this.queryData.pageNum = page
				this.getSelectModelPrice()
			},
			getSelectModelPrice() {
				// selectModelPrice
				this.$request.postJson(this.$api.selectPricelist, this.queryData).then(res => {
					if (res.code == 'succes') {
						this.pageData = res.data
						this.tableData = this.pageData.list
					}
				})
			},
			postAddModelPrice() {
				// addModelPrice
				this.$request.postJson(this.$api.addModelPrice, this.postData).then(res => {
					if (res.code == 'succes') {
						// this.tableData = res.data.list
						this.$message.success('添加成功')
						this.getSelectModelPrice()
						this.dialogVisible = false
					}
				})
			},
			getCarMo() {
				// 贴膜类型
				this.$request.postJson(this.$api.selectCheMoList, {
					pageNum: 1,
					pageSize: 20000
				}).then(res => {
					if (res.code == 'succes') {
						this.chemoList = res.data.list
					}
				})
			},
			getCarTypes() {
				// 车辆品牌
				this.$request.postJson(this.$api.selectCarType, {
					typeId: '-1'
				}).then(res => {
					if (res.code == 'succes') {
						this.carTypes = res.data
					}
				})
			},
			getCarJTypes() {
				// 车辆类型
				this.$request.postJson(this.$api.selectCarType, {
					typeId: '0'
				}).then(res => {
					if (res.code == 'succes') {
						this.carJTypes = res.data
					}
				})
			},
			deleteBanner(id) {
				this.$confirm('此操作将永久删除该价格, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (this.queryData.pageNum > 1) {
						this.queryData.pageNum = Math.ceil((this.pageData.total - 1) / $globalData.pageSize)
					}
					this.$request.postJson(this.$api.delModelPrice, {
						id: id
					}).then(res => {
						if (res.code == 'succes') {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getSelectModelPrice()
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
