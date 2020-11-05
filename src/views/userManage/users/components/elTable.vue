<template>
	<el-table :data="tableData" border style="width: 100%">
		<!-- <el-table-column prop="nickName" label="用户昵称"> </el-table-column> -->
		<el-table-column prop="name" label="用户姓名"> </el-table-column>
		<el-table-column prop="phone" label="用户手机"> </el-table-column>
		<el-table-column label="用户性别">
			<template slot-scope="scope">
				{{ scope.row.sex == 1 ? '男' : scope.row.sex == 2 ? '女' : '未知' }}
			</template>
		</el-table-column>
		<el-table-column prop="age" label="用户年龄"> </el-table-column>
		<el-table-column prop="address" label="地址"> </el-table-column>
		<el-table-column prop="head" label="头像">
			<template slot-scope="scope">
				<img :src="scope.row.head?scope.row.head:$globalData.defaultImg" fit="cover" class="avatar">
			</template>
		</el-table-column>
		<el-table-column label="用户状态">
			<template slot-scope="scope">
				{{ scope.row.frozen == 1 ? '冻结' : scope.row.frozen == 0 ? '正常' : ''}}
			</template>
		</el-table-column>
		<el-table-column prop="createDate" label="创建时间"></el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button @click="handleClick(scope.row, 1)" type="text" size="small">编辑</el-button>
				<el-button @click="handleClick(scope.row, 2)" v-show="scope.row.frozen == 0" type="text" size="small">冻结</el-button>
				<el-button @click="handleClick(scope.row, 3)" v-show="scope.row.frozen == 1" type="text" size="small">解冻</el-button>
				<el-button @click="handleClick(scope.row, 4)" type="text" size="small" class="deleteBtn">删除</el-button>
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
			handleClick(row, i){
				// 表格操作事件
				this.$emit('tableOperation', row, i)
			}
		}
	}
</script>

<style scoped="scoped">
	.avatar{
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}
</style>
