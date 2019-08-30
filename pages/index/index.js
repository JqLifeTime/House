//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
		authori: false,
    sechouse:[],   //二手房
    imglist:[],    //轮播列表
    uploadImg: app.data.uploadimg,
    hostImg: app.data.hostImg,
		newhouse:[],   //新房列表
		hyzx:[],    //行业资讯
    loading1: true,
    loading2: true,
    hostNew: [],     //新房广告位
    hostTwo: [],     //二手房广告位
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
	
  onLoad: function () {
		var that = this;
		console.log(app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
				authori:true,
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
					authori:true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
						authori:true,
          })
        }
      })
    };
    /**
     * 二手房广告位
     */
    wx.request({
      url: `${app.data.hostUrl}/Mobile/bohan/sechouse_poster`,
      method: 'post',
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res);
        if (res.data.status == 1){
          this.setData({
            hostTwo: res.data.data
          })
        }
      },
      fail: res => {
        console.log(res);
      }
    })
    // 二手房
    wx.request({
      url: app.data.hostUrl + "/Mobile/bohan/sechouse_index",
      method: 'post',
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          sechouse: res.data.data,
          loading1: false
        })
      }
    })

		// 新房
		wx.request({
      url: app.data.hostUrl + "/Mobile/bohan/newhouse_index",
			method: 'post',
			data: {},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				console.log(res)
        that.setData({
          newhouse: res.data.data,
          loading2:false
        })
			}
		})
    /**
     * 新房广告位
     */
    wx.request({
      url: `${app.data.hostUrl}/Mobile/bohan/newhouse_poster`,
      method: 'post',
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res);
        if (res.data.status == 1) {
          this.setData({
            hostNew: res.data.data
          })
        }
      },
      fail: res => {
        console.log(res);
      }
    })
		// 行业资讯
		wx.request({
			url:app.data.hostUrl+"/Mobile/home/zixun",
			method: 'post',
			data: {},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				console.log(res)
				that.setData({
					hyzx: res.data.data
				})
				console.log(that.data.hyzx)
			}
		})


    // 轮播
    wx.request({
      url: app.data.hostUrl + "/Mobile/bohan/lunbo",
      method: 'post',
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          imglist: res.data.data
        })
        console.log(that.data.hyzx)
      }
    })
  },
  

	onShow:function(){
		// var user = wx.getStorageSync('userId');
		// if(!user){
		// 	wx.navigateTo({
		// 		url:"/pages/denglu/denglu"
		// 	})
		// };
	},
  // 商铺
	sp:function(){
		wx.switchTab({
			url: '/pages/shoplist/shoplist'
		})
		wx.setStorageSync('id',1)
	},
  // 写字楼
	xzl:function(){
		wx.switchTab({
			url: '/pages/shoplist/shoplist'
		})
		wx.setStorageSync('id',2)
	},
  // 厂房土地
	cftd:function(){
		wx.switchTab({
			url: '/pages/shoplist/shoplist'
		})
		wx.setStorageSync('id',3)
	},
  // 按钮转店
  bindzhuan(){
    var user = wx.getStorageSync('userId');
    if (!user){
      wx.navigateTo({
        url: '/pages/denglu/denglu',
      })
    }else{
      wx.navigateTo({
        url: '/pages/releases/releases',
      })
    }
  },
  // 按钮找店
  bindzhao() {
    var user = wx.getStorageSync('userId');
    if (!user) {
      wx.navigateTo({
        url: '/pages/denglu/denglu',
      })
    } else {
      wx.navigateTo({
        url: '/pages/release/release',
      })
    }
  },
  // 跳转搜索
	sousuo:function(){
		wx.navigateTo({
			url:"/pages/sousuo/sousuo"
		})
	},
  // 公告快讯
  bindGg(){
    wx.navigateTo({
      url: '/pages/newslist/newslist',
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
			authori:true,
    })
		
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: app.data.appName,
      path: '/pages/index/index'
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh();
  },
})
