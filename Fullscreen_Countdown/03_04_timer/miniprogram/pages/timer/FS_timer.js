// miniprogram/pages/timer/FS_timer.js
var app = getApp();

var t_id = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    paused: true,

    minute: '00',
    second:'00',
    millisecond: '000',

    total_milliseconds: 0,

    background_color: '#ffffff',
    text_color: "#000000",

    laps: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      text_color: options.text_color,
      background_color: options.background_color
    });

    var navigation_text_color = options.background_color == "#ffffff" ? "#000000" : "#ffffff";

    wx.setNavigationBarColor({
      frontColor: navigation_text_color,
      backgroundColor: this.data.background_color,
    });

    wx.setNavigationBarTitle({
      title: '全屏计时',
    });

    wx.setKeepScreenOn({
      keepScreenOn: true,
    });


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
    clearInterval(t_id);

    wx.setKeepScreenOn({
      keepScreenOn: false,
    });

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

  tapClear: function(){
    clearInterval(t_id);
    t_id = null;

    this.setData({
      laps:[],
      minute: "00",
      second: "00",
      millisecond: "000",

      paused: true
    })

  },

  tapStart: function () {
    var that = this;

    var time_lapse = 155;

    t_id = setInterval(function(){that.updateTime(time_lapse)} ,time_lapse);

    this.setData({
      paused: false,
    })


  },
  tapLap: function () { 
    var lap = this.data.minute + ":" + this.data.second + "." + this.data.millisecond;

    var list = this.data.laps;
    list.push(lap);

    this.setData({
      laps: list
    });

  },
  tapPause: function () {
    clearInterval(t_id);
    this.setData({
      paused: true
    });
   },


  showTotalSeconds: function(total_milliseconds) {
    var minute = Math.floor(total_milliseconds/(60*1000));
    var second = Math.floor((total_milliseconds - minute * (60*1000))/1000);
    var millisecond = total_milliseconds - minute * (60 * 1000) - second * 1000;

    this.setData({
      minute: ("0" + minute).slice(-2),
      second: ("0" + second).slice(-2),
      millisecond: ("00" + millisecond).slice(-3)
    });

  },

  updateTime: function(time_lapse_ms) {
    var new_time = this.data.total_milliseconds + time_lapse_ms;
    this.showTotalSeconds(new_time);

    this.setData({
      total_milliseconds: new_time
    });
  }
})
