import Layout from '@/views/layout'
export const workExamine = {
	path: 'workexamine',
	name: 'workexamine',
	component: Layout,
	meta: {
		title: '工作审批',
		icon: 'el-icon-s-management'
	},
	children: [
		{
			path: "teamexamine",
			name: "teamexamine",
			component: () => import('@/views/workExamine/teamExamine/index.vue'),
			meta: {
				title: '团队审批',
				icon: ''
			}
		},
		{
			path: "examinedetails",
			name: "examinedetails",
			component: () => import('@/views/workExamine/examineDetails/index.vue'),
			hidden: true,
			meta: {
				title: '审核详情',
				icon: ''
			}
		}
	]
}
