var app = getApp();
// pages/search/search.js
Page({
  data:{
    focus:true,
    hotKeyShow:true,
    historyKeyShow:true,
    searchValue:'',
    page:1,
    productData:[],
    historyKeyList:[],
    hotKeyList:[],
    showLoading:true,
    control:false,
		hostImg:app.data.hostImg,
    array2: ['二手房', '租房' , '新房'],
    index2: 0,
  },
  // 分享
  onShareAppMessage: function () {
    return {
      title: app.data.shopNmae,
      path: '/pages/index/index?scene=' + app.data.userId
    }
  },
  onLoad:function(options){
		
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  onReachBottom:function(){
      //下拉加载更多多...
//       this.setData({
//         page:(this.data.page+1)
//       })
//       this.searchProductData();
  },

  searchValueInput:function(e){
    var value = e.detail.value;
		
    this.setData({
      searchValue:value,
    });
//     if(!value && this.data.productData.length == 0){
//       this.setData({
//         hotKeyShow:true,
//         historyKeyShow:true,
//       });
//     }
  },
	doSearch:function(){
		var that =this;
    wx.showLoading({
      title: '搜索中...',
    })
		wx.request({
      url: app.data.hostUrl + '/Mobile/bohan/sousuo',
			method:'post',
			data: {
				keyword: that.data.searchValue,
        type: that.data.index2*1+1
			},
			header: {
				'Content-Type':  'application/x-www-form-urlencoded'
			},
			success:function(e){
				console.log(e);
        wx.hideLoading();
				if(e.data.status == 1){
					that.setData({
						productData:e.data.data,
						control:false
					})
				}else{
					that.setData({
						control:true
					})
				}

			}
		})
	},
//   searchProductData:function(){
//     var that = this;
//     that.setData({
//       showLoading: true
//     })
//     wx.request({
//       url: app.data.hostUrl + '/Mobile/home/sousuo',
//       method:'post',
//       data: {
//         keyword:that.data.searchValue,
//         uid: app.data.userId,
//         page:that.data.page,
//       },
//       header: {
//         'Content-Type':  'application/x-www-form-urlencoded'
//       },
//       success: function (res) {   
//         var data = res.data.pro;
//         that.setData({
//           productData:that.data.productData.concat(data),
//         });
//       },
//       fail:function(e){
//         wx.showToast({
//           title: '网络异常！',
//           duration: 2000,
//           icon: 'none'
//         });
//       },
//       complete:function(){
//         that.setData({
//           control: true,
//           showLoading: false 
//         })
//       }
//     });
//   },
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {

  }

  


});