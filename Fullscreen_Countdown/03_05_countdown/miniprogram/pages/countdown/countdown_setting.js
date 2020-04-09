// miniprogram/pages/countdown/countdown_setting.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background_color: "#ffffff",
    text_color: "#000000",
    colors:[],
    alarm_on: false,

    minute: 0,
    second: 0,

    minute_str: "00",
    second_str: "00"

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

  changeAlarm: function() {
    var alarm_on = this.data.alarm_on;

    this.setData({
      alarm_on: !alarm_on,
    })
  },

  changeMinute: function(e) {
    this.setData({
      minute: parseInt(e.detail.value),
      minute_str: ("0" + e.detail.value).slice(-2)
    })
  },

  changeSecond: function (e) {
    this.setData({
      second: parseInt(e.detail.value),
      second_str: ("0" + e.detail.value).slice(-2)
    })
  },

  addCountdown: function() {
    var countdown_list = app.globalData.countdown_list;

    var countdown_item = {
      minute: this.data.minute,
      second: this.data.second,
      total_seconds: this.data.second + this.data.minute * 60,
      alarm_on: this.data.alarm_on,
      background_color: this.data.background_color,
      text_color: this.data.text_color,
      time_str: this.data.minute_str + ":" + this.data.second_str
    }

    countdown_list.push(countdown_item);

    countdown_list.sort((a,b)=>a.total_seconds - b.total_seconds);

    app.globalData.countdown_list = countdown_list;

    wx.navigateBack({
      delta:1,
    })
  }

  
})