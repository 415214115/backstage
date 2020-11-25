<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>案例管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="addCase">新增案例</el-button>
		</div>
		<el-form :inline="true" class="demo-form-inline" :model="searchData">
			<el-form-item label="案例类型">
				<el-select v-model="searchData.showType" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
					<el-option label="精彩案例" value="1"></el-option>
					<el-option label="最新案例" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车辆颜色">
				<el-select v-model="searchData.colorId" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
					<el-option v-for="item in carColorList" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="贴膜类型">
				<el-select v-model="searchData.chemoId" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
					<el-option v-for="item in chemoList" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车辆类型">
				<el-select v-model="searchData.typeId" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
					<el-option v-for="item in carTypes" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="queryFunc">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="title" label="标题"></el-table-column>
			<el-table-column prop="date" label="封面图">
				<template slot-scope="scope">
					<el-image class="bannerImage" :src="scope.row.showImg" fit="cover"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="context" label="简介"></el-table-column>
			<el-table-column prop="showText" label="图片介绍"></el-table-column>
			<el-table-column prop="carColor" label="车辆颜色"></el-table-column>
			<el-table-column prop="carTypeName" label="车辆型号"></el-table-column>
			<el-table-column prop="chemoTypeName" label="车膜系列"></el-table-column>
			<el-table-column prop="showType" label="案例类型">
				<template slot-scope="scope">
					{{ scope.row.showType == 1 ? '精彩案例' : '最新案例' }}
				</template>
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="deleteRow(scope.row.id)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				searchData: {
					showType: '',
					colorId: '',
					chemoId: '',
					typeId: '',
					pageNum: 1,
					pageSize: this.$globalData.pageSize
				},
				carColorList: '', // 车辆颜色
				chemoList: '', // 产品系列
				carTypes: '', // 车辆品牌
				pageData: ''
			}
		},
		mounted() {
			this.getCaseData()
			this.getCarColor()
			this.getCarMo()
			this.getCarTypes()
		},
		methods: {
			addCase() {
				this.$router.push('/casemanage/addcase')
			},
			queryFunc() {
				this.searchData.pageNum = 1
				this.getCaseData()
			},
			paginaClick(page) {
				this.searchData.pageNum = page
				this.getCaseData()
			},
			getCaseData() {
				this.$request.postJson(this.$api.selectAnLi, this.searchData).then(res => {
					if (res.code == 'succes') {
						this.pageData = res.data
						this.tableData = this.pageData.list
					}
				})
			},
			getCarColor() {
				// 车辆颜色
				this.$request.get(this.$api.selectColorList).then(res => {
					if (res.code == 'succes') {
						this.carColorList = res.data
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
			deleteRow(id) {
				// deleteModelType
				this.$confirm('此操作将永久删除该案例, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (this.searchData.pageNum > 1) {
						this.searchData.pageNum = Math.ceil((this.pageData.total - 1) / $globalData.pageSize)
					}
					this.$request.postJson(this.$api.deleteModelType, {
						id: id
					}).then(res => {
						if (res.code == 'succes') {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getCaseData()
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
