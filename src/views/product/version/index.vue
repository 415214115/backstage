<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>汽车型号管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="add">新增汽车型号</el-button>
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
			<el-form-item label="汽车品牌">
				<el-select v-model="queryData.typeId" placeholder="汽车品牌">
					<el-option label="全部" value=""></el-option>
					<el-option v-for="item in carTypes" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="queryCar">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="pagedata.list" border style="width: 100%">
			<el-table-column prop="cname" label="型号名称"></el-table-column>
			<el-table-column prop="pname" label="型号品牌"></el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button @click="deleteRow(scope.row.cid)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<paginaTion :totalNum="pagedata.total" @paginaClick="paginaClick"></paginaTion>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
			<div class="dialogContent">
				<el-form label-width="80px" :model="dialogForm">
					<el-form-item label="汽车品牌">
						<el-select v-model="dialogForm.pId" placeholder="汽车品牌">
							<el-option v-for="item in carTypes" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="型号名称">
						<el-input v-model="dialogForm.name"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
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
					pId: '',
					name: ''
				},
				dialogVisible: false,
				dialogTitle: '新增型号',
				carTypes: '',
				queryData: {
					typeId: '',
					pageNum: 1,
					pageSize: $globalData.pageSize,
				},
				pagedata: ''
			}
		},
		mounted() {
			this.getCarTypes()
			// this.getVersionList()
			this.getPageData()
		},
		methods: {
			paginaClick(val){
				this.queryData.pageNum = val
				console.log(val)
				this.getPageData()
			},
			queryCar(){
				this.queryData.pageNum = 1
				this.getPageData()
			},
			add() {
				// 新增型号
				this.dialogVisible = true
			},
			getPageData(){
				this.$request.postJson('/back/selectCarTypeList', this.queryData).then(res=>{
					if(res.code == 'succes'){
						this.pagedata = res.data
					}
				})
			},
			
			
			
			
			
			
			
			
			
			getCarTypes() {
				// 获取汽车品牌
				this.$request.postJson(this.$api.selectCarType, {
					typeId: '-1',
					pageNum: 1,
					pageSize: 20000
				}).then(res => {
					if (res.code == 'succes') {
						this.carTypes = res.data
					}
				})
			},
			// getVersionList() {
			// 	// 获取汽车型号
			// 	this.$request.postJson(this.$api.selectCarType, this.queryData).then(res => {
			// 		if (res.code == 'succes') {
			// 			this.tableData = res.data
			// 		}
			// 	})
			// },
			addCarTypes() {
				this.$request.postJson(this.$api.addCarType, this.dialogForm).then(res => {
					if (res.code == 'succes') {
						this.$message.success('添加成功')
						this.getPageData()
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
							if(this.queryData.pageNum > 1){
								this.queryData.pageNum = Math.ceil((this.pagedata.total - 1) / $globalData.pageSize)
							}
							this.getPageData()
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
