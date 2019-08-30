// pages/Record/Record.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zufang:[],
    twohouse:[]
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
    var userId = wx.getStorageSync("userId");
    // 发布二手房记录
    wx.request({
      url: app.data.hostUrl + '/Mobile/index/yh_sechouse',
      method:"post",
      data:{
        user: userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success:res=>{
        console.log(res);
        if (res.data.status == 1){
          this.setData({
            twohouse:res.data.data
          })
        }else{
          wx.showToast({
            title: "您暂未发布二手房信息",
            icon:"none"
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })
    // 发布租房记录
    wx.request({
      url: app.data.hostUrl + '/Mobile/index/yh_lethouse',
      method: "post",
      data: {
        user: userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res);
        if (res.data.status == 1) {
          this.setData({
            zufang: res.data.data
          })
        } else {
          wx.showToast({
            title: "您暂未发布租房信息",
            icon: "none"
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
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
    return {
      title: app.data.appName
    }
  }
})