<template>
	<el-card>
		<div class="clearfix">
			基础信息
		</div>
		<div class="information">
			<ul>
				<li>
					<span>申请人名称</span>
					<div>{{ pageData.name }}</div>
				</li>
				<li>
					<span>居住地址</span>
					<div>{{ pageData.address }}</div>
				</li>
			</ul>
			<ul>
				<li>
					<span>申请人身份证号</span>
					<div>{{ pageData.cardId }}</div>
				</li>
				<li>
					<span>联系电话</span>
					<div>18726657487</div>
				</li>
			</ul>
		</div>
		<div class="imageBox">
			<div class="imageBoxList">
				<div class="imageTitle">身份证正面照片</div>
				 <el-image class="images" :src="pageData.cardFront?pageData.cardFront:$globalData.defaultImg" :preview-src-list="[pageData.cardFront]" fit="cover"></el-image>
			</div>
			<div class="imageBoxList">
				<div class="imageTitle">身份证反面照片</div>
				<el-image class="images" :src="pageData.cardReverse?pageData.cardReverse:$globalData.defaultImg" :preview-src-list="[pageData.cardReverse]" fit="cover"></el-image>
			</div>
			<div class="imageBoxList">
				<div class="imageTitle">手持身份证照片</div>
				<el-image class="images" :src="pageData.holdingCard?pageData.holdingCard:$globalData.defaultImg" :preview-src-list="[pageData.holdingCard]" fit="cover"></el-image>
			</div>
			<div class="imageBoxList">
				<div class="imageTitle">经营场所证明图片</div>
				<el-image class="images" :src="pageData.placeBusiness?pageData.placeBusiness:$globalData.defaultImg" :preview-src-list="[pageData.placeBusiness]" fit="cover"></el-image>
			</div>
		</div>
		<!-- <div class="clearfix" style="margin-top: 50px;">
			团队信息
		</div>
		<div class="information">
			<ul>
				<li>
					<div>团队名称</div>
					<span>张三</span>
				</li>
				<li>
					<div>团队编码</div>
					<span>500223-A1</span>
				</li>
				<li>
					<div>经营地址</div>
					<span>重庆市万州区云阳县2一二三街道28号</span>
				</li>
			</ul>
		</div>
		<div class="imageBox">
			<div class="imageBoxList">
				<div class="imageTitle">经营场所证明图片</div>
				 <el-image class="images" src="" fit="cover"></el-image>
			</div>
			<div class="imageBoxList">
				<div class="imageTitle">其他资料</div>
				<el-image class="images" src="" fit="cover"></el-image>
			</div>
		</div> -->
		<el-input class="textarea" type="textarea" placeholder="请输入内容" disabled v-if="pageData.state == 'FAIL'" v-model="pageData.remarks"></el-input>
		<div class="btnBox" v-if="pageQuery.type == 1 && pageData.state == 'PROCESS'">
			<el-button type="primary" @click="examine(1)">审批通过</el-button>
			<el-button type="primary" @click="examine(0)">拒绝通过</el-button>
		</div>
	</el-card>
</template>

<script>
	export default {
		data(){
			return{
				pageQuery: '',
				pageData: ''
			}
		},
		mounted() {
			this.pageQuery = this.$route.query
			if(this.pageQuery){
				this.getPageData()
			}
		},
		methods:{
			getPageData(){
				this.$request.get(this.$api.queryAgentDetailed, {
					id: this.pageQuery.id
				}).then( res => {
					if(res.code == 200){
						this.pageData = res.data
						console.log(res)
					}
				})
			},
			examine(type){
				// 申请审核 1审核通过2审核不通过
				if(type){
					console.log(type)
					this.toExamineFun('SUCCESS', '')
				} else {
					this.$prompt('', '备注', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  inputPlaceholder: '请输入备注(不可全为空格和换行)',
					  inputType: 'textarea',
					  inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
					  inputErrorMessage: '请输入备注'
					}).then(({ value }) => {
						this.toExamineFun('FAIL', value)
					}).catch(() => {
					  this.$message('取消输入');
					});
				}
			},
			toExamineFun(state, remark){
				this.$request.postForm(this.$api.agentCheck, {
					id: this.pageQuery.id,
					state: state,
					remarks: remark
				}).then( res => {
					if(res.code == 200){
						this.$message.success(res.message)
						this.getPageData()
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.clearfix{
		margin-bottom: 20px;
		border-bottom: 1px solid #EEEEEE;
		padding-bottom: 20px;
	}
	.information,.information ul{
		width: 100%;
	}
	.information ul li{
		list-style-type: none;
		line-height: 32px;
		display: inline-block;
		width: 40%;
	}
	.information ul li span{
		width: 110px;
		margin-right: 20px;
		display: inline-block;
	}
	.information ul li div{
		display: inline-block;
		width: 330px;
	}
	.imageBox{
		width: 100%;
		display: flex;
		justify-content: start;
		flex-wrap: nowrap;
		margin-top: 20px;
	}
	.images{
		width: 150px;
		height: 150px;
		margin-top: 20px;
		cursor: pointer;
	}
	.imageBoxList{
		margin-right: 100px;
	}
	.btnBox{
		margin-top: 50px;
	}
	.textarea{
		margin-top: 20px;
		width: 60%;
	}
</style>
