<template>
	<div class="login-container">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

			<div class="title-container">
				<h3 class="title">KWK色彩车身保护膜后台管理系统登录</h3>
			</div>

			<el-form-item prop="name">
				<!-- <i class="el-icon-user"></i> -->
				<el-input ref="username" v-model="loginForm.name" placeholder="Username" name="username" type="text" tabindex="1"
				 autocomplete="on" :validate-event="false">
				 <i slot="prefix" class="el-icon-user"></i>
				 </el-input>
			</el-form-item>
			<el-form-item prop="password">
				<!-- <i class="el-icon-lock"></i> -->
				<el-input ref="password" v-model="loginForm.password" placeholder="Password" name="password" :type="pwdIsShow?'password':'text'" tabindex="1"
				 autocomplete="on" :validate-event="false" >
				 <i slot="prefix" class="el-icon-lock"></i>
				 <!-- <i slot="suffix" class="el-icon-view" @click="pwdIsShow = !pwdIsShow"></i> -->
				 </el-input>
			</el-form-item>
			<el-button type="primary" class="loginBtn" :loading="isLoding" @click="loginApp('loginForm')">Login</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			const validateUsername = (rule, value, callback) => {
				if (!value) {
					callback(new Error('账号不能为空'))
				} else {
					callback()
				}
			}
			const validatePassword = (rule, value, callback) => {
				if (!value) {
					callback(new Error('密码不能为空'))
				} else {
					callback()
				}
			}
			return {
				loginForm: {
					name: '',
					password: ''
				},
				loginRules: {
					name: [{
						required: true,
						validator: validateUsername
					}],
					password: [{
						required: true,
						validator: validatePassword
					}]
				},
				isLoding: false,
				pwdIsShow:true
			}
		},
		created() {
			// window.addEventListener('storage', this.afterQRScan)
		},
		mounted() {

		},
		destroyed() {
			// window.removeEventListener('storage', this.afterQRScan)
		},
		methods: {
			loginApp(formName){
				this.isLoding = true
				this.$refs[formName].validate((valid)=>{
					if (valid) {
						this.$request.postJson(this.$api.login, this.loginForm).then( res => {
							if(res.code == 'succes'){
								sessionStorage.setItem('token','yes')
								this.$router.replace('/index')
							}
						})
					} else{
						this.$message.error('请仔细核对所填信息')
					}
				})
				this.isLoding = false
			}
		}
	}
</script>

<style scoped="scoped">
	.login-container {
		background-color: #2d3a4b;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		text-align: center;
	}
	.login-form{
		width: 400px;
		position: relative;
		left: 50%;
		margin-left: -200px;
		height: 220px;
		/* top: 50%; */
		margin-top: 220px;
	}
	.title-container{
		margin-bottom: 30px;
		color: #FFFFFF;
	}
	.loginBtn{
		width: 100%;
	}
	.login-container>>>.el-input__inner{
		background-color: #2B3540;
		border-color: #304156;
		padding-left: 40px;
		color: #FFFFFF;
	}
	.login-container>>>.el-input__inner::-webkit-input-placeholder{
		color: #545C70;
	}
	.login-container>>>.el-form-item__content{
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	.login-container>>>.el-form-item__content i{
		color: #545C70;
		margin-top: 10px;
		margin-right: 20px;
		font-size: 20px;
	}
	.login-container>>>.el-input__inner:-webkit-autofill,
	 .login-container>>>.el-input__inner:-webkit-autofill:hover,
	 .login-container>>>.el-input__inner:-webkit-autofill:focus,
	 .login-container>>>.el-input__inner:-webkit-autofill:active {
		-webkit-transition-delay: 99999s;
		-webkit-transition:  color 99999s ease-out,background-color 99999s ease-out;
	} 
	.login-container>>>.el-form-item .el-input{
		width: 400px;
	}
</style>
