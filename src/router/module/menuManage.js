import Layout from '@/views/layout'
export const menuManage = {
	path: 'menumanage',
	name: 'menumanage',
	component: Layout,
	meta: {
		title: '菜单管理',
		icon: 'el-icon-menu'
	},
	children: [
		{
			path: "pcmenu",
			name: "pcmenu",
			component: () => import('@/views/menuManage/pcMenu/index.vue'),
			meta: {
				title: 'pc菜单管理',
				icon: ''
			}
		},
		{
			path: "appmenu",
			name: "appmenu",
			component: () => import('@/views/menuManage/appMenu/index.vue'),
			meta: {
				title: 'App菜单管理',
				icon: ''
			}
		}
	]
}
