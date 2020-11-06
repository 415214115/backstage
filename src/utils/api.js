const api = {
	login: '/back/login', // login
	getLunBoTu: '/car/getLunBoTu', // get banner
	upLoadImg: '/upload/one/upLoadImg', // upload file
	addLunBo: '/back/addLunBo' ,// add banner
	deleteLunBo: '/back/deleteLunBo' ,// delete banner
	selectAnLi: '/car/selectAnLi' ,// get case
	addColorType: '/back/addColorType',// add car color
	selectColorList: '/car/selectColorList' ,// get car color
	deleteColorType: '/back/deleteColorType' ,// delete car color
	deleteCheMo: '/back/deleteCheMo' ,// delete car mo
	addCheMoType: '/back/addCheMoType' ,// add car mo
	selectCheMoList: '/car/selectCheMoList' // select CheMoList
}
export default api
/**
 * 后台api列表,
 * 若api地址直接写到请求体里面，直接忽略本文件
 */