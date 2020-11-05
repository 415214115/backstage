import Layout from '@/views/layout'
export const jurisdictionManage = {
	path: 'jurisdictionmanage',
	name: 'jurisdictionmanage',
	component: Layout,
	meta: {
		title: '权限管理',
		icon: 'el-icon-folder-opened'
	},
	children: [
		{
			path: "webjurisdiction",
			name: "webjurisdiction",
			component: () => import('@/views/jurisdictionManage/pcJurisdiction/index.vue'),
			meta: {
				title: 'web权限管理',
				icon: ''
			}
		},
	]
}