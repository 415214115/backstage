import Layout from '@/views/layout'
export const userManage = {
	path: 'usermanage',
	name: 'usermanage',
	component: Layout,
	meta: {
		title: '用户管理',
		icon: 'el-icon-s-custom'
	},
	children: [
		{
			path: "users",
			name: "users",
			component: () => import('@/views/userManage/users/index.vue'),
			meta: {
				title: '用户管理',
				icon: ''
			}
		},
		// {
		// 	path: "usertype",
		// 	name: "usertype",
		// 	component: () => import('@/views/userManage/usertype/index.vue'),
		// 	meta: {
		// 		title: '用户类型管理',
		// 		icon: ''
		// 	}
		// },
		{
			path: "role",
			name: "role",
			component: () => import('@/views/userManage/role/index.vue'),
			meta: {
				title: '角色管理',
				icon: ''
			}
		},
		{
			path: "jurisdiction/:id",
			name: "jurisdiction",
			component: () => import('@/views/userManage/role/jurisdiction/index.vue'),
			hidden: true,
			meta: {
				title: 'web权限管理',
				icon: ''
			}
		},
	]
}