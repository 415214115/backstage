<template>
	<el-table :data="tableData" border style="width: 100%" row-key="id" default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :default-expand-all="false">
		<el-table-column prop="menuCode" label="菜单序号"> </el-table-column>
		<el-table-column prop="menuName" label="菜单名称"> </el-table-column>
		<el-table-column prop="menuIcon" label="菜单图标"> 
			<template slot-scope="scope">
				<img :src="scope.row.menuIcon?scope.row.menuIcon:$globalData.defaultImg" fit="cover" class="avatar">
			</template>
		</el-table-column>
		<el-table-column prop="menuUrl" label="菜单URL"></el-table-column>
		<el-table-column prop="parentMenuName" label="上级菜单"> </el-table-column>
		<el-table-column prop="sysName" label="所属系统"> </el-table-column>
		<!-- <el-table-column prop="name" label="菜单类型"> </el-table-column> -->
		<!-- <el-table-column prop="name" label="有效状态"> </el-table-column> -->
		<!-- <el-table-column prop="name" label="权限标识"> </el-table-column> -->
		<el-table-column label="操作" width="205px">
			<template slot-scope="scope">
				<el-button type="text" @click="handleClick(scope.row, 1)">修改菜单</el-button>
				<el-button type="text" @click="handleClick(scope.row, 2)">新增子菜单</el-button>
				<el-button type="text" @click="handleClick(scope.row, 3)">删除菜单</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		name: 'eltable',
		props:['tableData'],
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

<style scoped="scoped">
	.avatar {
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}
</style>
