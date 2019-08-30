// pages/release/release.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		zdlist:[],
		array: ['请选择'],
    index: 0,
		multiArray: ['请选择'],
    multiIndex: 0,
		multiArrayId:['0'],
		multiArray1: ['请选择'],
		multiIndex1: 0,
		region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
		checkboxItems: [],
		sqpt: [],
		check:false,
		fxbollean: [false, false, false, false, false, false, false, false, false, false, false, false],
		fxb2:[false,false,false,false]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var value = wx.getStorageSync("userId");
    console.log(value);
    if (value != '') {
      // 找店转店信息接口
      wx.request({
        url: app.data.hostUrl + '/Mobile/index/shangpu',
        method: 'post',
        data: {},
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          var zd = res.data.data.slice(3, 4);
          console.log(zd);
          console.log(zd[0].did.length);
          var ptsb = zd[0].wid;
          var sqpt = zd[0].qid;
          for (var i = 0; i < zd[0].did.length; i++) {
            that.data.multiArray.push(zd[0].did[i].name);
          };
          for (let i = 0; i < zd[0].mid.length; i++) {
            that.data.array.push(zd[0].mid[i].name)
          }
          that.setData({
            zdlist: zd,
            multiArray: that.data.multiArray,
            array: that.data.array,
            checkboxItems: ptsb,
            sqpt: sqpt
          })
          console.log(that.data.zdlist)
        },
        fail: function (e) {
          wx.showToast({
            title: '网络异常！',
            duration: 2000,
            icon: 'none'
          });
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/denglu/denglu',
      })
    }
  },
	bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
	jyhy: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
		var jnum = e.detail.value - 1;
		console.log(this.data.zdlist[0].did[jnum].children);
		var jyhys = this.data.zdlist[0].did[jnum].children;
		console.log(jyhys.length)
		var a1 = ["请选择"];
		var i1 = ['0'];
		for(let i =0;i<jyhys.length;i++){
			a1.push(jyhys[i].name)
			i1.push(jyhys[i].id);
		};
    this.setData({
			multiArray1: a1,
      multiIndex: e.detail.value,
			multiArrayId: i1
    })
  },
	jyhytwo: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			multiIndex1: e.detail.value
		})
		console.log(this.data.multiArray1);
	},

	bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
	// 复选框点击
	checkboxChange: function (e) {
		console.log(e.detail.value);
		console.log(this.data.fxbollean);
		var vals = e.detail.value;
		var fxbollean = [];
		for (var i = 0; i < vals.length; i++) {
			fxbollean[vals[i]-1] = true;
		}
		this.setData({
			fxbollean: fxbollean
		})
  },
	all:function(){
		var that = this;
		for (var i = 0; i < this.data.checkboxItems.length; i++) {
			this.data.fxbollean[i] = true;
		}
		this.setData({
			fxbollean: this.data.fxbollean
		})
		console.log(this.data.fxbollean);
	},
	unall:function(){
		var that = this;
		var changed = {}
		for (var i = 0; i < this.data.checkboxItems.length; i++) {
			changed['checkboxItems[' + i + '].checked'] = false;
			this.data.fxbollean[i] = false;
		}
		// this.setData(changed);
		this.setData({
			fxbollean:this.data.fxbollean
		})
	},
	
	// 商圈配套点击方法
	sqpt: function (e) {
		console.log(e.detail.value);
		var checked = e.detail.value
		var vals1 = e.detail.value;
		var fxb2 = [];
		for (var i = 0; i < vals1.length; i++) {
			fxb2[vals1[i]-1] = true;
		}
		this.setData({
			fxb2:fxb2
		})
	},
	all1:function(){
		var that = this;
		for (var i = 0; i < this.data.sqpt.length; i++) {
			this.data.fxb2[i] = true;
		}
		that.setData({
			fxb2:this.data.fxb2
		})
	},
	unall1:function(){
		var that = this;
		for (var i = 0; i < this.data.sqpt.length; i++) {
			this.data.fxb2[i] = false;
		}
		that.setData({
			fxb2:this.data.fxb2
		})
	},
	
	
	// 获取form表单中的数据
	back_houtai: function(e){
		var tel_test = /^1[0-9]{10}$/;
		var userId = wx.getStorageSync('userId');
    var username = wx.getStorageSync("userName");
		console.log(typeof userId)
		console.log(e);
		var houid = e.detail.value;
		
		var wid = houid.ptsb.join(',');
		console.log(wid)
		var qid = houid.sqpt.join(',');
		console.log(qid)
		var qwqy = houid.qwqy.join(',');
		console.log(qwqy)
		if(tel_test.test(houid.phone)){
			if(houid.biaoti != ''){
				if(houid.hmj != ''&&houid.qmj != ''){
					if(houid.jyhy1 != 0&&houid.jyhy2 != 0){
						if(houid.lxr != ''){
							if(houid.hzj != ''&&houid.qzj != ''){
								if(houid.sqpt.length != 0 && houid.ptsb.length != 0){
									if(houid.dplx != 0){
										wx.request({
											url: app.data.hostUrl + '/Mobile/index/fb_zhaodian',
											method: 'post',
											data: {
												xinxi:4,
												mid:houid.dplx,
												wid:wid,
												qid:qid,
												mianji1:houid.qmj,
												mianji2:houid.hmj,
												price1:houid.qzj,
												price2:houid.hzj,
												did:houid.jyhy1,
												did1:houid.jyhy2,
												people:houid.lxr,
												tel:houid.phone,
												area:qwqy,
												title:houid.biaoti,
												content:houid.yaoqiu,
												user:userId,
                        fabu: username
											},
											header: {
												'Content-Type': 'application/x-www-form-urlencoded'
											},
											success: function (res) {
												console.log(res);
												if(res.data.status == 1){
													console.log(666);
													wx.showToast({
														title:res.data.msg
													})
                          setTimeout(function(){
                            wx.switchTab({
                              url: '/pages/user/user'
                            })
                          },1500)
													
												}
											}
										})
									}else{
										wx.showToast({
											title:"请选择店铺类型！",
											icon:"none"
										})
									}
								}else{
									wx.showToast({
										title:"请选择配套！",
										icon:"none"
									})
								}
							}else{
								wx.showToast({
									title:"请输入租金！",
									icon:"none"
								})
							}
						}else{
							wx.showToast({
								title:"请输入联系人！",
								icon:"none"
							})
						}
					}else{
						wx.showToast({
							title:"请选择经营行业！",
							icon:"none"
						})
					}
				}else{
					wx.showToast({
						title:"请输入面积！",
						icon:"none"
					})
				}
			}else{
				wx.showToast({
					title:"请输入标题！",
					icon:"none"
				})
			}
		}else{
			wx.showToast({
				title:"请输入正确的手机号码！",
				icon:"none"
			})
		}
		
	},
	
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
    return {
      title: app.data.appName,
      path: '/pages/index/index'
    }
  }
})