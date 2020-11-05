import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'

import reconsitution from './reconsitution.js'
Vue.use(VueRouter)

// import module
import {home} from './module/home.js' // 首页
import {userManage} from './module/userManage.js' // 用户管理
import {workExamine} from './module/workExamine.js' // 工作审批
import {systemManage} from './module/systemManage.js' // 系统管理
import {menuManage} from './module/menuManage.js' // 菜单管理
import {homePage} from './module/homePage.js' // 首页管理
// import {jurisdictionManage} from './module/jurisdictionManage.js' // 权限管理
export const routes = [{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录',
			icon: ''
		},
		component: () => import('@/views/login/index.vue')
	},
	{
		path: '/',
		name: 'layout',
		component: () => import('@/layout/index.vue'),
		redirect: '/index',
		children: [
			home,
			userManage,
			workExamine,
			systemManage,
			menuManage,
			homePage,
			// jurisdictionManage
		]
	}
]



// routes = routes.concat(classifyRouter)
export const editRouter = reconsitution(routes)
const router = new VueRouter({
	mode: 'history',
	routes
})


export default router

// 一级嵌套路由实例
/**
 * {
	path: 'management',
	name: 'management',
	component: Layout,
	meta: {
		title: '首页2',
		icon: 'el-icon-location'
	},
	children: [{
			path: "index",
			name: "defaultPage",
			component: Layout,
			meta: {
				title: '专享',
				icon: 'el-icon-location'
			}
		}
	]
}
 */
// 二级嵌套路由实例
/**
 * {
	path: 'management',
	name: 'management',
	component: Layout,
	meta: {
		title: '首页2',
		icon: 'el-icon-location'
	},
	children: [{
			path: "index",
			name: "defaultPage",
			component: Layout,
			meta: {
				title: '专享',
				icon: 'el-icon-location'
			},
			children: [{
					path: "indexall",
					name: "defaultPage123",
					component: () => import("@/views/test/index.vue"),
					hidden: true,
					meta: {
						title: '专享福利333333',
						icon: 'el-icon-location'
					}
				}
			]
		}
	]
}
 */
