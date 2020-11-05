<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>汽车型号管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="add">新增汽车型号</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="型号名称"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="editor(scope.row)">编辑</el-button>
					<el-button @click="deleteRow(scope.row)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<div class="dialogContent">
				<el-form label-width="80px" :model="dialogForm">
					<el-form-item label="型号名称">
						<el-input v-model="dialogForm.name"></el-input>
					</el-form-item>
					<el-form-item label="汽车品牌">
						<el-select v-model="dialogForm.region" placeholder="汽车品牌">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
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
				dialogTitle: '新增型号'
			}
		},
		methods: {
			add() {
				// 新增型号
				this.dialogTitle = '新增型号'
				this.dialogVisible = true
			},
			editor() {
				// 编辑型号
				this.dialogTitle = '编辑型号'
				this.dialogVisible = true
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
