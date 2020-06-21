// pages/enroll/enroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    phonenumber: "",
    password: "",
    passwordack: ""

  },
  usernameInput: function (e) {
    this.data.username = e.detail.value;
  },
  phonenumberInput: function (e) {
    this.data.phonenumber = e.detail.value;
  },
  passwordInput: function (e) {
    this.data.password = e.detail.value;
  },
  passwordInputAck: function (e) {
    this.data.passwordack = e.detail.value;
  },
  signIn: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateBack({
      delta: 1
    })
    setTimeout(function () {
      wx.hideLoading({})
    }, 2000)
  },
  register: function () {
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.username == '') {
      wx.showModal({
        title: '提示',
        content: '请输入用户名',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.phonenumber == '') {
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
        showCancel: false
      })
    } else if (that.data.phonenumber.length != 11) {
      wx.showModal({
        title: '提示',
        content: '手机号长度错误',
        showCancel: false

      })
    } else if (!myreg.test(that.data.phonenumber)) {
      wx.showModal({
        title: '提示',
        content: '手机号码格式错误,请输入正确的手机号',
        showCancel: false
      })
    } else if (that.data.password != that.data.passwordack) {
      wx.showModal({
        title: '提示',
        content: '两次输入密码不一致！',
        showCancel: false
      })
    } else {
      wx.request({
        url: getApp().globalData.server + '/index.php/Home/User/sign', //请求服务端注册接口
        method: 'POST',
        data: {
          username: that.data.username,
          phone: that.data.phonenumber,
          password: that.data.password,
          password_again: that.data.passwordack,
          face_url: getApp().globalData.userInfo.avatarUrl
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          if (res.data.error_code == 1) {
            wx.showModal({
              title: "提示",
              content: res.data.msg,
              showCancel: false
            })
          } else if (res.data.error_code == 2) {
            wx.showModal({
              title: "提示",
              content: res.data.msg,
              showCancel: false,
              success(res) {

              }

            })
          } else if (res.data.error_code == 3) {
            wx.showModal({
              title: "提示",
              content: '手机号已被注册',
              showCancel: false,
              success(res) {}
            })
          } else if (res.data.error_code != 0) {
            wx.showModal({
              title: "提示",
              content: '出错了' + res.data.msg,
              showCancel: false,
              success(res) {

              }

            })
          } else if (res.data.error_code == 0) {
            getApp().globalData.user = res.data.data //将服务端返回的用户信息进行存储
            wx.showModal({
              title: "提示",
              content: '注册成功',
              showCancel: false,
              success(res) {},
              complete() {
                wx.reLaunch({
                  url: '/pages/square/square',
                })
              }

            })
          }
        },
        fail(res) {
          wx.showModal({
            title: "提示",
            content: '请求失败，请重试',
            showCancel: false,

          })

        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})