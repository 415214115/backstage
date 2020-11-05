<template>
	<el-card>
		<div slot="header" class="clearfix">
		    <span>案例详情</span>
			<el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
		</div>
		<el-form class="formDatas" label-width="80px" :model="datas">
		  <el-form-item label="标题">
		    <el-input v-model="datas"></el-input>
		  </el-form-item>
		  <el-form-item label="简介">
		    <el-input v-model="datas"></el-input>
		  </el-form-item>
		  <el-form-item label="封面图">
			  <div class="imagesList">
				<el-image class="bannerImage imagesListItem" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image>
				<el-upload
				  class="imagesListItem"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :show-file-list="false">
				  <el-button type="text">修改</el-button>
				  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
				  <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
				</el-upload>
			</div>
		  </el-form-item>
		  <el-form-item label="图片">
		    <div class="imagesList">
				<el-image class="bannerImage imagesListItem" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image>
				<el-upload
				  class="avatar-uploader"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :show-file-list="false">
				  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
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
	.bannerImage{
		width: 50px;
		height: 50px;
		border-radius: 5px;
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
		  align-items: center;
	  }
	  .imagesListItem{
		  margin-right: 20px;
	  }
	  .BtnBox{
		  text-align: center;
		  margin-top: 20px;
	  }
</style>
