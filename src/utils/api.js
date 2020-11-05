const api = {
	login: '/login/login', // 登陆
	loginCode: '/login/getVerifyCode',// 获取登陆验证码
	// 首页
	getTop: '/analysis/getTop', // 首页顶部数据统计获取
	getDetail: '/analysis/getDetail', // 首页中部柱状图数据获取
	// 用户管理
	queryUser:'/user/queryUser',// 获取用户信息
	saveUser: '/user/saveUser', // 新增用户
	updateUser: '/user/updateUser', // 修改用户信息
	removeUser:'/user/removeUser',// 删除用户
	frozenUser: '/user/frozenUser', // 冻结用户
	thawUser: '/user/thawUser', // 解冻用户
	uploadHead: '/user/uploadHead', // 用户头像上传
	// 用户类型管理
	queryUserType:'/user/queryUserType',// 获取用户类型
	saveUSerType:'/user/saveUSerType',// 新增获取用户类型
	removeUserType:'/user/removeUserType',// 删除获取用户类型
	updateUserType:'/user/updateUserType',// 修改获取用户类型
	// 角色管理
	queryRole: '/role/queryRole',// 获取角色
	saveRole: '/role/saveRole',// 新增角色
	updateRole: '/role/updateRole',// 修改角色
	removeRole: '/role/removeRole',// 删除角色
	// 用户审核----
	// 经纪人审核
	queryAgentCheckList:'/user/queryAgentCheckList',// 获取经纪人审核列表信息
	queryAgentDetailed:'/user/queryAgentDetailed',// 查看详情
	removeAgentCheck:'/user/removeAgentCheck',// 删除该审批
	agentCheck:'/user/agentCheck',// 提交审核
	queryAgentCheckTop:'/user/queryAgentCheckTop',//获取经纪人信息审核头部信息xrf添加



	// 菜单管理
	// pc菜单管理
	getParent:'/menu/getParent',// 一级菜单列表  此接口后端已移除  10.16	
	queryMenu:'/menu/queryMenu',// 二级菜单列表
	saveMenu:'/menu/saveMenu',// 新增菜单列表
	updateMenu:'/menu/updateMenu',// 修改菜单列表
	removeMenu:'/menu/removeMenu',// 删除菜单列表
	oneClickSynchronization:'/menu/oneClickSynchronization',// 一键同步
	// 系统管理
	querySystem:'/system/querySystem',// 系统列表查询
	querySystemNoPage: '/system/querySystemNoPage', // 系统列表查询---不分页	
	saveSystem:'/system/saveSystem',// 新增系统
	updateSystem:'/system/updateSystem',// 修改系统
	removeSystem:'/system/removeSystem',// 删除系统
	// 首页管理
	// 首页轮播图管理
	getFile:'/index/getFile',// 轮播图获取
	uploadFile:'/index/uploadFile',// 新增轮播图uploadFileTest
	// uploadFile:'/index/uploadFileTest',// 新增轮播图uploadFileTest
	updateFile:'/index/updateFile',// 修改轮播图
	deleteFile:'/index/deleteFile',// 删除轮播图
	//web权限分配
	queryMenuNoPage:'/menu/queryMenuNoPage',//根据系统查询所属菜单不分页
	saveRoleMenu:'/permission/saveRoleMenu',
	queryRoleMenu: '/permission/queryRoleMenu', // 查询系统权限
	//app权限分配
	getAppMenu:'/menu/getAppMenu',
	//查询角色Web菜单
	queryRoleMenu:'/permission/queryRoleMenu'
}
export default api
/**
 * 后台api列表,
 * 若api地址直接写到请求体里面，直接忽略本文件
 */