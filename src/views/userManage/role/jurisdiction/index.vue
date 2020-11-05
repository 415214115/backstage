<template>
	<el-card class="content">
		<div slot="header" class="clearfix">web权限管理</div>
		<el-collapse v-model="activeName" accordion @change="collapseChange">
			<el-collapse-item v-for="item in systemList" :key="item.id" :name="item.id">
				<template slot="title">
					{{ item.sysName }}
				</template>
				<div v-if="item.roleMenu">
					<el-tree :data="item.roleMenu" 
						show-checkbox node-key="id" 
						default-expand-all
						@check-change="checkChange"
						:default-checked-keys="item.checked"
						:props="defaultProps">
					</el-tree>
				</div>
			</el-collapse-item>
		</el-collapse>
		<div class="btnBox">
			<el-button @click="goBack">返回</el-button>
			<el-button type="primary" @click="submitConfirm">确定</el-button>
		</div>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				systemList: '', // 系统列表
				activeName: '',
				roleId: '', // 角色id
				defaultProps: {
					children: 'children',
					label: 'menuName'
				},
				confirmData: new Map()
			}
		},
		mounted() {
			this.roleId = this.$route.params.id
			if (this.roleId) {
				this.getSystemList()
			}
		},
		methods: {
			collapseChange(activeNames) {
				// 折叠面板切换
				this.activeName = activeNames
				this.getRoleMenu()
			},
			getSystemList() {
				// 获取系统列表
				this.$request.postForm(this.$api.querySystemNoPage).then(res => {
					if (res.code == 200) {
						this.systemList = res.data
						this.systemList.forEach((v) => {
							v.roleMenu = null
							v.checked = [] // 默认选中
						})
						this.activeName = this.systemList[0].id
						this.getRoleMenu()
					}
				})
			},
			getRoleMenu() {
				this.$request.get(this.$api.queryRoleMenu, {
					permissionId: this.roleId,
					sysId: this.activeName
				}).then(res => {
					if (res.code == 200) {
						let data = res.data
						this.systemList.forEach((v)=>{
							if(v.id == this.activeName){
								this.$set(v, 'roleMenu', data)
								this.setTingTree(v, data)
								// 强制更新视图
								this.$forceUpdate()
							}
						})
						
					}
				})
			},
			setTingTree(obj, tree){
				// 初始化树形控件
				if(tree.length > 0){
					tree.forEach((v)=>{
						if(v.isHave){
							// 默认选中
							obj.checked.push(v.id)
							this.confirmData.set(v.id, v.id)
						}
						if(v.children.length > 0){
							// 默认展开
							this.recursionFunc(obj, v.children)
						}
					})
				}
			},
			recursionFunc(obj, tree){
				// 属性控件递归函数
				if(tree.length > 0){
					tree.forEach((v)=>{
						if(v.isHave){
							// 默认选中
							obj.checked.push(v.id)		
							this.confirmData.set(v.id, v.id)
						}
						if(v.children.length > 0){
							// 默认展开
							this.recursionFunc(obj, v.children)
						}
					})
				}
			},
			checkChange(data, isSelect){
				// 节点选中状态发生变化时的回调
				if(isSelect){
					this.confirmData.set(data.id, data.id)
				} else {
					this.confirmData.delete(data.id)
				}
			},
			submitConfirm(){
				// 提交权限设置
				let data = [...this.confirmData.values()].join(',')
				this.$request.postForm(this.$api.saveRoleMenu, {
					permissionId: this.roleId,
					menuId: data
				}).then(res=>{
					if(res.code==200){
						this.confirmData.clear()
						this.$message.success('分配权限成功')
						this.getSystemList()
					}
				})
			},
			goBack(){
				// 返回上一页
				this.$router.back(1)
			}
		}
	}
</script>

<style scoped="scoped">
	.btnBox{
		margin-top: 20px;
		text-align: center;
	}
</style>
