// pages/shoplist/shoplist.js
var app = getApp();
var totals;
var area_type = "", price_id = "", type1 = "", quyu = "", ting = "", wc = "";
var abc = 1;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabnum: null,
		shoplist: [],
		hostImg: app.data.hostImg,
		ifylist: [],
		biglist: [],
		mianji: [],
		zongjia: [],
		id: 1,
		uploadimg:app.data.uploadimg,
    p:1,
    totalpage:1,
    loading1:true,
    tsInd: 0,   //厅室选中下标
    zjInd: 0,   //总价选中下表
    qyInd: 0,   //区域选中下标
    mjInd: 0,   //面积选中下标
    tingInd: 0, //厅堂选中下标
    wcInd: 0    //卫生间选中下标
    // loading2:true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
    console.log(abc);
    area_type = "";
    price_id = "";
    type1 = "";
    quyu = "";
    ting = "";
    wc = "";
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
    var that = this;
		var a1 = wx.getStorageSync('id');
    console.log(a1);
    if(a1 != ''){
      this.setData({
        id: a1
      });
    }else{
      this.setData({
        id: 1
      });
      a1 = 1;
    }
		
		console.log(a1);
		// 请求价格区间接口
		wx.request({
      url: app.data.hostUrl + '/Mobile/bohan/total_type',
			method: 'post',
			data: {},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function(res) {
				console.log(res);
        that.setData({
          zongjia: res.data.data
        })
			},
      fail: function(res){
        console.log(res);
      }
		})
		// 店铺列表did, did1, acreage_id, price_id, type1, p
    this.getShoplist();
		// 请求面积租金接口
		wx.request({
      url: app.data.hostUrl + '/Mobile/bohan/area_type',
			method: 'post',
			data: {},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function(res) {
				console.log(res);
				that.setData({
					mianji: res.data.data
				})
			},
			fail: function(e) {
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
  bindlast: function() {
    this.setData({
      p: this.data.totalpage * 1
    })
    this.getShoplist();
  },

  
  // 请求店铺方法
  getShoplist(){
    // var that = this;
    console.log(this.data.id);
    wx.request({
      url: app.data.hostUrl + '/Mobile/bohan/sechouse_sort',
      method: 'post',
      data: {
        p: this.data.p,
        area_type: area_type,
        total_type: price_id,
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
        if (res.data.status == 1){
          this.setData({
            shoplist: res.data.data.root,
            totalpage: res.data.data.totalPages,
            loading1:false
          })
        }else{
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
  onPageScroll() {
    scrollTop: 10
    // 如果页面上已有选择的类型下拉tabnum就变成null
    if (this.data.tabnum != null) {
      this.setData({
        tabnum: null
      })
      console.log(123)
    }
  },

	shop_tab: function(e) {
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
	// 面积搜索
	mjtap: function(e) {
		console.log(e)
    area_type= e.currentTarget.dataset.id;
    if (area_type == ''){
      this.setData({
        mjInd: 0
      })
    }
    this.getShoplist();
    this.setData({
      tabnum: null,
      mjInd: area_type
    })
	},
	// zjtap: function(e) {
	// 	console.log(e);
  //   price_id = e.currentTarget.dataset.zj;
  //   if (price_id == '') {
  //     this.setData({
  //       zjInd: 0
  //     })
  //   }
  //   this.getShoplist();
  //   this.setData({
  //     tabnum: null,
  //     zjInd: price_id
  //   });
	// },
	// 区域搜索
	qy: function(e) {
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
  ts(e){
    type1 = e.currentTarget.dataset.ts;
    this.getShoplist();
    if (type1 == ''){
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
  // 总价区间搜索
  zongjia(e){
    console.log(e);
    price_id = e.currentTarget.dataset.zj;
    if (price_id == '') {
      this.setData({
        zjInd: 0
      })
    }
    this.getShoplist();
    this.setData({
      tabnum: null,
      zjInd: price_id
    });
  },
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }


	
})
