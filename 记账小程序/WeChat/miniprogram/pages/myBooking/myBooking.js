
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookingDate: [],
    },

    // 获取用户账单数据
    getUserBookingData: function() {
        // 加载提示
        wx.showLoading({
            title: "加载中",
            mask: true
        });

        wx.cloud.callFunction({
            name: "getUserBookingByData",
            success: res => {
                wx.hideLoading();

                

                this.setData({
                    bookingDate: res.result.data,
                });

            },
            fail: err => {
                wx.hideLoading();

                

            }
        });
    },

    // 删除账单
    delBookingData(e) {
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;

        // 加载提示
        wx.showLoading({
            title: "加载中",
            mask: true
        });

        wx.cloud.callFunction({
            name: "removeBookingData",
            data: {
                id,
            },
            success: res => {
                wx.hideLoading();

                
                if(res.result.stats.removed == 1) {
                    this.data.bookingDate.splice(index, 1);
                }

                this.setData({
                    bookingDate: this.data.bookingDate,
                });
                
            },
            fail: err => {
                wx.hideLoading();

                

            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取用户账单数据
        this.getUserBookingData();
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