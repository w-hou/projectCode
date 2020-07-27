// 获取小程序注册实例
let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            nickname: null,
            userImg: null
        },

        listData: [
            { title: "我的账单", url: "../myBooking/myBooking" },
            { title: "疫情监控", url: "../epidemic/epidemic" }
        ]
    },

    goTo: function(e) {

        wx.navigateTo({
            url: e.currentTarget.dataset.url,
        });

    },

    // 授权登录
    authorization: function() {
        wx.navigateTo({
            url: "../auth/auth",
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

        // 如果用户已授权, 则获取用户信息
        if(app.globalData.isAuth) {

            wx.getUserInfo({
                success: res => {
                    var userInfo = res.userInfo
                    // 

                    // this.data.userInfo.nickname = userInfo.nickName;
                    // this.data.userInfo.userImg = userInfo.avatarUrl;
                    this.data.userInfo = {
                        nickname: userInfo.nickName,
                        userImg: userInfo.avatarUrl,
                    }

                    this.setData({
                        userInfo: this.data.userInfo
                    });

                    
                },
            })
        }
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