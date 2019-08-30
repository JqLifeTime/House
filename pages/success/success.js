// pages/success/success.js
var app = getApp();
var did = "", did1 = "", acreage_id = "", price_id = "", type1 = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suclist:[],
    hangye: [],
    hangye2: [],
    mianji: [],
    zujin: [],
    id: 4,
    tabnum: null,
    uploadimg: app.data.uploadimg,
    p:1,
    totalpage: 1, 
    loading1: true,
    loading2: true
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
    did = ""; 
    did1 = ""; 
    acreage_id = ""; 
    price_id = ""; 
    type1 = "";
    // 请求一级分类接口
    wx.request({
      url: app.data.hostUrl + '/Mobile/home/hangyesousuo_1',
      method: 'post',
      data: {
        id: 4
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var big = res.data.data[0];
        console.log(big)
        var zhuans = ['请选择'];
        // 				var gygx = big[0].did;
        // 				console.log(gygx)
        var hangye = big.did;
        console.log(hangye);
        for (var i = 0; i < big.length; i++) {
          zhuans.push(big[i].name);
        };
        // 				for(var i = 0;i < hangye.length;i++){
        // 					
        // 				};
        // console.log(gygx);
        that.setData({
          ifylist: zhuans,
          biglist: big,
          hangye: hangye, 
          loading1:false
        })
        console.log(that.data.biglist)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })

    // 请求店铺列表
    that.successList();
    

    // 请求面积租金接口
    wx.request({
      url: app.data.hostUrl + '/Mobile/home/mianjisousuo',
      method: 'post',
      data: {
        id: 4
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          mianji: res.data.data[0].acreage_id
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })

    // 请求租金接口
    wx.request({
      url: app.data.hostUrl + '/Mobile/home/zujinsousuo',
      method: 'post',
      data: {
        id: 4
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          zujin: res.data.data[0].price_id
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  // 请求店铺列表
  successList(){
    var that = this;
    wx.request({
      url: app.data.hostUrl + '/Mobile/home/chenggonganli',
      method: 'post',
      data: {
        did: did,
        did1: did1,
        acreage_id: acreage_id,
        price_id: price_id,
        type: type1,
        p: this.data.p
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1){
          var suclist1 = res.data.data.root;
          that.setData({
            suclist: suclist1,
            totalpage: res.data.data.totalPages,
            loading2:false
          })
        }else{
          that.setData({
            suclist: [],
            tabnum: null,
            loading2: false
          })
        }
        console.log(that.data.suclist)
      }
    })
  },

  // 上一页
  bindprev: function () {
    if (this.data.p != 1) {
      this.data.p--;
      this.setData({
        p: this.data.p
      })
      this.successList();
    }
  },
  // 下一页
  bindnext: function () {
    if (this.data.p < this.data.totalpage) {
      this.data.p++;
      this.setData({
        p: this.data.p
      })
      this.successList();
    }
  },
  // 首页
  bindfirst: function () {
    this.setData({
      p: 1
    })
    this.successList();
  },
  // 尾页
  bindlast: function () {
    this.setData({
      p: this.data.totalpage * 1
    })
    this.successList();
  },

  shop_tab: function (e) {
    var that = this;
    if (that.data.tabnum == e.currentTarget.dataset.index) {
      console.log("+++++");
      that.setData({
        tabnum: null
      })
      return;
    }

    this.setData({
      tabnum: e.currentTarget.dataset.index
    })


  },
  hytap: function (e) {
    var that = this;
    console.log(e);
    var num = e.currentTarget.dataset.num + 1;
    wx.request({
      url: app.data.hostUrl + "/Mobile/home/hangyesousuo_2",
      method: 'post',
      data: {
        id: num
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var hy2 = res.data.data;
        that.setData({
          hangye2: hy2
        })
      }
    })
  },

  // 区域
  qy: function (e) {
    var that = this;
    console.log(e);
    wx.request({
      url: app.data.hostUrl + '/Mobile/home/chenggonganli',
      method: 'post',
      data: {
        xinxi: that.data.id,
        quyu: e.currentTarget.dataset.qy
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          suclist: res.data.data.root,
          tabnum: null
        })
        console.log(that.data.suclist)
      }
    })
  },
  // 面积
  mjtap: function (e) {
    var that = this;
    console.log(e);
    acreage_id = e.currentTarget.dataset.id;
    that.successList();
    that.setData({
      tabnum: null
    })
  },
  // 租金
  zjtap: function (e) {
    var that = this;
    console.log(e);
    price_id = e.currentTarget.dataset.id;
    that.successList();
    that.setData({
      tabnum: null
    })
  },
  // 二级行业
  hyfl2: function (e) {
    var that = this;
    console.log(e);
    did1 = e.currentTarget.dataset.id;
    that.successList();
    that.setData({
      tabnum: null
    })
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