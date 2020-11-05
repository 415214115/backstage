<template>
	<el-card>
		<div slot="header" class="clearfix">
		    <span>店铺管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="add">新增店铺</el-button>
		  </div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="店铺名称"></el-table-column>
		    <el-table-column prop="date" label="封面图">
				<template slot-scope="scope">
					<el-image class="bannerImage" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="地址"></el-table-column>
			<el-table-column prop="address" label="电话"></el-table-column>
		    <el-table-column prop="address" label="创建时间"></el-table-column>
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
							<el-form-item label="店铺名称">
							  <el-input v-model="dialogForm.name"></el-input>
							</el-form-item>
		  				  <el-form-item label="地址">
		  				    <el-input v-model="dialogForm.name"></el-input>
		  				  </el-form-item>
						  <el-form-item label="电话">
						    <el-input v-model="dialogForm.name"></el-input>
						  </el-form-item>
		  				  <el-form-item label="上传图片">
		  				    <el-upload
		  				      class="avatar-uploader"
		  				      action="https://jsonplaceholder.typicode.com/posts/"
		  				      :show-file-list="false">
		  				      <img v-if="imageUrl" :src="imageUrl" class="avatar">
		  				      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		  				    </el-upload>
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
	export default{
		data(){
			return{
				tableData: [
					{
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
				dialogTitle: '新增店铺',
				imageUrl: ''
			}
		},
		methods:{
			add(){
				// 新增店铺
				this.dialogTitle = '新增店铺'
				this.dialogVisible = true
			},
			editor(){
				// 编辑店铺
				this.dialogTitle = '编辑店铺'
				this.dialogVisible = true
			},
			handleClose(){
				
			}
		}
	}
</script>

<style scoped="scoped">
	.bannerImage{
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}
	.dialogContent>>>.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
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
