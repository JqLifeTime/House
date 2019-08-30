// pages/newslist/newslist.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		newstitle:'新闻资讯',
		biglist:[],
		newlshow:false,
		newsname:[],
		newslist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var that = this;
		wx.request({
			url:app.data.hostUrl + '/Mobile/new/arcitle',
			method: 'post',
			data:{
				
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				console.log(res);
				var newsname = [];
				var newlist = res.data.data
				for(let i = 0;i<newlist.length;i++){
					newsname.push(newlist[i].name);
				}
				console.log(newsname)
				that.setData({
					newsname:newsname,
					newslist:newlist[0].children,
					biglist:newlist
				})
				console.log(newlist)
			},
		})
  },
	
	
	newdj:function(e){
		console.log(e)
		var index1 = e.currentTarget.dataset.index;
		var news = this.data.biglist[index1].children;
		var newst = this.data.biglist[index1].name;
		this.setData({
			newlshow:false,
			newslist:news,
			newstitle:newst
		})
		console.log(news);
	},
	news:function(e){
		console.log(e);
		wx.navigateTo({
			url:"/pages/news/news?newsid={{item.id}}"
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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
	newslshow: function() {
		if(this.data.newlshow == false){
			this.setData({
				newlshow:true
			})
		}else{
			this.setData({
				newlshow:false
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