import Layout from '@/views/layout'
export const guarantee = {
	path: 'guarantee',
	name: 'guarantee',
	component: Layout,
	meta: {
		title: '质保卡管理',
		icon: 'el-icon-s-management'
	},
	children: [
		{
			path: "index",
			name: "guaranteeindex",
			component: () => import('@/views/guarantee/index/index.vue'),
			meta: {
				title: '质保卡管理',
				icon: ''
			}
		},
		{
			path: "add",
			name: "add",
			component: () => import('@/views/guarantee/add/index.vue'),
			hidden: true,
			meta: {
				title: '新增质保卡',
				icon: ''
			}
		},
		{
			path: "details",
			name: "details",
			component: () => import('@/views/guarantee/details/index.vue'),
			hidden: true,
			meta: {
				title: '质保卡详情',
				icon: ''
			}
		}
	]
}
