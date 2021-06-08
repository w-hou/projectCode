// 获取小程序注册实例
let app = getApp();

//导入utils
import { utils } from "../../js/utils"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 当前时间
        currentDate: "",
        
        num: 0,
        tagData: [
            {
                title: "收入",
                type: "shouru"
            },
            {
                title: "支出",
                type: "zhichu"
            },
        ],

        iconNum: null,
        icons: [],

        // 账户选择
        accountNum: 0,
        accountData: [
            { title: "现金" },
            { title: "支付宝" },
            { title: "微信" },
            { title: "信用卡" },
            { title: "储蓄卡" },
        ],

        bookingInfo: {
            date: "选择日期",
            money: "",
            comment: "",
        },

    },

    // 切换标签
    toggleTab: function (e) {
        

        let key = e.currentTarget.dataset.key;
        // 

        // 设置页面响应数据
        this.setData({
            [key]: e.currentTarget.dataset.index,
        });
    },

    // 获取图标数据
    getIconData: function () {
        // 加载提示
        wx.showLoading({
            title: "加载中",
            mask: true,
        });

        // 调用云函数 getIcon
        wx.cloud.callFunction({
            // 云函数名称
            name: "getIcon",

            // 成功执行的回调函数
            success: res => {
                // 关闭加载提示
                wx.hideLoading();

                // 

                this.setData({
                    icons: res.result.data,
                })
            },
            // 失败执行的回调函数
            fail: err => {
                // 关闭加载提示
                wx.hideLoading();

                
            }

        });
    },

    // 日期, 金额, 备注
    bindchange: function (e) {
        let bookingInfo = this.data.bookingInfo;
        let key = e.currentTarget.dataset.key;

        bookingInfo[key] = e.detail.value;

        // 设置页面响应数据
        this.setData({
            bookingInfo,
        });

    },

    // 保存
    preserve: function () {
        
        // 判断用户是否授权认证
        if (!app.globalData.isAuth) {
            wx.showModal({
                title: '提示',
                content: '请完成授权认证',
                success(res) {
                    if (res.confirm) {
                        
                        wx.navigateTo({
                          url: '../auth/auth',
                        })

                    } else if (res.cancel) {
                        
                    }
                }
            })

            return;
        }

        let bookingData = {};

        // 判断用户是否选择了账单类型
        if (this.data.iconNum == null) {
            wx.showToast({
                title: "请选择记账类型",
                icon: "none",
                duration: 1500
            });
            return;
        }
        // 判断是否选择了日期
        if (this.data.bookingInfo.date == "选择日期") {
            wx.showToast({
                title: "请选择日期",
                icon: "none",
                duration: 1500
            });
            return;
        }
        // 判断用户是否输入了金额
        if (this.data.bookingInfo.money == "") {
            wx.showToast({
                title: "请输入金额",
                icon: "none",
                duration: 1500
            });
            return;
        }

        // 收入支出
        bookingData.costType = {
            title: this.data.tagData[this.data.num].title,
            type: this.data.tagData[this.data.num].type,
        }

        // 记账类型
        bookingData.bookingType = {
            title: this.data.icons[this.data.iconNum].title,
            type: this.data.icons[this.data.iconNum].type,
            url: this.data.icons[this.data.iconNum].url,
        }

        // 账户选择
        bookingData.accountType = this.data.accountData[this.data.accountNum].title;

        bookingData.bookingInfo = Object.assign({}, this.data.bookingInfo);

        // 

        // 写入记账数据
        this.addBooking(bookingData);
    },

    // 写入记账数据
    addBooking: function (data) {
        // 加载提示
        wx.showLoading({
            title: "加载中",
            mask: true,
        });

        wx.cloud.callFunction({
            name: "addBooking",
            data,
            // 成功
            success: res => {
                wx.hideLoading();

                
            },
            // 失败
            fail: err => {
                wx.hideLoading();

                
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取图标数据
        this.getIconData();
        
        let currentDate = utils.formatDate(new Date(), 'yyyy-MM-dd');

        this.setData({
            currentDate,
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

    }
})
