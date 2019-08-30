// pages/zdxz/zdxz.js
var app = getApp();
var did = "", did1 = "", acreage_id = "", price_id = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
		hangye: [],
		hangye2: [],
		mianji:[],
		zujin:[],
		id:4,
		tabnum:null,
		xzlist:[],
    p:1,
    totalpage:1,
    loading1: true,
    loading2: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options)
		this.setData({
			id:options.id
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
    did = "";
    did1 = "";
    acreage_id = "";
    price_id = "";
		var that = this;
		
		// 请求一级分类接口
		wx.request({
			url: app.data.hostUrl + '/Mobile/home/hangyesousuo_1',
			method: 'post',
			data: {
				id: that.data.id
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function(res) {
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
			fail: function(e) {
				wx.showToast({
					title: '网络异常！',
					duration: 2000,
					icon: 'none'
				});
			}
		})
    
		// 请求店铺列表
    that.getZdlist();
		// 请求面积租金接口
				wx.request({
					url: app.data.hostUrl + '/Mobile/home/mianjisousuo',
					method: 'post',
					data: {
						id: that.data.id
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						console.log(res);
						that.setData({
							mianji:res.data.data[0].acreage_id
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
		
				// 请求租金接口
				wx.request({
					url: app.data.hostUrl + '/Mobile/home/zujinsousuo',
					method: 'post',
					data: {
						id: that.data.id
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						console.log(res);
						that.setData({
							zujin:res.data.data[0].price_id,
              loading:false
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
	shop_tab: function(e){
		var that = this;
		if(that.data.tabnum == e.currentTarget.dataset.index){
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


  // 上一页
  bindprev: function () {
    if (this.data.p != 1) {
      this.data.p--;
      this.setData({
        p: this.data.p
      })
      this.getZdlist();
    }
  },
  // 下一页
  bindnext: function () {
    if (this.data.p < this.data.totalpage) {
      this.data.p++;
      this.setData({
        p: this.data.p
      })
      this.getZdlist();
    }
  },
  // 首页
  bindfirst: function () {
    this.setData({
      p: 1
    })
    this.getZdlist();
  },
  // 尾页
  bindlast: function () {
    this.setData({
      p: this.data.totalpage * 1
    })
    this.getZdlist();
  },
  // 请求列表方法
  getZdlist(){
    // 请求店铺列表
    var that = this;
    wx.request({
      url: app.data.hostUrl + '/Mobile/home/xz_list',
      method: 'post',
      data: {
        xinxi: 4,
        did:did,
        did1:did1, 
        acreage_id: acreage_id, 
        price_id: price_id,
        p:this.data.p
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1){
          that.setData({
            xzlist: res.data.data.root,
            totalpage: res.data.data.totalPages,
            tabnum: null,
            loading2:false
          })
        }else{
          that.setData({
            xzlist: [],
            loading2: false
          })
        }
        
        console.log(that.data.xzlist)
      }
    })
  },
	hytap: function(e) {
		var that = this;
		console.log(e);
		var num = e.currentTarget.dataset.num + 1;
    var oneId = e.currentTarget.dataset.id;
    did = oneId;
    did1 = '';
		wx.request({
			url: app.data.hostUrl + "/Mobile/home/hangyesousuo_2",
			method: 'post',
			data: {
				id: num
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function(res) {
				console.log(res);
				var hy2 = res.data.data;
				that.setData({
					hangye2: hy2
				})
			}
		})
	},
	
	// 区域
	qy: function(e) {
		var that = this;
		console.log(e);

		wx.request({
			url: app.data.hostUrl + '/Mobile/home/xz_list',
			method: 'post',
			data: {
				xinxi:that.data.id,
				quyu:e.currentTarget.dataset.qy
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function(res) {
				console.log(res)
				that.setData({
					xzlist: res.data.data.root,
					tabnum: null
				})
				console.log(that.data.xzlist)
			}
		})
	},
	mjtap: function(e) {
		var that = this;
		console.log(e);
    acreage_id = e.currentTarget.dataset.id;
    that.getZdlist();
    that.setData({
      tabnum: null
    })
	},
	zjtap: function(e) {
		var that = this;
		console.log(e);
    price_id= e.currentTarget.dataset.id;
    that.getZdlist();
    that.setData({
      tabnum: null
    })
	},
	hyfl2: function(e) {
		var that = this;
		console.log(e);
    did1 = e.currentTarget.dataset.id;
    that.getZdlist();
    that.setData({
      tabnum: null
    })
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