<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>新增案例</span>
		</div>
		<el-form class="formDatas" label-width="80px" :model="postData">
			<el-form-item label="标题">
				<el-input v-model="postData.title" class="inputs"></el-input>
			</el-form-item>
			<el-form-item label="简介">
				<el-input type="textarea" placeholder="请输入内容" v-model="postData.context"></el-input>
				<!-- <el-input v-model="postData.context"></el-input> -->
			</el-form-item>
			<el-form-item label="图片介绍">
				<el-input type="textarea" placeholder="请输入内容" v-model="postData.showText"></el-input>
				<!-- <el-input v-model="postData.showText"></el-input> -->
			</el-form-item>
			<el-form-item label="案例类型">
				<el-select v-model="postData.showType" class="inputs" placeholder="请选择">
					<el-option label="精彩案例" value="1"></el-option>
					<el-option label="最新案例" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车辆颜色">
				<el-select v-model="postData.carColor" class="inputs" placeholder="请选择">
					<el-option v-for="item in carColorList" :label="item.name" :value="item.name"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="贴膜类型">
				<el-select v-model="postData.chemoType" class="inputs" placeholder="请选择">
					<el-option v-for="item in chemoList" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车辆类型">
				<el-select v-model="postData.carType" class="inputs" placeholder="请选择">
					<el-option v-for="item in carTypes" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="封面图">
				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
				 :http-request="uploadFile">
					<img v-if="postData.showImg" :src="postData.showImg" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="图片">
				<div class="imagesList">
					<div class="imagesListItem" v-for="item in postData.imgs">
						<el-image class="bannerImage " :src="item" fit="cover"></el-image>
						<i class="el-icon-remove-outline imgIcon" @click="deleteImg(item)"></i>
					</div>
					<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
					 :http-request="uploadFileList">
						<i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			</el-form-item>
		</el-form>
		<div class="BtnBox">
			<el-button @click="$router.back()">返回上一页</el-button>
			<el-button type="primary" @click="addCase">确定</el-button>
		</div>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				datas: {},
				postData: {
					title: '', // 车模型标题
					context: '', // 简介
					showText: '', // 图片文字展示信息
					showImg: '', //  首页展示图片
					carColor: '', // 颜色
					carType: '', // 车辆型号
					chemoType: '', //车模系列
					showType: '', //案例类型 (1 精彩案例 2 最新案例)
					imgs: [] // 图片集合
				},
				carColorList: '',
				chemoList: '',
				carTypes: '',
				imgsMap: new Map(),
				listIndex: 0
			}
		},
		mounted() {
			this.getCarColor()
			this.getCarMo()
			this.getCarTypes()
		},
		methods: {
			addCase() {
				this.$request.postJson(this.$api.addCarModelType, this.postData).then(res => {
					if (res.code == 'succes') {
						this.$message.success('新增成功')
						setTimeout(() => {
							this.$router.back()
						}, 500)
					}
				})
			},
			getCarColor() {
				// 车辆颜色
				this.$request.get(this.$api.selectColorList).then(res => {
					if (res.code == 'succes') {
						this.carColorList = res.data
					}
				})
			},
			getCarMo() {
				// 贴膜类型
				this.$request.postJson(this.$api.selectCheMoList, {
					pageNum: 1,
					pageSize: 20000
				}).then(res => {
					if (res.code == 'succes') {
						this.chemoList = res.data.list
					}
				})
			},
			getCarTypes() {
				// 车辆品牌
				this.$request.postJson(this.$api.selectCarType, {
					typeId: '-1'
				}).then(res => {
					if (res.code == 'succes') {
						this.carTypes = res.data
					}
				})
			},
			uploadFile(file) {
				let Files = file.file
				let formData = new FormData()
				formData.append('fileList', Files)
				this.$request.uploading(this.$api.upLoadImg, formData).then(res => {
					if (res.code == 'succes') {
						this.postData.showImg = res.data
					}
				})
			},
			uploadFileList(file) {
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
			deleteImg(data) {
				// 删除图片列表的数据
				this.imgsMap.delete(data)
				this.postData.imgs = [...this.imgsMap.values()]
			}
		}
	}
</script>

<style scoped="scoped">
	.bannerImage,
	.imagesListItem {
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

	.imagesList {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
	}

	.imagesListItem {
		margin-right: 20px;
	}

	.BtnBox {
		text-align: center;
		margin-top: 20px;
	}

	.imgIcon {
		position: absolute;
		color: #FFFFFF;
		background: red;
		border-radius: 100%;
		top: -5px;
		right: -5px;
		cursor: pointer;
	}
	.formDatas>>>.el-textarea__inner{
		height: 150px;
	}
	.formDatas>>>.inputs,.formDatas>>>.el-input{
		width: 100% !important;
	}
</style>
