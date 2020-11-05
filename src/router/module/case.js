import Layout from '@/views/layout'
export const caseManage = {
	path: 'casemanage',
	name: 'casemanage',
	component: Layout,
	meta: {
		title: '案例管理',
		icon: 'el-icon-folder-opened'
	},
	children: [
		{
			path: "index",
			name: "index",
			component: () => import('@/views/case/index/index.vue'),
			meta: {
				title: '案例管理',
				icon: ''
			}
		},
		{
			path: "details/:id",
			name: "details",
			component: () => import('@/views/case/details/index.vue'),
			hidden: true,
			meta: {
				title: '案例详情',
				icon: ''
			}
		},
		{
			path: "addcase",
			name: "addcase",
			component: () => import('@/views/case/addCase/index.vue'),
			hidden: true,
			meta: {
				title: '新增案例',
				icon: ''
			}
		},
	]
}