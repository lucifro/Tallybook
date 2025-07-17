"use strict";
const util_request = require("../util/request.js");
function reg(data) {
  return util_request.http.http("/reg", data, false, "POST");
}
function login(data) {
  return util_request.http.http("/login", data, false, "POST");
}
function list(data) {
  return util_request.http.http("/account", data, false, "GET");
}
function addlist(data) {
  return util_request.http.http("/account", data, false, "post");
}
function selectalist(data) {
  return util_request.http.http("/account/editlist", data, false, "post");
}
function editlist(data) {
  return util_request.http.http("/account/editdata", data, false, "post");
}
function dellist(data) {
  return util_request.http.http("/account/deletelist", data, false, "post");
}
exports.addlist = addlist;
exports.dellist = dellist;
exports.editlist = editlist;
exports.list = list;
exports.login = login;
exports.reg = reg;
exports.selectalist = selectalist;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/index.js.map
