// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  usernameInput: function (e) {
    //获取输入的用户名存于全局
    getApp().globalData.user.username = e.detail.value;

  },
  phonenumberInput: function (e) {
    //获取输入的密码存于全局
    getApp().globalData.user.password = e.detail.value;

  },
  signin: function () {
    var that = this;
    if (!getApp().globalData.user.username) {
      wx.showModal({
        title: "提示",
        content: '手机号不能为空',
        showCancel: false,
        success(res) {}
      })
    }
    if (!getApp().globalData.user.password) {
      wx.showModal({
        title: "提示",
        content: '密码不能为空 ',
        showCancel: false,
        success(res) {}
      })
    } else {
      wx.request({
        url: getApp().globalData.server + '/index.php/Home/User/login', //请求服务端登录接口
        method: "POST",
        data: {
          phone: getApp().globalData.user.username,
          password: getApp().globalData.user.password,
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          if (res.data.error_code == 3) {
            //登录失败，密码错误
            wx.showModal({
              title: "提示",
              content: res.data.msg,
              showCancel: false,
            })
          } else if (res.data.error_code == 0) {
            //登录成功
            getApp().globalData.user = res.data.data //将用户信息进行存储
            wx.reLaunch({
              // url: '/pages/square/square',
              url: '/pages/square/square'
            })
          } else if (res.data.error_code != 0) {
            wx.showModal({
              title: "提示",
              content: res.data.msg,
              showCancel: false,
            })
          }

        },
        fail() {
          wx.showModal({
            title: "提示",
            content: '网络请求失败，请稍后重试',
            showCancel: false,
            success(res) {}
          })
        },

      })

    }
  },
  register: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '/pages/enroll/enroll',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {},
        someEvent: function (data) {}
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: 'test'
        })
      },
      fail() {
        wx.showModal({
          title: "提示",
          content: '跳转失败，请稍后重试',
          showCancel: false,
          success(res) {}
        })
      }
    })
    setTimeout(function () {
      wx.hideLoading({
        complete: (res) => {},
      })
    }, 2000)

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