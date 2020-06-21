// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstcolor: "#000000",
    secondcolor: "#979797",
    list: []
  },
  like: function (e) {
    var that = this
    var list = that.data.list
    var globalData = getApp().globalData;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == e.target.id) {
        if (list[i].islike == 1) {
          wx.showModal({
            title: "提示",
            content: '点过赞啦！不能再多啦！',
            showCancel: false
          })
        } else {
          list[i].total_likes++
          list[i].islike = 1
          that.setData({
            list: list
          })
          wx.request({
            url: globalData.server + '/index.php/Home/Message/do_like', //请求服务端登录接口
            method: "POST",
            data: {
              user_id: globalData.user_id,
              message_id: e.target.id
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success(res) {
              if (res.data.error_code != 0) {
                wx.showModal({
                  title: "提示",
                  content: res.data.msg,
                  showCancel: false,
                  success(res) {}
                })
              } else {}
            }
          })
        }
      }
    }


  },
  first_select: function () {

  },
  second_select: function () {
    wx.navigateTo({
      url: '/pages/commit/commit',
    })
  },
  third_select: function () {
    wx.redirectTo({
      url: '/pages/mine/miine',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var globalData = getApp().globalData;
    var that = this;
    wx.request({
      url: globalData.server + '/index.php/Home/Message/get_all_messages',
      method: "POST",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        that.setData({
          list: res.data.data
        })
      }
    })

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
    var globalData = getApp().globalData;
    var that = this;
    wx.request({
      url: globalData.server + '/index.php/Home/Message/get_all_messages',
      method: "POST",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        that.data.list = res.data.data
      }
    })
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