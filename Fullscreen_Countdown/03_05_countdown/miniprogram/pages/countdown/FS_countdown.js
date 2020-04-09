// miniprogram/pages/countdown/FS_countdown.js
var app = getApp();
var t_id = null;
var alarm = wx.getBackgroundAudioManager();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    background_color: "#ffffff",
    text_color: "#000000",

    hour: "00",
    minute: "00",
    second: "00",

    countdown_list: [],
    countdown_list_index: 0,
    countdown_list_size: 0,

    total_second:0,
    second_left: 0,
    second_spent: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setKeepScreenOn({
      keepScreenOn: true,
    });

    var list = app.globalData.countdown_list;
    console.log(list);

    this.setData({
      countdown_list: list,
      countdown_list_size: list.length,
      total_second: list[list.length-1].total_seconds,
      second_left: list[list.length - 1].total_seconds
    });

    var current_c = this.data.countdown_list[this.data.countdown_list_index];
    
    this.setPage(current_c);
    this.showTotalSeconds(this.data.second_left);

    wx.setNavigationBarTitle({
      title: '全屏倒计时',
    });

    var that = this;

    var time_lapse = 1;

    t_id = setInterval(function(){
      that.updateTime(time_lapse);
    }, time_lapse * 1000)


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

  setPage: function(countdown_item) {
    console.log(countdown_item);
    this.setData({
      background_color: countdown_item.background_color,
      text_color: countdown_item.text_color
    })

    var navigation_text_color = countdown_item.background_color == "#ffffff" ? "#000000" : "#ffffff";

    wx.setNavigationBarColor({
      frontColor: navigation_text_color,
      backgroundColor: countdown_item.background_color,
    })
    
  },

  showTotalSeconds: function(total_seconds) {
    var hour = Math.floor(total_seconds/3600);
    var minute = Math.floor((total_seconds-hour * 3600)/60);
    var second = total_seconds - hour * 3600 - minute * 60;

    this.setData({
      hour: ("0" + hour).slice(-2),
      minute: ("0" + minute).slice(-2),
      second:("0" + second).slice(-2)
    })
  },

  updateTime: function(time_lapse) {
    var seconds_left = this.data.second_left - time_lapse;
    var seconds_spent = this.data.second_spent + time_lapse;

    this.setData({
      second_left: seconds_left,
      second_spent: seconds_spent
    });

    this.showTotalSeconds(seconds_left);

    var curr_c = this.data.countdown_list[this.data.countdown_list_index];

    if (curr_c.alarm_on && seconds_spent + 3 == curr_c.total_seconds) {
      alarm.title = "alarm";
      alarm.epname = "alarm";
      alarm.singer = "alarm";
      alarm.src = "cloud://fullscreen-countdown-b3l4w.6675-fullscreen-countdown-b3l4w-1301060784/alarm.m4a"
    }

    if (seconds_spent == curr_c.total_seconds) {
      if (curr_c.total_seconds == this.data.total_second) {
        clearInterval(t_id);
      } else {
        this.setPage(this.data.countdown_list[this.data.countdown_list_index+1]);
        this.setData({
          countdown_list_index: this.data.countdown_list_index + 1,
        })
      }
    }
  }
})