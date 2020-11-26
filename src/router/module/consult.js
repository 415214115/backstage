import Layout from '@/views/layout'
export const consult = {
	path: 'consult',
	name: 'consult',
	component: Layout,
	meta: {
		title: '咨询管理',
		icon: 'el-icon-folder-opened'
	},
	children: [
		{
			path: "consultindex",
			name: "consultindex",
			component: () => import('@/views/consult/index/index.vue'),
			meta: {
				title: '咨询管理',
				icon: ''
			}
		},
		// {
		// 	path: "details/:id",
		// 	name: "casemanagedetails",
		// 	component: () => import('@/views/case/details/index.vue'),
		// 	hidden: true,
		// 	meta: {
		// 		title: '案例详情',
		// 		icon: ''
		// 	}
		// },
		// {
		// 	path: "addcase",
		// 	name: "addcase",
		// 	component: () => import('@/views/case/addCase/index.vue'),
		// 	hidden: true,
		// 	meta: {
		// 		title: '新增案例',
		// 		icon: ''
		// 	}
		// },
	]
}