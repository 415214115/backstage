<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>质保卡管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="add">新增质保卡</el-button>
		</div>
		<el-form :inline="true"  class="demo-form-inline">
		  <el-form-item label="客户姓名">
		    <el-input  placeholder="客户姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号码">
		    <el-input  placeholder="手机号码"></el-input>
		  </el-form-item>
		  <el-form-item label="车牌号码">
		    <el-input  placeholder="车牌号码"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" icon="el-icon-search">查询</el-button>
		  </el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="客户姓名"></el-table-column>
			<el-table-column prop="name" label="手机号码"></el-table-column>
			<el-table-column prop="name" label="受保车型"></el-table-column>
			<el-table-column prop="name" label="车牌号码"></el-table-column>
			<el-table-column prop="name" label="施工膜类"></el-table-column>
			<el-table-column prop="name" label="质保日期"></el-table-column>
			<el-table-column prop="name" label="交车日期"></el-table-column>
			<el-table-column prop="name" label="施工店铺"></el-table-column>
			<el-table-column prop="name" label="整车价格"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="editor(scope.row)">查看</el-button>
					<el-button @click="deleteRow(scope.row)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<div class="dialogContent">
				<el-form label-width="80px" :model="dialogForm">
					<el-form-item label="客户姓名">
						<el-input v-model="dialogForm.name"></el-input>
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input v-model="dialogForm.name"></el-input>
					</el-form-item>
					<el-form-item label="受保车型">
						<el-select v-model="dialogForm.region" placeholder="请选择受保车型">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
						<!-- <el-input v-model="dialogForm.name"></el-input> -->
					</el-form-item>
					<el-form-item label="车牌号码">
						<el-input v-model="dialogForm.name"></el-input>
					</el-form-item>
					<el-form-item label="施工膜类">
						<el-select v-model="dialogForm.region" placeholder="请选择施工膜类">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
					</el-form-item>
					<el-form-item label="质保日期">
						<el-date-picker
						      v-model="dialogForm.name"
						      type="date"
						      placeholder="选择日期"
							  format="yyyy 年 MM 月 dd 日"
								value-format="yyyy-MM-dd">
						    </el-date-picker>
					</el-form-item>
					<el-form-item label="交车日期">
						<el-date-picker
						      v-model="dialogForm.name"
						      type="date"
						      placeholder="选择日期"
							  format="yyyy 年 MM 月 dd 日"
								value-format="yyyy-MM-dd">
						    </el-date-picker>
					</el-form-item>
					<el-form-item label="施工店铺">
						<el-select v-model="dialogForm.region" placeholder="请选择施工膜类">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
					</el-form-item>
					<el-form-item label="整车价格">
						<el-input v-model="dialogForm.name"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
						name: '最新案例',
						id: '1',
						address: '1'
					},
					{
						name: '精彩案例',
						id: '1',
						address: '1'
					}
				],
				dialogForm: {
					name: ''
				},
				dialogVisible: false,
				dialogTitle: '新增质保卡'
			}
		},
		methods: {
			add() {
				// 新增质保卡
				// this.dialogTitle = '新增质保卡'
				// this.dialogVisible = true
				this.$router.push('/guarantee/add')
			},
			editor() {
				// 编辑质保卡
				// this.dialogTitle = '编辑质保卡'
				// this.dialogVisible = true
				this.$router.push('/guarantee/details')
			},
			handleClose() {

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
