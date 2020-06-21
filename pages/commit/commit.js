// pages/commit/commit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    detail: ""
  },
  inputfunc: function (e) {
    this.data.detail = e.detail.value
    console.log(this.data.detail);

  },
  commit: function (e) {
    var globalData = getApp().globalData;
    var that = this;
    //与服务器交互
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: globalData.server + '/index.php/Home/Message/publish_new_message',
      method: "POST",
      data: {
        user_id: globalData.user.user_id,
        username: globalData.user.username,
        face_url: globalData.user.face_url,
        content: that.data.detail
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.error_code != 0) {
          wx.showModal({
            title: "提示",
            content: '发布信息失败！请重试',
            showCancel: false,
          })
        } else {
          wx.showModal({
            title: "提示",
            content: '发布成功！',
            showCancel: false,
            complete() {
              wx.reLaunch({
                url: '/pages/square/square',
              })
            }
          })


        }
      },
      fail() {
        wx.showLoading({
          title: '发送中',
          complete() {
            wx.showModal({
              title: "提示",
              content: '哪里出错了！没法送成功！',
              showCancel: false,
            })
          }
        }, 1500)

      },
      complete() {
        wx.hideLoading({})
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
    console.log(getApp().globalData);

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