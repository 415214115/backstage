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
			name: "index",
			component: () => import('@/views/guarantee/index/index.vue'),
			meta: {
				title: '质保卡管理',
				icon: ''
			}
		}
	]
}
