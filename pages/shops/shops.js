// pages/shops/shops.js
var app = getApp();
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'ZDTBZ-N7HRX-ZU546-ZQ7LY-H7UKH-X4BAO' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
		shops:[],
		imgid:[],    //物业配套
		shopsimg:[],   //轮播图
		qid:[],    //周围配套
		hostImg:app.data.hostImg,
		uploadimg:app.data.uploadimg,
    kongzhuan:'',
    ischu:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options)
		var that = this;
		wx.request({
      url: app.data.hostUrl + "/Mobile/bohan/sechouse_list",
			data:{
				id:options.shopId
			},
			method: 'post',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: res => {
				console.log(res);
        var s1 = res.data.data[0].property;
        var s2 = res.data.data[0].business;
				var arr1 = [];
				var arr2 = [];
				for(var ind of s1){
					console.log(ind);
					arr1[ind.id-1] = true;
				}
				for(var ind of s2){
					console.log(ind);
					arr2[ind.id-1] = true;
				}
				that.setData({
					shops:res.data.data[0],
          shopsimg: res.data.data[0].image,
					imgid:arr1,
					qid:arr2
				})
			},
      fail: res => {
        console.log(res)
      }
		})

  },
  // 拨打电话
  bindcall(){
    wx.makePhoneCall({
      phoneNumber: this.data.shops.businesser_tel
    })
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
  // 跳转地图页面
  // bindMap(){
  //   wx.navigateTo({
  //     url: '/pages/maps/maps?mapId=' + this.data.shops.address,
  //   })
  // },
  bindMap(res) {
    console.log(res);
    var _this = res;
    qqmapsdk.geocoder({
      //获取表单传入地址
      address: res.currentTarget.dataset.address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function (res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        //根据地址解析在地图上标记解析地址位置
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          address: _this.currentTarget.dataset.address
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
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
  onShow: function (e) {
		
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