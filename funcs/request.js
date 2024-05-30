const BASE_URL = 'http://8.137.119.65:8888';
// const BASE_URL = 'http://127.0.0.1:8888';
const BASE_FIlE_URL = "http://8.137.119.65:8889"
// const BASE_FIlE_URL = "http://127.0.0.1:8889"

// 封装 GET 请求  
function get(url, params = {}, header = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method: 'GET',
			data: params,
			header: header,
			success: (response) => {
				if (response.statusCode === 200) {
					resolve(response.data);
				} else {
					if (response.statusCode === 401) {
						reject(response.data.msg || '未登录');
					} else {
						reject(response.data.message || '请求失败');
					}
				}
			},
			fail: (error) => {
				reject(error.message || '网络请求失败');
			}
		});
	});
}

// 封装post请求
function post(url, data = {}, header = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method: 'POST',
			data: data,
			header: header,
			success: (response) => {
				if (response.statusCode === 200) {
					resolve(response.data);
				} else {
					if (response.statusCode === 401) {
						reject(response.data.msg || '未登录');
					} else {
						reject(response.data.message || '请求失败');
					}

				}
			},
			fail: (error) => {
				reject(error.message || '网络请求失败');
			}
		});
	});
}

// 类似地，你可以封装 POST、PUT、DELETE 等请求方法  

// 暴露方法  
export {
	get,
	post,
	BASE_FIlE_URL
	// post, put, delete 等其他方法  
};