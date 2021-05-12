// 支持下拉刷新-上拉加载的组件
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    //--------------------------------------------  refresher-enabled 开启自定义下拉刷新
    refresherEnable:{
      type: Boolean,
      value: true
    },

    //-------------------------------------------- 设置自定义下拉刷新阈值
    pullDownHeight: {
      type: Number,
      value: 60,
    },

    //-------------------------------------------- 允许纵向滚动
    scrollY: {
      type: Boolean,
      value: true
    },

    //-------------------------------------------- 自定义下拉刷新样式和加载样式
    refresherType: {
      type: String,
      value: 'default',
    },

    //-------------------------------------------- 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
    scrollToView:{
      type:String,
      value:''
    },

    //-------------------------------------------- 在设置滚动条位置时使用动画过渡
    scrollWithAnimation:{
      type: Boolean,
      value: false,
    },

    //--------------------------------------------
    // 空状态的图片
    emptyUrl: {
      type: String,
      value: "../../images/pair-qsy.png"
    },
    // 空状态的文字提示
    emptyText: {
      type: String,
      value: "未找到数据"
    },
    // 控制空状态的显示
    emptyShow: {
			type: Boolean,
			value: true,
    },
    // 是否空数据
		isEmpty: {
			type: Boolean,
			value: false,
    },
    
    // 是否接口请求加载中
		requesting: {
			type: Boolean,
			value: false,
		},

    //-------------------------------------------- 自定义加载提示  加载中  没有更多数据
    showLoading:{   // 是否显示加载提示
      type: Boolean,
      value: true,
    },
    loadType: {
      type: String,
      value: 'default',
    },
    nomore: {
      type: Boolean,
      value: false,
    },
    loadmoreText: {
      type: String,
      value: '加载中',
    },
    nomoreText: {
      type: String,
      value: '暂无更多数据',
    },

    //--------------------------------------------
    pullText: {
      type: String,
      value: '下拉刷新',
    },
    releaseText: {
      type: String,
      value: '松开立即刷新',
    },
    refreshText: {
      type: String,
      value: '正在刷新',
    },

    //-------------------------------------------- refresher-triggered 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
    refreshing: {
      type: Boolean,
      value: false,
      //observer: '_onRefreshFinished',
    },

    //设置竖向滚动条位置
    scrollTop: {
      type: Number,
      value: 0,
    },
  },
  data: {
    pullState: 0,
    lastScrollEnd: 0,
    scrollTop: 0,
    isLoadMore: false,
    moveY: -60
  },
  attached() {
    this.setData({
      endY: -this.properties.pullDownHeight
    })
  },
  methods: {
    //被下拉
    _onPulling: function (e) {
      console.log(111, e)
      let y = e.detail.dy
      if (y < this.properties.pullDownHeight) {
        this.setData({
          pullState: 0
        })
      } else {
        this.setData({
          pullState: 1
        })
      }
      this.triggerEvent('onpulling',this.data.pullState);
    },
    //滚动到顶部
    _onScrollTop: function (e){
      this.triggerEvent('scrolltoupper', e);
    },
    //下拉刷新关闭了
    _onClose: function (e) {
      this.triggerEvent('onrefreshclose', e);
    },
    //下拉刷新执行
    _onRefresh: function (e) {
      console.log(222, e)
      this.setData({
        pullState: 2
      })
      this.triggerEvent('onrefresh', e);
    },
    //滚动到底部
    _onLoadmore: function (e) {
      this.triggerEvent('scrolltolower', e)
      if (!this.properties.nomore && !this.properties.refreshing) {
        this.triggerEvent('loadmore', e);
      }
    },

    //滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
    // _onScroll(e) {
    //   // console.log('_onScroll', e.detail.scrollTop)
    //   this.triggerEvent('onScroll', e.detail.scrollTop);
    // },
    //滚动事件
    _onScroll: function (e) {
      this.triggerEvent('scroll', e);
    },

  },
})