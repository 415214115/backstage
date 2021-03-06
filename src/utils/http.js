import axios from 'axios'
import router from "../router"; //导入路由
import qs from 'qs'
import {
	MessageBox,
	Message
} from 'element-ui'

// const URLafter = '/api'

// create an axios instance
export const http = axios.create({
	// https://kwkxcx.com
	// baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
	// baseURL: 'https://chenzhouhuang.utools.club', // url = base url + request url 
	baseURL: 'https://kwkxcx.com', // url = base url + request url
	// withCredentials: true,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
	},
	timeout: 60000 // 设置超时时间
})
/**
 * 请求拦截器，
 */
http.interceptors.request.use(config => {
	const token = sessionStorage.getItem('token')
	// 请求携带token
	if (token != '' && token != null) {
		config.headers['token'] = token
	}
	// console.log(config)
	if (config.postType === 1 && config.method == 'post') {
	  config.data = qs.stringify(config.data)
	 }
	// config.data = qs.stringify(config.data)
	return config
}, error => {
	// do something with request error
	console.log(error) // for debug
	return Promise.reject(error)
})

/**
 * 返回拦截器，
 */
http.interceptors.response.use(response => {
	const res = response.data
	// console.log(response)
	if(res.code != 'succes'){
		Message.error(res.msg)
		return Promise.reject(res)
		// errorHandle(res.code, res.message)
	}
	return res
}, error => {
	//超时处理
	if (String(error).indexOf('timeout') != -1) {
		Message.error('请求超时!')
		return
	}
	if (String(error).indexOf('Network') != -1) {
		Message.error('网络错误!')
		return
	}
	console.log('错误')
	// console.log(error) // for debug
	console.log(error.response.data) // for debug
	errorHandle(error.response.data.status, error.response.data.message)
	return Promise.reject(error.response)
})

//错误处理
const errorHandle = (status, other) => {
	// 状态码判断
	/**
	 * @param {Object} status
	 * 状态码和后台约定，进行相应操作
	 * 请求成功	200
	 * 请求失败	400
	 * 内部错误	500
	 * 未授权	401
	 * 不合法的参数	40035
	 * 请求超时	408
	 */
	switch (status) {
		case 400:
			// 401: 未登录状态，跳转登录页
			Message.error(other)
			break;
		case 401:
			Message.error(other)
			break;
		case 500:
			Message.error('内部服务器错误')
			break;
		case 404:
			Message.error(other)
			break;
		case 408:
			Message.error(other)
			break;
		default:
			console.log(other)
	}
}
