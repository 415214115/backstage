import Layout from '@/views/layout'
export const product = {
	path: 'product',
	name: 'product',
	component: Layout,
	meta: {
		title: '产品管理',
		icon: 'el-icon-s-custom'
	},
	children: [
		{
			path: "index",
			name: "index",
			component: () => import('@/views/product/car/index.vue'),
			meta: {
				title: '汽车品牌管理',
				icon: ''
			}
		},
		{
			path: "version",
			name: "version",
			component: () => import('@/views/product/version/index.vue'),
			meta: {
				title: '汽车型号管理',
				icon: ''
			}
		},
		{
			path: "series",
			name: "series",
			component: () => import('@/views/product/series/index.vue'),
			meta: {
				title: '产品系列管理',
				icon: ''
			}
		},
		{
			path: "colour",
			name: "colour",
			component: () => import('@/views/product/colour/index.vue'),
			meta: {
				title: '产品颜色管理',
				icon: ''
			}
		}
	]
}