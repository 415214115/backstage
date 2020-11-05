import Layout from '@/views/layout'
export const homePage = {
	path: 'homepage',
	name: 'homepage',
	component: Layout,
	meta: {
		title: '首页管理',
		icon: 'el-icon-s-flag'
	},
	children: [
		{
			path: "banner",
			name: "banner",
			component: () => import('@/views/homePage/banner/index.vue'),
			meta: {
				title: '首页轮播图管理',
				icon: ''
			}
		},
		{
			path: "case",
			name: "case",
			component: () => import('@/views/homePage/case/index.vue'),
			meta: {
				title: '首页案例封面',
				icon: ''
			}
		},
	]
}