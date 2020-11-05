<template>
	<el-table :data="tableData" border style="width: 100%">
		<el-table-column prop="name" label="角色名称"> </el-table-column>
		<el-table-column prop="description" label="角色描述"> </el-table-column>
		<el-table-column prop="creationTime" label="创建时间"> </el-table-column>
		<el-table-column prop="address" label="操作">
			<template slot-scope="scope">
				<el-button  @click="handleClick(scope.row, 1)" type="text" size="small">编辑</el-button>
				<el-button  type="text" size="small" @click="handleClick(scope.row, 3)">web权限分配</el-button>
				<!-- <el-button  type="text" size="small" @click="handleClick(scope.row, 4)">app权限分配</el-button> -->
				<el-button  @click="handleClick(scope.row, 2)" type="text" size="small" class="deleteBtn">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		name: 'eltable',
		props: ['tableData'],
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {
			handleClick(row, i) {
				// 表格操作事件
				this.$emit('tableOperation', row, i)
			}
		}
	}
</script>

<style>
</style>
