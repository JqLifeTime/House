// pages/newhouse/newhouse.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    shopsimg: [],
    newHouse:[],
    uploadimg: app.data.uploadimg,
    hostImg: app.data.hostImg,
    ischu:0,
    huxing: [],   //户型列表
    huxingimg:[],    //户型图列表
    tuijian: [],      //推荐列表
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.data.hostUrl + "/Mobile/bohan/newhouse_list",
      data: {
        id: options.shopId
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        let imglist = [];
        for (let i = 0; i < res.data.data.type.length;i++){
          imglist.push(res.data.data.type[i].image);
        }
        that.setData({
          newHouse: res.data.data[0],
          shopsimg: res.data.data[0].image,
          huxing: res.data.data.type,
          huxingimg: imglist
        })
        wx.hideLoading();
      }
    })
    // 新房推荐
    wx.request({
      url: app.data.hostUrl + "/Mobile/bohan/newhouse_index",
      method: 'post',
      data: { id: options.shopId },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1){
          that.setData({
            tuijian: res.data.data
          })
        }
      },
      fail: function (res) {
        console.log(res);
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

  },
  // banner查看图片
  bindBanner: function (e) {
    var that = this;
    console.log(e);
    let ind = e.target.dataset.index
    console.log(that.data.shopsimg);
    wx.previewImage({
      current: that.data.shopsimg[ind],//当前显示图片的http链接 
      urls: that.data.shopsimg, //要预览的图片
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  // 查看图片
  previewImage: function (e) {
    var that = this;
    console.log(e);
    let ind = e.target.dataset.index
    console.log(that.data.huxingimg);
    wx.previewImage({
      current: that.data.huxingimg[ind],//当前显示图片的http链接
      urls: that.data.huxingimg, //要预览的图片
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  // 拨打电话
  bindcall(){
    wx.makePhoneCall({
      phoneNumber: this.data.newHouse.businesser_tel
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