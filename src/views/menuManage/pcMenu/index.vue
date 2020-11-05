<template>
	<el-card>
		<div slot="header" class="clearfix">
			<el-form :inline="true" :rules="searchRules" :model="searchData" ref="searchForm" class="demo-form-inline">
				<el-form-item label="菜单名称" prop="menuName">
					<el-input v-model="searchData.menuName" placeholder="输入菜单名称"></el-input>
				</el-form-item>
				<el-form-item label="菜单编码" prop="menuCode">
					<el-input v-model="searchData.menuCode" placeholder="输入菜单编码"></el-input>
				</el-form-item>
				<el-form-item label="所属系统" prop="sysCode">
					<el-select v-model="searchData.sysCode" placeholder="选择所属系统">
						<el-option v-for="item in tabsDataList" :key="item.id" :label="item.sysName" :value="item.sysCode"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
					<el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
					<el-button type="primary" class="addUserBtn" @click="synchronization = true">一键同步</el-button>
					<el-button type="primary" class="addUserBtn" @click="openAddMenu('')" icon="el-icon-plus">新增菜单</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="contBox">
			<!-- <el-button type="primary" class="addMenuBtn" @click="openAddMenu('')" icon="el-icon-plus">新增菜单</el-button>	 -->
			<el-tabs v-model="tabsData" @tab-click="tabsClick">				
			    <el-tab-pane :label="item.sysName" v-for="(item, index) in tabsDataList" :name="item.id" :key="item.id">
						<eltable :tableData="tableData" @tableOperation="tableOperation"></eltable>	
				</el-tab-pane>				
			</el-tabs>	
		</div>		
		<pagina-tion v-if="tableData.length > 0" :totalNum="pageData.totalNum" :key="tabsData"  @paginaClick="paginaClick"></pagina-tion>
		<!-- 添加 -->
		<el-dialog :title="dialogTitle" :visible.sync="addOrEditorMenu" width="500px" @close="popsClose('addOrEditorMenuForm')">
			<div class="addOrEditorMenuForm">
				<el-form label-width="100px" ref="addOrEditorMenuForm" :model="addOrEditorMenuData" :rules="addOrEditorMenuRules">
					<el-form-item label="菜单名称" prop="menuName">
						<el-input v-model="addOrEditorMenuData.menuName" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="菜单编码" prop="menuCode">
						<el-input v-model="addOrEditorMenuData.menuCode" :validate-event="false"></el-input>
					</el-form-item>
					<el-form-item label="菜单url" prop="menuUrl">
						<el-input v-model="addOrEditorMenuData.menuUrl" :validate-event="false"></el-input>
					</el-form-item>
					<!-- <el-form-item label="所属系统" prop="currentMenuName">
						<el-input v-model="addOrEditorMenuData.currentMenuName" disabled :validate-event="false"></el-input>
					</el-form-item> -->
					<!-- <el-form-item label="菜单图标">
						<el-input></el-input>
					</el-form-item> -->
						<el-form-item label="菜单图标" prop="menuIcon">
						<el-upload   class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :http-request="uploadIconImage">											 
							<img v-if="addOrEditorMenuData.menuIcon" :src="addOrEditorMenuData.menuIcon" fit="cover" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="所属系统" prop="sysId">
						<el-select  v-model="addOrEditorMenuData.sysId" :disabled="addOrEditorMenuData.sysIsUpdate" placeholder="请选择">
						    <el-option v-for="item in tabsDataList" :key="item.id" :label="item.sysName" :value="item.id"></el-option>
						  </el-select>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="popsClose('addOrEditorMenuForm')">取 消</el-button>
				<el-button type="primary" @click="addOrEditorMenuConfirm('addOrEditorMenuForm')">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 一键同步 -->
		<el-dialog title="一键同步" :visible.sync="synchronization" width="500px" @close="popsClose('synchronizationFrom')">
			<div class="adduserForm">
				<el-form label-width="100px" :model="synchronizationFrom" :rules="synchronizationRules" ref="synchronizationFrom">
					<el-form-item label="所属系统" prop="sysId">
						<el-select v-model="synchronizationFrom.sysId" placeholder="请选择所属系统">
						    <el-option v-for="item in sysDataList" :key="item.id" :label="item.sysName" :value="item.id"></el-option>
						  </el-select>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="popsClose('synchronizationFrom')">取 消</el-button>
				<el-button type="primary" @click="synchronizationConfirm('synchronizationFrom')">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	import eltable from './components/elTable.vue'
	export default{
		components:{
			eltable
		},
		data(){
			return{
				searchData: {
					menuName: '',// 菜单名称
					menuCode: '',// 菜单编码
					// sysCode: '',// 系统编码
					//sysId:'',
					// parentMenuId: '',// 一级菜单ID
					page: 1,// 当前页
					pageSize: $globalData.pageSize// 每页展示条数
				},
				searchRules:{
					menuName: [],
					menuCode: [],
					sysCode: []
				},
				tabsData: '',
				tabsDataList: '',
				tableData: [],
				pageData: '',
				sysDataList: '',
				// 新增菜单或修改菜单弹窗
				addOrEditorMenu: false,
				dialogTitle: '新增菜单',
				addOrEditorMenuData:{
					menuName: '',//菜单名称
					menuCode: '',//菜单编码
				  //parentMenuId: '',//上级菜单id
					parentMenuName: '',//上级菜单名称					
					menuUrl: '',//菜单URL
					sysId: '',//菜单所属系统
					menuIcon:'',//菜单图标
					sysIsUpdate: false
				},
				addOrEditorMenuRules:{
					menuName: [
						{ required: true, pattern: /[\u2E80-\u9FFFa-zA-Z0-9_]{1,7}$/, message: '菜单名称长度在1到7个字符且不能以空格开头' }
					],//菜单名称
					menuCode: [
						{ required: true, message: '请输入菜单编码' }
					],//菜单编码
					currentMenuName: [
						{ required: true, message: '请选择上级菜单' }
					],//上级菜单id
					menuUrl: [
						{ required: true, message: '请输入菜单编码' }
					],//菜单URL
					sysId: [
						{ required: true, message: '请选择所属系统' }
					],//菜单所属系统
					menuIcon:[]//菜单图标
				},
				// 一键同步弹窗
				synchronization: false,
				synchronizationFrom:{
					//sysId: '' // 系统Id
					sysId: ''

				},
				synchronizationRules:{
					sysId: [{ required: true, message: '请选择所属系统' }]
				}
			}
		},
		mounted() {
			// this.getSysList()
			this.getParentMenu()
		},
		methods:{	
			getSysList(){
				// 系统列表
				this.$request.get(this.$api.querySystemNoPage).then( res => {
					if(res.code == 200){
						console.log(res.data);
						this.sysDataList = res.data
						console.log(this.sysDataList)
						this.getPageData()

					}
				})
			},
			tabsClick(val){
				// 标签卡切换
				console.log(val)				
				this.tabsData = val.name
				console.log(this.tabsData)
				this.searchData.sysId = val.name
				//this.searchData.parentMenuId = val.name

				this.searchData.page = 1
				this.getPageData()
			},
			tableOperation(row, type){
				// 表格操作事件分发
				// type   1编辑2添加3删除
				if(type == 1){
					this.editorMenu(row)
				} else if(type == 2){
					this.openAddMenu(row)
				} if(type == 3){
					this.deleteMenu(row)
				}
			},
			editorMenu(row){
				// 编辑菜单
				this.addOrEditorMenuData = {
					id: row.id,
					menuName: row.menuName,//菜单名称
					menuCode: row.menuCode,//菜单编码
					//parentMenuId: row.parentMenuId,//上级菜单id
					parentMenuName: row.parentMenuName,//上级菜单名称
					menuUrl: row.menuUrl,//菜单URL
					sysId: row.sysId,//菜单所属系统
					menuIcon:row.menuIcon,//菜单图标
					sysIsUpdate: true
				},
				this.dialogTitle = '编辑菜单'
				this.addOrEditorMenu = true
				
			},
			deleteMenu(row){
				// 删除菜单
				this.$confirm('确定要删除该菜单吗?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  this.$request.postForm(this.$api.removeMenu, {
					  id: row.id
				  }).then( res => {
				  	if(res.code == 200){
				  		this.$message.success(res.message || '操作成功')
						this.searchData.page = Math.ceil((Number(this.pageData.totalNum) - 1) / $globalData.pageSize)
				  		this.getPageData()
				  	}
				  })
				})
			},
			search(){
				// 条件筛选
				if(this.searchData.menuName != '' || this.searchData.menuCode != '' || this.searchData.sysCode != ''){
					// 避免用户在没有使用查询之前误点查询按钮
					this.searchData.page = 1
					this.getPageData()
				} else {
					this.$message.error('请先选择要查询的内容')
				}
			},
			resetForm(formName) {
				// 重置表单
				if(this.searchData.menuName != '' || this.searchData.menuCode != '' || this.searchData.sysCode != ''){
					// 避免用户在没有使用查询之前误点重置按钮
					this.$refs[formName].resetFields();
					this.getPageData()
				}
			},
			paginaClick(e){
				// 分页组件点击事件
				this.searchData.page = e
				this.getPageData()
			},
			getPageData(){
				this.$request.get(this.$api.queryMenu, this.searchData).then( res => {
					console.log(this.searchData);
					if(res.code == 200){
						this.pageData = res.data
						this.tableData = this.pageData.items
						console.log(this.tableData)
					}
				})
			},
			getParentMenu(){
				/*替换新接口*/
				this.$request.get(this.$api.querySystemNoPage).then( res => {
					if(res.code == 200){
						console.log(res.data)
						this.tabsDataList = res.data
						this.searchData.sysId = this.tabsData = this.tabsDataList[0].id	
						//this.searchData.parentMenuId = this.tabsData	
						if(this.tabsData){
							this.getPageData()
						}
					}
				})
				
			},
			openAddMenu(row){							
				// 新增菜单				
				if(row){					
					// 新增子菜单									
					this.addOrEditorMenuData.parentMenuName = row.menuName
					this.addOrEditorMenuData.sysId = row.sysId				
					this.addOrEditorMenuData.sysIsUpdate = false			
				} else {
					// 新增二级菜单
					// 过滤一级菜单ID
					let itemsObj = this.tabsDataList.filter(this.filterTabsId)[0]
					// 赋值菜单ID和名称											
					this.addOrEditorMenuData.parentMenuName = itemsObj.menuName
					this.addOrEditorMenuData.sysId = this.tabsData
					this.addOrEditorMenuData.sysIsUpdate = false
				}
				this.dialogTitle = '新增菜单'
				this.addOrEditorMenu = true
			},
			filterTabsId(obj){
				return obj.id == this.tabsData
			},
		
			popsClose(e){
				// 弹窗关闭
				this.addOrEditorMenu = false
				this.synchronization = false
				this.$refs[e].resetFields();
				this.addOrEditorMenuData = {
					menuName: '',//菜单名称
					menuCode: '',//菜单编码
					//parentMenuId: '',//上级菜单id
					parentMenuName: '',//上级菜单名称
					menuUrl: '',//菜单URL
					sysId: '',//菜单所属系统
					sysIsUpdate: false
				}
			},
			addOrEditorMenuConfirm(e){
				// 新增或修改确定按钮
				this.$refs[e].validate((valid) => {
					if (valid) {
						let reqUrl = ''
						if(this.dialogTitle == '新增菜单'){
							reqUrl = this.$api.saveMenu
						} else {
							reqUrl = this.$api.updateMenu
						}
						this.$request.postForm(reqUrl, this.addOrEditorMenuData).then( res => {
							if(res.code == 200){
								this.$message.success(res.message || '操作成功')
								this.getPageData()
								this.addOrEditorMenu = false
							}
						})
					} else {
					this.$message.error('请认真核对输入信息！')
						return false;
					}
				});
			},
			synchronizationConfirm(e){
				// 一键同步确定按钮
				this.$refs[e].validate((valid) => {
				  if (valid) {
					this.$request.postForm(this.$api.oneClickSynchronization, this.synchronizationFrom).then( res => {
						if(res.code == 200){
							this.$message.success(res.message || '操作成功')
							this.synchronization = false
							this.getPageData()
						}
					})
					console.log('submit!');
				  } else {
					this.$message.error('请认真核对输入信息！')
					return false;
				  }
				});
			},
			uploadIconImage(file){
				// 上传菜单图标
				let that = this
				let files = file.file
				let imageSize = 1024*1024*5// 限制上传图片大小为1MB
				if(files.size > imageSize){
					this.$message.error('上传图片大小超过限制，请上传1MB以内大小的图片')
					return
				}
				if(files.type != 'image/jpeg'){
					this.$message.error('头像只能是jpg、jpeg格式')
					return
				}
				let fileRead = new FileReader();
				fileRead.readAsDataURL(files)
				fileRead.onload = function(e){
					// 转换成base64格式传给后台
					that.addOrEditorMenuData.menuIcon = this.result
				}			
			}

		}
	}
</script>

<style scoped="scoped">
	.el-form-item {
		margin-bottom: 0 !important;
	}
	.addOrEditorMenuForm>>>.el-form-item {
		margin-bottom: 20px !important;
	}
	.contBox{
		position: relative;
	}
	.addMenuBtn{
		position: absolute;
		right: 0px;
		z-index: 5;
		/* top: 20px; */
	}

.avatar-uploader>>>.el-upload {
		border: 1px dashed #d9d9d9 !important;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}

	.avatar {
		width: 100px;
		height: 100px;
		display: block;
	}





</style>
