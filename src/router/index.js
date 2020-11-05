import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'

import reconsitution from './reconsitution.js'
Vue.use(VueRouter)

// import module
import {home} from './module/home.js' // 首页
import {homePage} from './module/homePage.js' // 首页管理
import {caseManage} from './module/case.js' // 案例管理
import {information} from './module/information.js' // 资讯管理
import {shop} from './module/shop.js' // 店铺管理
import {product} from './module/product.js' // 产品管理
import {guarantee} from './module/guarantee.js' // 质保卡管理
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
			homePage,
			caseManage,
			information,
			shop,
			product,
			guarantee
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
