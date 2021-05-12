const app = getApp()

Page({
  data: {
    isEmpty: false,

    requesting: false,  // 是否请求中
    scrollTop: 0,

    isRefreshing: false,//是否下拉刷新状态
    isFinish: false,//是否加载完全部数据
    dataList: [],
    pageNum: 1 // 页码
  },
  onLoad: function () {
    // wx.showLoading({
    //   title: '加载中'
    // })
    this.loadData(true)
  },

  //加载数据
  loadData: function(isRefresh, bool=true) {
    console.log(2)
    this.setData({ requesting: bool })

    let arr = []
    setTimeout(() => {
      for (let i = 1; i <= 10; i++) {
        if(this.data.dataList.length < 60) {
          arr.push({
            id: i,
            name: '第' + this.data.pageNum + '页 第' + i + '条'
          })
        }
      }
      
      if (isRefresh) {
        console.log(5)
        this.setData({
          dataList: arr
        })
      } else {
        console.log(3, this.data.dataList, arr)
        this.setData({
          dataList: this.data.dataList.concat(arr)
        })
      }

      console.log(4,  this.data.dataList)

      // 请求完成
      this.setData({
        requesting: false
      })

      // 判断是否无数据
      if(this.data.dataList.length == 0) {
        this.setData({
          isEmpty: true
        })
      }else{
        this.setData({
          isEmpty: false
        })
      }

      this.setData({
        isRefreshing: false,//关闭下拉刷新
        isFinish: this.data.dataList.length > 50 //全部加载完毕
      })
      // wx.hideLoading();
    }, 1000);
  },

  // 下拉刷新
  onRefresh: function () {
    console.log(11111)
    this.setData({
      pageNum: 1
    })
    this.loadData(true, false)
  },

  // 上拉加载
  onLoadMore: function () {
    console.log(1)
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.loadData(false)
  },
  onPulling:function(e){
    //e.detail == 0 下拉状态， e.detail == 1下拉到极限，松开触发刷新
    console.log(e);

  }
})