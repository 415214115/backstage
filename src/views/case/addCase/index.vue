<template>
	<el-card>
		<div slot="header" class="clearfix">
		    <span>新增案例</span>
		</div>
		<el-form class="formDatas" label-width="80px" :model="datas">
		  <el-form-item label="标题">
		    <el-input v-model="datas"></el-input>
		  </el-form-item>
		  <el-form-item label="简介">
		    <el-input v-model="datas"></el-input>
		  </el-form-item>
		  <el-form-item label="封面图">
		    <el-upload
		      class="avatar-uploader"
		      action="https://jsonplaceholder.typicode.com/posts/"
		      :show-file-list="false">
		      <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
		      <i class="el-icon-plus avatar-uploader-icon"></i>
		    </el-upload>
		  </el-form-item>
		  <el-form-item label="图片">
		    <div class="imagesList">
				<div class="imagesListItem">
					<el-image class="bannerImage " src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image>
					<i class="el-icon-remove-outline imgIcon"></i>
				</div>
				<el-upload
				  class="avatar-uploader"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :show-file-list="false">
				  <i class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</div>
		  </el-form-item>
		</el-form>
		<div class="BtnBox">
		    <el-button>返回上一页</el-button>
			<el-button type="primary">确定</el-button>
		</div>
	</el-card>
</template>

<script>
	export default{
		data(){
			return{
				datas:{}
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped="scoped">
	.bannerImage,.imagesListItem{
		width: 50px;
		height: 50px;
		border-radius: 5px;
		position: relative;
	}
	.formDatas>>>.avatar-uploader .el-upload {
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
	    width: 50px;
	    height: 50px;
	    line-height: 50px;
	    text-align: center;
	  }
	  .avatar {
	    width: 50px;
	    height: 50px;
	    display: block;
	  }
	  .imagesList{
		  display: flex;
		  justify-content: start;
		  flex-wrap: wrap;
	  }
	  .imagesListItem{
		  margin-right: 20px;
	  }
	  .BtnBox{
		  text-align: center;
		  margin-top: 20px;
	  }
	  .imgIcon{
	  		  position: absolute;
	  		  color: #FFFFFF;
	  		  background: red;
	  		  border-radius: 100%;
	  		  top: -5px;
	  		  right: -5px;
	  		  cursor: pointer;
	  }
</style>
