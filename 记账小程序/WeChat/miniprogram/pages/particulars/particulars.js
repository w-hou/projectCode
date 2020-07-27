// miniprogram/pages/particulars/particulars.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 记账类型详情数据
        particularsData: null,
    },

    // 根据 id 获取记账账单详情
    getParticularsById: function(ids) {
        // 加载提示
        wx.showLoading({
          title: "加载中",
          mask: true
        });

        wx.cloud.callFunction({
            name: "getById",
            data: {
                ids,
            },
            success: res => {
                wx.hideLoading();

                // 

                this.setData({
                    particularsData: res.result.data,
                });

                
            },
            fail: err => {
                wx.hideLoading();

                
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let ids = options.ids.split("-");

        // 

        // 标题
        wx.setNavigationBarTitle({
            title: options.costtitle + "-" + options.title + "详情",
        });

        // 根据 id 获取记账账单详情
        this.getParticularsById(ids);
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

    }
})