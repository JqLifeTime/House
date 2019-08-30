// pages/change/change.js
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

  // 修改密码
  xiugai:function(e){
    var tel_test = /^1[0-9]{10}$/;
    var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    console.log(e);
    if (tel_test.test(e.detail.value.phone)){
        wx.request({
          url: 'http://wangpu.honghuseo.cn/index.php/Mobile/index/savepwd',
          data: {
            user: e.detail.value.phone,
            old_pwd: e.detail.value.mima,
            new_pwd: e.detail.value.xmima
          },
          success: function (res) {
            console.log(res);
            if(res.data.stauts = 1){
              wx.showToast({
                title: '修改成功！'
              })
              wx.navigateTo({
                url: '../denglu/denglu'
              })
            }else{
              wx.showToast({
                title: res.data.msg,
                icon:'none'
              })
            }
          }
        })
    }else{
      wx.showToast({
        title: '手机号格式错误！',
        icon:'none'
      })
    }
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

})