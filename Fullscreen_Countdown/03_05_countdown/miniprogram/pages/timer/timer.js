// miniprogram/pages/timer/timer.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text_color: "#000000",
    background_color: "#ffffff",



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      colors: app.globalData.colors
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
      title: '高颜值全屏计时工具',
      imageUrl: '../../images/share.png'
    }

  },

  changeBackgroundColor: function (e) {
    this.setData({
      background_color: e.currentTarget.dataset.value
    })
  },

  changeTextColor: function (e) {
    this.setData({
      text_color: e.currentTarget.dataset.value
    })
  },

  goToTimer: function () {
    var text_color = this.data.text_color;
    var background_color = this.data.background_color;

    wx.navigateTo({
      url: './FS_timer?text_color=' + text_color + '&background_color=' + background_color,
    })
  }


})