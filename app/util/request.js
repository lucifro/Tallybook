const http = {
	baseUrl: 'http://127.0.0.1:3000', // 前缀
	request(config) {
		config = beforeRequest(config);
		// 显示加载中状态
		uni.showLoading({
			title: '加载中...',
			mask: true
		});
		
		// 请求地址拼接
		config.url = this.baseUrl + config.url;
		const token = uni.getStorageSync('session');
		if (token) {
			config.header = {
				...config.header,
				token: token,
			};
		}
		// 异步请求
		return new Promise((resolve, reject) => {
			uni.request(config).then(res => { // 成功
				let {	
					data
				} = res;
				// 响应拦截
				const response = beforeResponse(data);

				// 隐藏加载状态
				uni.hideLoading();

				resolve(response);
			}).catch(err => { // 失败
				errorHandle(err)
				// 隐藏加载状态
				uni.hideLoading();

				reject(err);
			})
		})

	},

	// url：HTTP请求的目标URL。
	// data：包含要随请求发送的数据的对象。这可能包括POST请求的参数或服务器所需的其他数据。
	// auth：一个布尔值，指示是否需要身份验证（true）。
	// method：用于请求的HTTP方法（默认为'GET'）。
	// path：一个可选的路径参数。
	http(url, data = {}, auth = false, method = 'GET', path = '') {
		const token = uni.getStorageSync('token');
		if (path) {
			url = url + '/' + path
		}
		return this.request({
			url: url,
			data: data,
			auth: auth,
			timeout: 10000,
			method: method
		})
	},
}

const beforeRequest = (config) => {
	return config
}

const beforeResponse = (response) => {
	// if (response.code == '-401') {
	// 	uni.navigateTo({
	// 		url: '/pages/Login/login',
	// 	});
	// 	uni.clearStorageSync();
	// }
	if (response.code !== 200) {
		uni.showToast({
			title: response.message ?? '',
			duration: 3000,
			icon:'none'
		});
	}
	return response
}

const errorHandle = ((err) => {
	console.log('请求异常', err)
})

export default http