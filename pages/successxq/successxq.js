var app = getApp();
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
    shops: [],
    imgid: [],
    shopsimg: [],
    qid: [],
    hostImg: app.data.hostImg,
    uploadimg: app.data.uploadimg,
    kongzhuan: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.request({
      url: app.data.hostUrl + "/Mobile/home/chenggonganli_xiangqing",
      data: {
        id: options.shopId
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if(res.data.status == 1){
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

          console.log(arr1)
          if (res.data.data[0].kongzhuan == 0) {
            that.setData({
              kongzhuan: "是"
            })
          } else {
            that.setData({
              kongzhuan: "否"
            })
          }
          // 				var imglist = [];
          // 				console.log(res.data.data[0].pic.length);
          // 				for(var i =0;i<res.data.data[0].pic.length;i++){
          // 					imglist.push(res.data.data[0].pic[i])
          // 				}

          that.setData({
            shops: res.data.data[0],
            shopsimg: res.data.data[0].pic,
            imgid: arr1,
            qid: arr2
            // imgUrls:imglist
          })
          console.log(that.data.shops)
        }
       



        // console.log(that.data.imgUrls)
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