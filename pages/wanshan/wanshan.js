// pages/wanshan/wanshan.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['河南省', '郑州市', '金水区'],
    customItem: '全部',
    yhm:'',
    userInfo: null
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
    var users = wx.getStorageSync('userId');
    console.log(users);
    this.setData({
      yhm: users
    })
    wx.request({
      url: app.data.hostUrl + '/Mobile/index/ckxx',
      data: {
        user: users,
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res);
        this.setData({
          userInfo: res.data.data
        })
      },
      fail: res => {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  grxx:function(e){
    wx.showLoading({
      title: '修改中',
    })
    var that = this;
    var testtel = /^1[0-9]{10}$/;
    var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    console.log(that.data.yhm);
    console.log(e);
    var ssq = e.detail.value.qwqy.join(',');
    var address = ssq + e.detail.value.xiangxi;
    console.log(address);
    if (e.detail.value.xingming != ''){
      if (testtel.test(e.detail.value.phone)){
        wx.request({
          url: app.data.hostUrl + '/Mobile/index/wanshan',
          data: {
            user: that.data.yhm,
            name: e.detail.value.xingming,
            sex: e.detail.value.sex,
            age: e.detail.value.ages,
            tel: e.detail.value.phone,
            wechat: e.detail.value.weixin,
            qq: e.detail.value.qq,
            email: e.detail.value.email,
            address: address
          },
          method: 'post',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res);
            wx.hideLoading();
            if(res.data.status = 1){
              wx.showToast({
                title: '修改成功',
              })
              setTimeout(function(){
                wx.switchTab({
                  url: '/pages/user/user'
                })
              },1499)
            }else{
              wx.showToast({
                title: '修改失败',
              })
            }
          }
        })
      }else{
        wx.showToast({
          title: '手机号不正确',
          icon: "none"
        })
      }
    }else{
      wx.showToast({
        title: '请输入真实姓名',
        icon: "none"
      })
    }
    
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