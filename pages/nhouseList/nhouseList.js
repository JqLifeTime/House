// pages/nhouseList/nhouseList.js
var app = getApp();
// var did = "", did1 = "", acreage_id = "", price_id = "", type1 = "", cid = "", quyu = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houselist: [],
    hostimg: app.data.hostImg,
    p: 1,
    totalpage: 1,
    id: 1
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
    this.getHouselist();
  },

  // 上一页
  bindprev: function () {
    if (this.data.p != 1) {
      this.data.p--;
      this.setData({
        p: this.data.p
      })
      this.getHouselist();
    }
  },
  // 下一页
  bindnext: function () {
    if (this.data.p < this.data.totalpage) {
      this.data.p++;
      this.setData({
        p: this.data.p
      })
      this.getHouselist();
    }
  },
  // 首页
  bindfirst: function () {
    this.setData({
      p: 1
    })
    this.getHouselist();
  },
  // 尾页
  bindlast: function () {
    this.setData({
      p: this.data.totalpage * 1
    })
    this.getHouselist();
  },
  // 请求店铺方法
  getHouselist() {
    // var that = this;
    console.log(this.data.id);
    wx.request({
      url: app.data.hostUrl + '/Mobile/bohan/newhouse_sort',
      method: 'post',
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        if (res.data.status == 1) {
          this.setData({
            houselist: res.data.data.root,
            totalpage: res.data.data.totalPages,
            loading1: false
          })
        } else {
          this.setData({
            houselist: [],
            loading1: false
          })
        }
        console.log(this.data.houselist);
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