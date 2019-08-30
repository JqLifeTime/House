// pages/news/news.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		newsdata:[],
    hostImg: "https://bohan.hohu.top/Public/uploads/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var that = this;
		console.log(options)
		wx.request({
			url: app.data.hostUrl+"/Mobile/new/arcitlelist",
			method:"post",
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data:{
				id:options.newsid
			},
			success:function(e){
				console.log(e);
				var newdata = e.data.data
				that.setData({
					newsdata:newdata
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