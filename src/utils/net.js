import store from "../store"; //导入store
const baseUrl = 'http://120.78.221.190:9999/api'

export function LoginByAdmin () {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://120.78.221.190:9999/auth/oauth/token?username=admin&password=yUqeMQccvwO3vvJnlsdfkg%3D%3D&randomStr=30311552876974488&code=4312&grant_type=password&scope=server',
      header: {
        'TENANT_ID': '1',
        'Authorization': 'Basic cGlnOnBpZw==',
        'Accept':'application/json'
      },
      method: 'post',
      async: false,
      success:function(res){
        console.log(res.data)
        store.commit('GET_TOKEN_INFO',res.data); //将信息保存在全部变量中
        resolve(200)
      },
      fail:function(err){
        reject(error)
      }
    })
  })
}


export const net = {
  get(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data: data,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'TENANT_ID': '1',
          'Authorization': 'Bearer '+store.state.userTokenInfo.access_token,  //数据接口请求都必须带这个参数，用于到服务器端做认证
        }, // 设置请求的 header
        success: function (res) {
          // success
          if (res.statusCode != 200) {
            wx.showToast({
              title: "网络出错，稍后再试",
              icon: "none"
            });
            return false;
          }
          resolve(res.data);
        },
        fail: function () {
          // fail
          reject(error)
        },
        complete: function () {
          // complete
        }
      })
    })
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data,
        method: 'POST', 
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'TENANT_ID': '1',
          'Authorization': 'Bearer'+store.state.userTokenInfo.access_token,  //数据接口请求都必须带这个参数，用于到服务器端做认证
        }, // 设置请求的 header
        success: function (res) { // success
          resolve(res.data)
        },
        fail: function () { // fail
          reject(error)
        },
        complete: function () {
          // complete
        }
      })
    })
  }
}

export default {
  net,
  LoginByAdmin
}
