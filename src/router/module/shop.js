import Layout from '@/views/layout'
export const shop = {
	path: 'shop',
	name: 'shop',
	component: Layout,
	meta: {
		title: '店铺管理',
		icon: 'el-icon-monitor'
	},
	children: [
		{
			path: "index",
			name: "shopindex",
			component: () => import('@/views/shop/index/index.vue'),
			meta: {
				title: '店铺管理',
				icon: ''
			}
		}
	]
}
