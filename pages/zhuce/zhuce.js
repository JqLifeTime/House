// pages/zhuce/zhuce.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		yzm: 59,
		yzmdj: 0,
    idCart: null
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
		
  },
  // 单选框改变
  radioChange(e){
    console.log(e);
    this.setData({
      idCart: e.detail.value
    })
  },
	zhuce: function(e){
    console.log(e);
		var tel_test = /^1[0-9]{10}$/;
		var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    console.log(e.detail.value.mima);
		if(tel_test.test(e.detail.value.phone)){
      if (e.detail.value.mima != ''){
        if (e.detail.value.mima == e.detail.value.qrmima) {
          if (e.detail.value.xingming != '') {
            if (this.data.idCart != null) {
              if (e.detail.value.zhanghao != ''){
                wx.request({
                  url: app.data.hostUrl + '/Mobile/index/member',
                  method: 'post',
                  data: {
                    user: e.detail.value.zhanghao,
                    pwd: e.detail.value.qrmima,
                    name: e.detail.value.xingming,
                    email: e.detail.value.youxiang,
                    type: this.data.idCart,
                    tel: e.detail.value.phone
                  },
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    console.log(res)
                    wx.showToast({
                      title: '注册成功！',
                      icon: "success"
                    })
                    setTimeout(function () {
                      wx.navigateTo({
                        url: "/pages/denglu/denglu"
                      })
                    }, 1500)
                  }
                })
              }else{
                wx.showToast({
                  title: '请输入账号！',
                  icon: "none"
                })
              }
            } else {
              wx.showToast({
                title: '请选择一个身份！',
                icon: "none"
              })
            }
          } else {
            wx.showToast({
              title: '请输入姓名！',
              icon: "none"
            })
          }
        } else {
          wx.showToast({
            title: '两次密码不一致！',
            icon: "none"
          })
        }
      }else{
        wx.showToast({
          title: '请输入密码！',
          icon: "none"
        })
      }
		}else{
			wx.showToast({
				title: '请输入正确手机号！',
				icon: "none"
			})
		}
	},
	// 获取验证码
	yzmdj:function(){
		var that = this;
		this.setData({
			yzmdj:1
		})
		var dtime = that.data.yzm;
		var timer = null;
		timer = setInterval(function(){
			that.setData({
				yzm: dtime--
			})
			if(that.data.yzm == 0){
				clearInterval(timer);
				that.setData({
					yzmdj:0
				})
			}
		},1000);
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