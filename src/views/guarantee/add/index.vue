<template>
	<el-card>
		<div slot="header" class="clearfix">
		    <span>新增质保卡</span>
		</div>
		<el-form class="formDatas" label-width="80px" :model="postData">
		  <el-form-item label="客户姓名">
		    <el-input v-model="postData.userName" class="INPUT"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号码">
		    <el-input v-model="postData.phone" class="INPUT"></el-input>
		  </el-form-item>
		  <el-form-item label="受保车型">
		       <el-select v-model="postData.carId" class="INPUT" placeholder="请选择">
		           <el-option v-for="item in carTypes" :label="item.name" :value="item.id"></el-option>
		         </el-select>
		  </el-form-item>
		  <el-form-item label="车牌号码">
		    <el-input v-model="postData.carNum" class="INPUT"></el-input>
		  </el-form-item>
		 <el-form-item label="施工膜类">
		    <el-select v-model="postData.chemoId" class="INPUT" placeholder="请选择">
		        <el-option v-for="item in chemoList" :label="item.name" :value="item.id"></el-option>
		    	<!-- <el-option label="b" value="2"></el-option> -->
		      </el-select>
		  </el-form-item>
		  <el-form-item label="质保日期">
		    <el-date-picker
		          v-model="postData.updateTime"
		          type="date" class="INPUT"
		          placeholder="选择日期"
				  format="yyyy 年 MM 月 dd 日"
				  value-format="yyyy-MM-dd"
				  >
		        </el-date-picker>
		  </el-form-item>
		  <el-form-item label="交车日期">
		    <el-date-picker
		          v-model="postData.createTime"
		          type="date" class="INPUT"
		          placeholder="选择日期"
		    	  format="yyyy 年 MM 月 dd 日"
		    	  value-format="yyyy-MM-dd"
		    	  >
		        </el-date-picker>
		  </el-form-item>
		  <el-form-item label="施工店铺">
		    <el-select v-model="postData.storeId" class="INPUT" placeholder="请选择">
		        <el-option v-for="item in shopList" :label="item.name" :value="item.id"></el-option>
		      </el-select>
		  </el-form-item>
		 <!-- <el-form-item label="是否贴膜">
		    <el-select v-model="postData.makeStatus" placeholder="请选择">
		        <el-option label="已做" value="0"></el-option>
		  		<el-option label="未做" value="1"></el-option>
		      </el-select>
		  </el-form-item> -->
		  <el-form-item label="整车价格">
		    <el-input v-model="postData.priceId" class="INPUT"></el-input>
		  </el-form-item>
		  <el-form-item label="备注">
		    <el-input v-model="postData.remark" class="INPUT"></el-input>
		  </el-form-item>
		  <el-form-item label="车辆图片">
		    <div class="imagesList">
		    	<div class="imagesListItem" v-for="item in postData.imgs">
		    		<el-image class="bannerImage " :src="item" fit="cover"></el-image>
		    		<i class="el-icon-remove-outline imgIcon" @click="deleteImg(item)"></i>
		    	</div>
		    	<el-upload
		    	  class="avatar-uploader"
		    	  action="https://jsonplaceholder.typicode.com/posts/"
		    	  :show-file-list="false"
		    	  :http-request="uploadFileList"
		    	  >
		    	  <i class="el-icon-plus avatar-uploader-icon"></i>
		    	</el-upload>
		    </div>
		  </el-form-item>
		</el-form>
		<div class="BtnBox">
		    <el-button @click="$router.back()">返回上一页</el-button>
			<el-button type="primary" @click="postAddOrUpdateUserCarinfo">确定</el-button>
		</div>
	</el-card>
</template>

<script>
	export default{
		data(){
			return{
				postData:{
					userMessageId: '',
					userName: '', // 用户姓名
					phone: '', // 用户电话
					carNum: '', // 车牌号
					priceId: '', // 所做的价格
					carId: '', // 受保车型
					createTime: '', // 交车时间
					updateTime: '', // 有效时间
					makeStatus: '0', // 是否做摸（0 已做 1 未做）
					storeId: '', // 施工店铺
					chemoId: '', // 施工膜类
					remark: '', // 添加备注
					imgs: []
				},
				imgsMap: new Map(),
				carTypes: '',
				shopList: '',
				chemoList: ''
			}
		},
		mounted() {
			this.getCarTypes()
			this.getShopList()
			this.getCarColor()
		},
		methods:{
			postAddOrUpdateUserCarinfo(){
				this.$request.postJson(this.$api.addOrUpdateUserCarinfo, this.postData).then(res => {
					if (res.code == 'succes') {
						this.$message.success('添加成功')
						setTimeout(()=>{
							this.$router.back()
						},500)
					}
				})
			},
			uploadFileList(file){
				let Files = file.file
				let formData = new FormData()
				formData.append('fileList', Files)
				this.$request.uploading(this.$api.upLoadImg, formData).then(res => {
					if (res.code == 'succes') {
						this.imgsMap.set(res.data, res.data)
						this.postData.imgs = [...this.imgsMap.values()]
					}
				})
			},
			deleteImg(data){
				// 删除图片列表的数据
				this.imgsMap.delete(data)
				this.postData.imgs = [...this.imgsMap.values()]
			},
			getCarTypes() {
				// 车辆品牌
				this.$request.postJson(this.$api.selectCarType, {
					typeId: '0'
				}).then(res => {
					if (res.code == 'succes') {
						this.carTypes = res.data
					}
				})
			},
			getShopList() {
				this.$request.get(this.$api.getStoreList, {
					name: ''
				}).then(res => {
					if (res.code == 'succes') {
						this.shopList = res.data
					}
				})
			},
			getCarColor() {
				// 车膜
				this.$request.postJson(this.$api.selectCheMoList, {
					pageNum: 1,
					pageSize: 20000
				}).then(res => {
					if (res.code == 'succes') {
						this.chemoList = res.data.list
					}
				})
			},
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
		.formDatas>>>.INPUT,.formDatas>>>.el-input{
		  width: 100%;
	  }
</style>
