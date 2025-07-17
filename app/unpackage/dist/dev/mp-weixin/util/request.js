"use strict";
const common_vendor = require("../common/vendor.js");
const http = {
  baseUrl: "http://127.0.0.1:3000",
  // 前缀
  request(config) {
    config = beforeRequest(config);
    common_vendor.index.showLoading({
      title: "加载中...",
      mask: true
    });
    config.url = this.baseUrl + config.url;
    const token = common_vendor.index.getStorageSync("session");
    if (token) {
      config.header = {
        ...config.header,
        token
      };
    }
    return new Promise((resolve, reject) => {
      common_vendor.index.request(config).then((res) => {
        let {
          data
        } = res;
        const response = beforeResponse(data);
        common_vendor.index.hideLoading();
        resolve(response);
      }).catch((err) => {
        errorHandle(err);
        common_vendor.index.hideLoading();
        reject(err);
      });
    });
  },
  // url：HTTP请求的目标URL。
  // data：包含要随请求发送的数据的对象。这可能包括POST请求的参数或服务器所需的其他数据。
  // auth：一个布尔值，指示是否需要身份验证（true）。
  // method：用于请求的HTTP方法（默认为'GET'）。
  // path：一个可选的路径参数。
  http(url, data = {}, auth = false, method = "GET", path = "") {
    common_vendor.index.getStorageSync("token");
    if (path) {
      url = url + "/" + path;
    }
    return this.request({
      url,
      data,
      auth,
      timeout: 1e4,
      method
    });
  }
};
const beforeRequest = (config) => {
  return config;
};
const beforeResponse = (response) => {
  if (response.code !== 200) {
    common_vendor.index.showToast({
      title: response.message ?? "",
      duration: 3e3,
      icon: "none"
    });
  }
  return response;
};
const errorHandle = (err) => {
  common_vendor.index.__f__("log", "at util/request.js:86", "请求异常", err);
};
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/util/request.js.map
