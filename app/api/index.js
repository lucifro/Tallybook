import http from "@/util/request.js";

//注册
export function reg(data) {
	return http.http('/reg', data, false, 'POST')
}
//登录
export function login(data) {
	return http.http('/login', data, false, 'POST')
}
//读取
export function list(data) {
	return http.http('/account', data, false, 'GET')
}
//添加记录
export function addlist(data) {
	return http.http('/account', data, false, 'post')
}
//查询单条数据
export function selectalist(data) {
	return http.http('/account/editlist', data, false, 'post')
}
//修改数据
export function editlist(data) {
	return http.http('/account/editdata', data, false, 'post')
}
//删除数据
export function dellist(data) {
	return http.http('/account/deletelist', data, false, 'post')
}