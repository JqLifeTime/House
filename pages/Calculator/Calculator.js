// pages/Calculator/Calculator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['一成', '二成', '三成', '四成', '五成', '六成', '七成', '八成', '九成'],
    index: 0,  //按揭成数
    years: ['1年（12期）', '2年（24期）', '3年（36期）', '4年（48期）', '5年（60期）', '6年（72期）', '7年（84期）', '8年（96期）', '9年（108期）', '10年（120期）', '11年（132期）', '12年（144期）', '13年（156期）', '14年（168期）', '15年（180期）', '16年（192期）', '17年（204期）', '18年（216期）', '19年（228期）', '20年（240期）', '21年（252期）', '22年（264期）', '23年（276期）', '24年（288期）', '25年（300期）', '26年（312期）', '27年（324期）', '28年（336期）', '29年（348期）', '30年（360期）'],  //分期年数
    yearsNum:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    yearsIndex: 0,  //分期年数下标
    InterestRate:['4.75','4.90'],  //年利率
    RateIndex: 0,  //年利率下标
    danjia:"",  //每平米价钱
    mianji:"",  //面积
    totalMoney: 0,  //贷款总额
    firstMonth: 0,  //首月还款
    totalRate: 0,  //中利息
    lilv: 4.90   //利率
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
  // 利率
  bindLIlv(e){
    this.setData({ lilv: e.detail.value });
  },
  // 单价
  bindDanjia(e){
    // console.log(e);
    this.setData({danjia:e.detail.value});
    console.log(this.data.danjia);
  },
  // 面积
  bindMianji(e) {
    // console.log(e);
    this.setData({mianji: e.detail.value })
    console.log(this.data.mianji);
  },
  // 首付选项
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 贷款年限
  bindYearsChange(e){
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value);
    if (e.detail.value > 0){
      this.setData({
        RateIndex: 1,
        lilv: this.data.InterestRate[1]
      })
    }else{
      this.setData({
        RateIndex: 0,
        lilv: this.data.InterestRate[0]
      })
    }
    this.setData({
      yearsIndex: e.detail.value
    })
  },

  // 重置
  bindReset(){
    this.setData({
      RateIndex: 0,
      index: 0,
      yearsIndex: 0,
      danjia: '',
      mianji: '',
      totalMoney: 0,
      firstMonth: 0,
      totalRate: 0
    })
  },
  // 计算
  bindStart() {
    var lilv = this.data.lilv;
    // if (this.data.yearsIndex > 0) {
    //   lilv = 0.049
    // } else {
    //   lilv = 0.0475
    // }
    if (this.data.danjia != '' && this.data.mianji!=''){
      // 房子价格
      let total = this.data.danjia*1 * this.data.mianji*1;
      console.log(total);
      console.log(this.data.index*1 + 1);
      console.log(total * ((this.data.index*1 + 1) / 10));
      // 贷款金额 = 总钱数 - 总钱数 * 贷款神谕分期
      let daikuan = total - total*((this.data.index*1+1)/10);
      let daikuanlixi = daikuan * this.data.yearsNum[this.data.yearsIndex] * 1 * (lilv / 100);
      let yuegong = (daikuan + daikuanlixi) / (this.data.yearsNum[this.data.yearsIndex]*12);
      this.setData({
        totalMoney: daikuan.toFixed(2),
        firstMonth: yuegong.toFixed(2),
        totalRate: daikuanlixi.toFixed(2)
      })
    }else{
      wx.showToast({
        title: '请输入单价面积！',
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})