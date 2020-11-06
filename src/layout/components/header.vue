<template>
	<div class="headers">
		<div class="headerCenter">
			<!-- 欢迎，{{userInfo.nickName || userInfo.name || userInfo.phone}} -->
			<!-- <span>个人中心</span> -->
			<span @click="loginOut">【退出登录】</span>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'headers',
		data(){
			return{
				userInfo: ''
			}
		},
		mounted() {
			let info = JSON.parse(sessionStorage.getItem('userInfo'))
			if (info) {
				this.userInfo = info
			}
		},
		methods:{
			loginOut(){
				// 清空所有缓存
				sessionStorage.clear()
				this.$router.replace('/login')
			}
		}
	}
</script>

<style scoped="scoped">
	.headers{
		color: #333;
		text-align: right;
		line-height: 50px;
		width: 100%;
		/* background: #FFFFFF; */
		box-shadow: 0 0 10px 1px rgba(0,0,0,0.1);
		padding: 0 24px;
	}
	.headers span{
		margin-left: 20px;
		cursor: pointer;
	}
	.headers span:hover{
		color: #409EFF;
	}
	/* .headerCenter,.lowerCenter{
		position: relative;
		left: 0;
		right: 0;
		width: 1200px;
		height: 100%;
		margin: auto;
	} */
	/* .lower{
		background: #F8F8F8;
		height: 30px;
		width: 100%;
		line-height: 30px;
	} */
</style>
