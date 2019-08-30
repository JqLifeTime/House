// pages/zdxzxq/zdxzxq.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		xzlist:[],
		hostImg:app.data.hostImg,
		imgid:[],
		qid:[],
    userId:0,
    allshow:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user1 = wx.getStorageSync('userId');
    this.setData({
      userId: user1
    })
		var that = this;
		console.log(options)
		wx.request({
			url:app.data.hostUrl+"/Mobile/home/xz_xiangqing",
			method: 'post',
			data: {
				id: options.zdxzId,
        user: user1
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				console.log(res)
        if (res.data.data[0].wid.length > 0 || res.data.data[0].qid.length > 0){
          var s1 = res.data.data[0].wid;
          var s2 = res.data.data[0].qid;
          var arr1 = [];
          var arr2 = [];
          for (var ind of s1) {
            console.log(ind);
            arr1[ind.id - 1] = true;
          }
          for (var ind of s2) {
            console.log(ind);
            arr2[ind.id - 1] = true;
          }
          that.setData({
            imgid: arr1,
            qid: arr2
          })
          console.log(that.data.xzlist)
        }
				that.setData({
          xzlist: res.data.data,
        })
			}
		})
  },
  // 查看完整电话
  lookall(){
    if (this.data.userId){
      this.setData({
        allshow:1
      })
    }else{
      wx.navigateTo({
        url: '/pages/denglu/denglu',
      })
    }
  },
  // 关闭完整电话
  offtel(){
    this.setData({
      allshow: 0
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