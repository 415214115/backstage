import Layout from '@/views/layout'
export const price = {
	path: 'price',
	name: 'price',
	component: Layout,
	meta: {
		title: '价格管理',
		icon: 'el-icon-monitor'
	},
	children: [
		{
			path: "index",
			name: "priceindex",
			component: () => import('@/views/price/index.vue'),
			meta: {
				title: '价格管理',
				icon: ''
			}
		}
	]
}
