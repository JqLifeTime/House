// pages/release/release.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigarray: [],
    uploadimg: app.data.uploadimg,
    array2: ['请选择', '出售', '出租'],
    index2: 0,
    array3: ['请选择', '一室', '二室', '三室', '四室', '四室以上'],
    index3: 0,
    array4: ['请选择', '一厅', '二厅', '三厅', '四厅', '四厅以上'],
    index4: 0,
    array5: ['请选择', '一卫', '二卫', '三卫', '四卫', '四卫以上'],
    index5: 0,
    xxdz: '河南省',
    region: ['河南省', '郑州市', '金水区'],
    customItem: '全部',
    checkboxItems: [],
    fxbollean: [false, false, false, false, false, false], //物业配套数组
    fxb2: [false, false, false, false], //商圈配套数组
    sqpt: [],
    check: false,
    imgurl: [],
    mj: 0, //面积
    zongjia: 0, //总价
    isdisable: false, //是否禁用面积input
    danjia: '',   //租金、单价
    zhengzu: 0,  //整租合租
    isuser: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var value = wx.getStorageSync("userId");
    console.log(value);
    if (!value) {
      wx.showModal({
        title: '温馨提示',
        content: '您还没有登录，请登录',
        success: res => {
          console.log(res);
          if (res.confirm == true){
            wx.navigateTo({
              url: '/pages/denglu/denglu',
            })
          }else{
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        },
        fail: res =>{
          console.log(res);
        },
        complete: res=>{
          return;
        }
      })
    }
    this.setData({
      isuser: value
    })
    // 配套设备
    wx.request({
      url: app.data.hostUrl + '/Mobile/bohan/property',
      method: 'post',
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res){
        that.setData({
          checkboxItems: res.data.data
        })
      }
    })
    // 周边配套
    wx.request({
      url: app.data.hostUrl + '/Mobile/bohan/business',
      method: 'post',
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          sqpt: res.data.data
        })
      },
      fail: function(res){
        console.log(res);
      }
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  tishi(){
    console.log(123);
    wx.showToast({
      title: '请先输入总价!',
      icon: 'none'
    })
  },
  // 总价
  bindZj(e){
    console.log(e)
    this.setData({
      zongjia: e.detail.value,
      isdisable: false
    })
    wx.request({
      url: `${app.data.hostUrl}/Mobile/index/reckon`,
      method: "post",
      data: {
        total: e.detail.value,
        area: this.data.mj
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res);
        this.setData({
          danjia: res.data.data
        })
      },
      fail: res => {
        console.log(res);
      }
    })
  },
  // 面积
  bindMj(e) {
    console.log(this.data.zongjia);
    this.setData({
      mj: e.detail.value
    })
    
    wx.request({
      url: `${app.data.hostUrl}/Mobile/index/reckon`,
      method: "post",
      data: {
        total: this.data.zongjia,
        area: e.detail.value
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res);
        this.setData({
          danjia: res.data.data
        })
      },
      fail: res => {
        console.log(res);
      }
    })
    console.log(e)
  },
  // // 面积区间
  // radioChange(e) {
  //   this.setData({
  //     mjqujian: e.detail.value
  //   })
  //   console.log(this.data.mjqujian);
  // },
  // // 总价区间
  // zongjiaChange(e) {
  //   this.setData({
  //     zongjia: e.detail.value
  //   })
  //   console.log(this.data.zongjia);
  // },
  // 租金区间
  zujinChange(e) {
    this.setData({
      zujin: e.detail.value
    })
    console.log(this.data.zujin);
  },

  // 付款類型
  // bindChange1: function(e) {
  //   this.setData({
  //     index1: e.detail.value
  //   })
  // },
  // 店铺类型
  
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  // 户型选择
  bindhuxing(e) {
    this.setData({
      index3: e.detail.value
    })
  },
  // 厅室选择
  bindTing(e) {
    this.setData({
      index4: e.detail.value
    })
  },
  // 卫生间选择
  bindWei(e) {
    this.setData({
      index5: e.detail.value
    })
  },

  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 整租合租
  zhengzuChange(e){
    console.log(e);
    this.setData({
      zhengzu: e.detail.value
    })
  },
  // 复选框点击
  checkboxChange: function(e) {
    console.log(e.detail.value);
    console.log(this.data.fxbollean);
    var vals = e.detail.value;
    var fxbollean = [];
    for (var i = 0; i < vals.length; i++) {
      fxbollean[vals[i] - 1] = true;
    }
    this.setData({
      fxbollean: fxbollean
    })
  },
  all: function() {
    var that = this;
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      this.data.fxbollean[i] = true;
    }
    this.setData({
      fxbollean: this.data.fxbollean
    })
    console.log(this.data.fxbollean);
  },
  unall: function() {
    var that = this;
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      changed['checkboxItems[' + i + '].checked'] = false;
      this.data.fxbollean[i] = false;
    }
    // this.setData(changed);
    this.setData({
      fxbollean: this.data.fxbollean
    })
  },

  // 商圈配套点击方法
  sqpt: function(e) {
    console.log(e.detail.value);
    var checked = e.detail.value
    var vals1 = e.detail.value;
    var fxb2 = [];
    for (var i = 0; i < vals1.length; i++) {
      fxb2[vals1[i] - 1] = true;
    }
    this.setData({
      fxb2: fxb2
    })
  },
  all1: function() {
    var that = this;
    for (var i = 0; i < this.data.sqpt.length; i++) {
      this.data.fxb2[i] = true;
    }
    that.setData({
      fxb2: this.data.fxb2
    })
  },
  unall1: function() {
    var that = this;
    for (var i = 0; i < this.data.sqpt.length; i++) {
      this.data.fxb2[i] = false;
    }
    that.setData({
      fxb2: this.data.fxb2
    })
  },
  chose: function() {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        console.log(tempFilePaths[0]);
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length; //总共个数
        var i = 0; //第几个
        that.uploadDIY(res.tempFilePaths, successUp, failUp, i, length)
      }
    });

  },
  /**
   * 递归实现上传多张图片
   * 参数描述：
   * filePaths是文件路径数组
   * successUp是成功上传的个数
   * failUp是上传失败的个数
   * i是文件路径数组的指标
   * length是文件路径数组的长度
   */
  uploadDIY(filePaths, successUp, failUp, i, length) {
    var that = this;
    wx.uploadFile({
      url: app.data.hostUrl + '/Mobile/index/uploadGoodsPic',
      filePath: filePaths[i],
      name: 'fileData',
      formData: {
        'user': 'test'
      },
      success: (res) => {
        successUp++;
        console.log(res)
        const data = res.data
        console.log(data);
        //do something
        var img3 = JSON.parse(data);
        console.log(img3);
        if (img3.status == 1) {
          console.log(img3.data.Image);
          console.log(that.data.imgurl.length);
          if (that.data.imgurl.length >= 5) {
            that.data.imgurl.shift();
            that.data.imgurl.push(img3.data.Image);
          } else {
            that.data.imgurl.push(img3.data.Image);
          }
          console.log(that.data.imgurl);
          that.setData({
            imgurl: that.data.imgurl
          })
        }
      },
      fail: (res) => {
        failUp++;
      },
      complete: () => {
        i++;
        if (i == length) {
          wx.showToast({
            title: '总共' + successUp + '张上传成功,' + failUp + '张上传失败！',
            icon: 'none'
          })
        }
        else {  //递归调用uploadDIY函数
          that.uploadDIY(filePaths, successUp, failUp, i, length);
        }
      },
    });
  },

  // 转店
  back_hou: function(e) {
    var tel_test = /^1[0-9]{10}$/;
    var user = wx.getStorageSync('userId');
    var username = wx.getStorageSync("userName");
    var zujin001 = 0;
    var that = this;
    //区间
    if (this.data.index2 == 0) {
      wx.showToast({
        title: '请选择出租或出售类型！',
        icon: 'none'
      })
      return;
    }
    // 户型
    if (this.data.index3 == 0) {
      wx.showToast({
        title: '请选择户型！',
        icon: 'none'
      })
      return;
    }
    if (this.data.index2 == 1) {
      if (e.detail.value.zongjia == '') {
        wx.showToast({
          title: '请输入总价！',
          icon: 'none'
        })
        return;
      }
      zujin001 = this.data.danjia;
    }
    if (this.data.index2 == 2) {
      if (e.detail.value.zjtype == "") {
        wx.showToast({
          title: '请输入租金付款方式！',
          icon: 'none'
        })
        return;
      }
      zujin001 = e.detail.value.zj
    }
    console.log(zujin001);
    console.log(this.data.zujin);
    console.log(this.data.mjqujian);
    console.log(e.detail.value.zjtype);
    console.log(e);
    var houe = e.detail.value;
    var wid = houe.ptsb.join(',');
    console.log(wid)
    var qid = houe.sqpt.join(',');
    console.log(qid)
    var qwqy = houe.qwqy.join(',');
    console.log(qwqy)
    var imgs5 = that.data.imgurl.join(',');
    console.log(imgs5)
    if (tel_test.test(houe.sjhm)) {
      if (houe.biaoti != '' && houe.yaoqiu != '') {
        if (houe.mj != '') {
          if (houe.zj != '') {
            if (houe.sqpt.length != 0 && houe.ptsb.length != 0) {
              if (houe.zongjia != 0) {
                if (houe.xxdz != '') {
                  if (houe.zjdw != 0) {
                    if (houe.gygx != '') {
                      // 转店信息发布
                      wx.request({
                        url: app.data.hostUrl + '/Mobile/bohan/house',
                        method: 'post',
                        data: {
                          xinxi: this.data.index2,
                          name: houe.biaoti,
                          area: houe.mj, //面积
                          total: houe.zongjia, //出售时候总价
                          price: zujin001, //单价租金
                          price_type: e.detail.value.zjtype, //租金付款方式
                          ssq: qwqy, //区域
                          property: wid, //配套设备
                          business: qid, //周边配套
                          position: houe.xxdz, //详细地址
                          type: this.data.index3, //户型
                          ting: this.data.index4, //厅
                          wc: this.data.index5,  //卫生间
                          desc: houe.yaoqiu, //描述
                          keywords: houe.keywords, //卖点
                          image: imgs5,
                          publisher_tel: houe.sjhm,
                          publisher: user,
                          zhengzu: this.data.zhengzu,
                          chaox: houe.chaox,
                          louc: houe.louc,
                          loux: houe.loux,
                          zhuangx: houe.zhuangx,
                          niand: houe.niand,
                          chanq: houe.chanq,
                          kanf: houe.kanf,
                          ruz: houe.ruz
                        },
                        header: {
                          'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        success: function(res) {
                          console.log(res);
                          if (res.data.status == 1) {
                            that.setData({
                              bigarray: [],
                              index2: 0,
                              index3: 0,
                              index4: 0,
                              index5: 0,
                              customItem: '全部',
                              checkboxItems: [],
                              fxbollean: [false, false, false, false, false, false], //物业配套数组
                              fxb2: [false, false, false, false], //商圈配套数组
                              sqpt: [],
                              check: false,
                              imgurl: [],
                              mj: 0, //面积
                              zongjia: 0, //总价
                              isdisable: false, //是否禁用面积input
                              danjia: '',   //租金、单价
                              zhengzu: 0,  //整租合租
                              isuser: 0
                            })
                            console.log(666);
                            wx.showToast({
                              title: res.data.msg
                            })
                            setTimeout(function() {
                              wx.switchTab({
                                url: '/pages/user/user'
                              })
                            }, 1500)
                          }else{
                            wx.showToast({
                              title: res.data.msg
                            })
                          }
                        }
                      })
                    } else {
                      wx.showToast({
                        title: "请选择供应关系！",
                        icon: "none"
                      })
                    }
                  } else {
                    wx.showToast({
                      title: "请选择租金单位！",
                      icon: "none"
                    })
                  }
                } else {
                  wx.showToast({
                    title: "请输入详细地址！",
                    icon: "none"
                  })
                }
              } else {
                wx.showToast({
                  title: "请输入总价！",
                  icon: "none"
                })
              }

            } else {
              wx.showToast({
                title: "请选择配套！",
                icon: "none"
              })
            }
          } else {
            wx.showToast({
              title: "请输入租金/单价！",
              icon: "none"
            })
          }
        } else {
          wx.showToast({
            title: "请输入面积！",
            icon: "none"
          })
        }
      } else {
        wx.showToast({
          title: "请输入描述！",
          icon: "none"
        })
      }
    } else {
      wx.showToast({
        title: "请输入正确的手机号码！",
        icon: "none"
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
  onShareAppMessage: function() {
    return {
      title: app.data.appName,
      path: '/pages/index/index'
    }
  }
})