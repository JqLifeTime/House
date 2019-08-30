// pages/denglu/denglu.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
	denglu: function (e){
    console.log(e);
		// var tel_test = /^1[0-9]{10}$/;
		var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		if(e.detail.value.phone){
			wx.request({
				url:app.data.hostUrl + '/Mobile/index/login',
				method: 'post',
				data:{
					user:e.detail.value.phone,
					pwd:e.detail.value.mima
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: function (res) {
					console.log(res);
					if(res.data.status == 1){
            wx.showToast({
              title: '登录成功',
            })
            setTimeout(function(){
              wx.switchTab({
                url: "/pages/index/index"
              })
            },1500)
						console.log(res.data.data);
						var a = res.data.data;
            wx.setStorageSync('userId', a.account);
            wx.setStorageSync('userName', a.name);
					}else{
						wx.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
					var user = wx.getStorageSync('userId');
					console.log(user);
				},
			})
		}else{
			wx.showToast({
				title:'账号密码错误！',
				icon:'none'
			})
		}
		
	},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // wx.navigateBack({
    //   delta: 3
    // })
    // wx.switchTab({
    //   url: '/pages/index/index'
    // })
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

})