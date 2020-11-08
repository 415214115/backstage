import Layout from '@/views/layout'
export const information = {
	path: 'information',
	name: 'information',
	component: Layout,
	meta: {
		title: '资讯管理',
		icon: 'el-icon-menu'
	},
	children: [
		{
			path: "index",
			name: "informationindex",
			component: () => import('@/views/information/index/index.vue'),
			meta: {
				title: '资讯管理',
				icon: ''
			}
		},
		{
			path: "details/:id",
			name: "informationdetails",
			component: () => import('@/views/information/details/index.vue'),
			hidden: true,
			meta: {
				title: '资讯详情',
				icon: ''
			}
		},
		{
			path: "addinformation",
			name: "addinformation",
			component: () => import('@/views/information/addInformation/index.vue'),
			hidden: true,
			meta: {
				title: '新增资讯',
				icon: ''
			}
		},
	]
}
