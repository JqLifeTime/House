var app = getApp();
var totals;
var zhengzu = "", price_id = "", type1 = "", quyu = "", ting = "", wc = "";
var abc = 1;
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    tabnum: null,
    shoplist: [],
    hostImg: app.data.hostImg,
    mianji: [],
    zujin: [],
    id: 1,
    uploadimg: app.data.uploadimg,
    p: 1,
    totalpage: 1,
    tsInd: 0,   //厅室选中下标
    zjInd: 0,   //总价选中下表
    qyInd: 0,   //区域选中下标
    tingInd: 0,   //厅堂选中下标
    wcInd: 0,    //卫生间选中下标
    zujinInd: 0,   //租金选中下标
    lxInd: null,   //租房类型
    loading1: true,
    // loading2: true
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    console.log(abc);
    this.hu();
    zhengzu = "";
    price_id = "";
    type1 = "";
    quyu = "";
    ting = "";
    wc = "";
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
    
    // 店铺列表did, did1, acreage_id, price_id, type1, p
    this.getShoplist();
    
    
    // 请求租金接口
    wx.request({
      url: app.data.hostUrl + '/Mobile/bohan/price_type',
      method: 'post',
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          zujin: res.data.data
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


  // 上一页
  bindprev: function () {
    if (this.data.p != 1) {
      this.data.p--;
      this.setData({
        p: this.data.p
      })
      this.getShoplist();
    }
  },
  // 下一页
  bindnext: function () {
    if (this.data.p < this.data.totalpage) {
      this.data.p++;
      this.setData({
        p: this.data.p
      })
      this.getShoplist();
    }
  },
  // 首页
  bindfirst: function () {
    this.setData({
      p: 1
    })
    this.getShoplist();
  },
  // 尾页
  bindlast: function () {
    this.setData({
      p: this.data.totalpage * 1
    })
    this.getShoplist();
  },

  hu() {
    console.log(abc);
  },

  // 请求店铺方法
  getShoplist() {
    // var that = this;
    console.log(this.data.id);
    wx.request({
      url: app.data.hostUrl + '/Mobile/bohan/lethouse_sort',
      method: 'post',
      data: {
        p: this.data.p,
        zhengzu: zhengzu,
        price_area: price_id,
        type: type1,
        qu: quyu,
        ting: ting,
        wc: wc
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        if (res.data.status == 1) {
          this.setData({
            shoplist: res.data.data.root,
            totalpage: res.data.data.totalPages,
            loading1: false
          })
        } else {
          this.setData({
            shoplist: [],
            loading1: false
          })
        }

        console.log(this.data.shoplist);
      }

    })
  },
  /**
   * 监听页面滚动
   */
  onPageScroll(){
    scrollTop: 10
    // 如果页面上已有选择的类型下拉tabnum就变成null
    if (this.data.tabnum != null){
      this.setData({
        tabnum: null
      })
      console.log(123)
    }
  },
  // 点击table切换
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
  
  // 面积点击选择搜索
  mjtap: function (e) {
    var that = this;
    console.log(e)
    acreage_id = e.currentTarget.dataset.id;
    that.getShoplist();
    that.setData({
      tabnum: null
    })
  },
  // 租金点击选择搜索
  zjtap: function (e) {
    var that = this;
    console.log(e);
    price_id = e.currentTarget.dataset.id;
    if (price_id == ''){
      this.setData({
        zujinInd: 0
      })
    }
    that.getShoplist();
    that.setData({
      tabnum: null,
      zujinInd: price_id
    });
  },

  // 区域点击搜索
  qy: function (e) {
    console.log(e);
    quyu = e.currentTarget.dataset.qy;
    let ind = e.currentTarget.dataset.ind;
    this.getShoplist();
    this.setData({
      tabnum: null,
      qyInd: ind
    });
  },
  // 户型搜索
  ts(e) {
    type1 = e.currentTarget.dataset.ts;
    this.getShoplist();
    if (type1 == '') {
      this.setData({
        tsInd: 0
      })
    }
    this.setData({
      tabnum: null,
      tsInd: type1
    });
  },
  // 厅堂搜索
  ting(e) {
    ting = e.currentTarget.dataset.ting;
    this.getShoplist();
    if (ting == '') {
      this.setData({
        tingInd: 0
      })
    }
    this.setData({
      tabnum: null,
      tingInd: ting
    });
  },
  // 卫生间搜索
  wc(e) {
    wc = e.currentTarget.dataset.wc;
    this.getShoplist();
    if (wc == '') {
      this.setData({
        wcInd: 0
      })
    }
    this.setData({
      tabnum: null,
      wcInd: wc
    });
  },
  // 整租合租
  hezu(e){
    console.log(e);
    zhengzu = e.currentTarget.dataset.zz;
    this.getShoplist();
    this.setData({
      tabnum: null,
      lxInd: zhengzu
    });
  },
  // 	tabs2:function(){
  // 		console.log("****");
  // 		this.setData({
  // 			tabnum:null
  // 		})
  // 	},
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
