import Layout from '@/views/layout'
export const systemManage = {
	path: 'systemmanage',
	name: 'systemmanage',
	component: Layout,
	meta: {
		title: '系统管理',
		icon: 'el-icon-monitor'
	},
	children: [
		{
			path: "system",
			name: "system",
			component: () => import('@/views/systemManage/system/index.vue'),
			meta: {
				title: '所属系统管理',
				icon: ''
			}
		}
	]
}
