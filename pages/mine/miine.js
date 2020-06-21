// pages/mine/miine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstcolor: "#979797",
    secondcolor: "#000000",
    user: ""
  },
  delete_func: function (e) {
    var globalData = getApp().globalData;
    var that = this;
    var list = this.data.list
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      success(res) {
        if (res.confirm) {
          for (var i = 0; i < list.length; i++) {
            if (list[i].id == e.target.id) {
              wx.request({
                url: globalData.server + '/index.php/Home/Message/delete_message',
                method: "POST",
                data: {
                  user_id: list[i].user_id,
                  message_id: list[i].id,
                  i: i
                },
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                success(res) {
                  console.log(res);

                  if (res.data.error_code == 0) {
                    if (list.splice(res.data.i, 1)) {
                      that.setData({
                        list: list
                      })
                    }
                  } else if (res.data.error_code == 2) {
                    wx.showModal({
                      title: "提示",
                      content: res.data.msg,
                      showCancel: false,
                      success(res) {}
                    })
                  } else {
                    wx.showModal({
                      title: "提示",
                      content: "出错了！再试试吧",
                      showCancel: false,
                      success(res) {}
                    })

                  }

                }
              })
            }
          }
        } else if (res.cancel) {}
      }
    })


  },
  first_select: function () {
    wx.redirectTo({
      url: '/pages/square/square',
    })
  },
  second_select: function () {
    wx.navigateTo({
      url: '/pages/commit/commit',
    })
  },
  third_select: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globalData = getApp().globalData;
    var that = this;
    this.setData({
      user: getApp().globalData.user
    })
    wx.request({
      url: globalData.server + '/index.php/Home/Message/get_one_user_all_messages',
      method: "POST",
      data: {
        user_id: globalData.user.user_id,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.error_code == 2) {
          wx.showModal({
            title: "提示",
            content: '加载失败，请重试',
            showCancel: false,
          })
        }
        that.setData({
          list: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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