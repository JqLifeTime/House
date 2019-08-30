// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		userinfo1:{},
		userId: 0,
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
		var that = this;
		var userId = wx.getStorageSync('userId');
    if (!userId){
      wx.showModal({
        title: '温馨提示',
        content: '您还没有登录，请登录',
        success: res => {
          console.log(res);
          if (res.confirm == true) {
            wx.navigateTo({
              url: '/pages/denglu/denglu',
            })
          } else {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        },
        fail: res => {
          console.log(res);
        },
        complete: res =>{
          return;
        }
      })

    }
    console.log(userId);
    // var tel1 = userId.slice(0,3);
    // var tel2 = userId.slice(7,11);
		// console.log(tel1)
		// console.log(tel2)
		that.setData({
      userId: userId
		})
		wx.getUserInfo({
			success:function(e){
				console.log(e);
				that.setData({
					userinfo1:e.userInfo
				})
			}
		})
  },

  tuichu:function(){
    wx.removeStorageSync('userId');
    wx.switchTab({
      url: '../index/index'
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