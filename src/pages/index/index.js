//index.js
//获取应用实例

Page({
  props: {
  },
  data: {
    navBars: [
      {label: '推荐', value: '/page/index/index'},
      {label: '宝贝', value: '/page/mine/index'},
      {label: '新品', value: '/page/mine/index'},
      {label: '活动', value: '/page/mine/index'},
      {label: '活动1', value: '/page/mine/index'},
      {label: '活动1', value: '/page/mine/index'},
      {label: '活动1', value: '/page/mine/index'},
      {label: '活动1', value: '/page/mine/index'}
    ],
    filers: [
      {label: '综合', value: '11'},
      {label: '销量', value: '22'},
      {label: '新品', value: '33'},
      {label: '价格', value: '44'}
    ],
    list: [
      {id: '1', name: '这是标题这是标题这是标题这是标题', image: '/assets/img/bar.jpg', money: '￥98', num: '156', des:  '满100减20'},
      {id: '2', name: '这是标题', image: '/assets/img/bar.jpg', money: '￥98', num: '156', des:  '满100减20'},
      {id: '3', name: '这是标题', image: '/assets/img/bar.jpg', money: '￥98', num: '156', des:  '满100减20'},
      {id: '4', name: '这是标题', image: '/assets/img/bar.jpg', money: '￥98', num: '156', des:  '满100减20'},
      {id: '5', name: '这是标题', image: '/assets/img/bar.jpg', money: '￥98', num: '156', des:  '满100减20'},
      {id: '6', name: '这是标题', image: '/assets/img/bar.jpg', money: '￥98', num: '156', des:  '满100减20'}
    ],
    listStyle: 'vertical',
    scrollViewHeight: 0
  },
  onLoad:function (options) {
    let _this=this
    wx.getSystemInfo({
      success: res => {
        let isIPX= /iPhone X/.test(res.model) ? true : false
        const query = wx.createSelectorQuery()
        query.select('#product-list').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (data) {
          _this.setData({scrollViewHeight: res.windowHeight - data[0].top})
        })
      }
    })
  },
  changeListStyle: function () {
    this.setData({listStyle: this.data.listStyle === 'vertical' ? 'level' : 'vertical'})
  }
})
