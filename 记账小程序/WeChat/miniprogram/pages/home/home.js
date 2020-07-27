//导入utils
import { utils } from "../../js/utils"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 当前时间
        currentDate: "",

        // 日期范围
        dateRange: {
            start: "",
            end: ""
        },

        bookingDate: null,

        // 当天收入支出
        currentDayData: {
            // 收入
            shouru: 0,
            // 支出
            zhichu: 0,
        },

        // 当月收入支出
        currentMonthData: {
            // 收入
            shouru: 0,
            // 支出
            zhichu: 0,
        }
    },

    // 前导 0
    zero: function (num) {
        return num < 10 ? "0" + num : num;
    },

    // 选择日期
    selectDate: function (e) {
        let date = e.detail.value.split("-");

        this.setData({
            currentDate: date[1] + "月" + date[2] + "日",
        });

        this.getCurrentData(e.detail.value);
    },

    // 获取当天的账单数据
    getCurrentData: function (date) {
        // 加载提示
        wx.showLoading({
            title: "加载中",
            mask: true
        });

        wx.cloud.callFunction({
            name: "getBooking",
            data: {
                date
            },
            success: res => {
                wx.hideLoading();

                // 清空
                this.data.currentDayData = {
                        shouru: 0,
                        zhichu: 0,
                    },

                    // 计算收入总金额和支出总金额
                    res.result.data.forEach(item => {

                        // 计算收入总金额和支出总金额
                        this.data.currentDayData[item.costType.type] += Number(item.bookingInfo.money);

                        // 单个商品金额千分化
                        item.bookingInfo.money = utils.thousandthPlace(Number(item.bookingInfo.money).toFixed(2));

                    });

                // 收入总金额和支出总金额千分化
                for (let key in this.data.currentDayData) {
                    this.data.currentDayData[key] = utils.thousandthPlace(this.data.currentDayData[key].toFixed(2));
                };

                this.setData({
                    bookingDate: res.result.data,
                    currentDayData: this.data.currentDayData,
                });

                
            },

            fail: err => {
                wx.hideLoading();

                
            }
        });
    },

    // 获取当月的账单数据
    getMounthData: function () {
        // 加载提示
        wx.showLoading({
            title: "加载中",
            mask: true
        });

        wx.cloud.callFunction({
            name: "getMounthBooking",
            data: this.data.dateRange,
            success: res => {
                wx.hideLoading();

                // 
                // 清空
                this.data.currentMonthData = {
                    shouru: 0,
                    zhichu: 0,
                };

                // 计算当月收入总金额和支出总金额
                res.result.data.forEach(item => {
                    this.data.currentMonthData[item.costType.type] += Number(item.bookingInfo.money);
                });

                // 添加结余
                this.data.currentMonthData.jieyu = this.data.currentMonthData.shouru -this.data.currentMonthData.zhichu;

                // 千分化当月收入总金额、支出总金额和当月结余
                for (let key in this.data.currentMonthData) {
                    this.data.currentMonthData[key] = utils.thousandthPlace(this.data.currentMonthData[key].toFixed(2));
                }

                // 拆分成整数位和小数位
                this.data.currentMonthData.jieyu = this.data.currentMonthData.jieyu.split(".");

                this.setData({
                    currentMonthData: this.data.currentMonthData
                });

                

            },
            fail: err => {
                wx.hideLoading();

                
            },
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
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        this.data.dateRange.start = year + "-" + this.zero(month) + "-01";
        this.data.dateRange.end = year + "-" + this.zero(month) + "-" + this.zero(day);

        let currentDate = this.zero(month) + "月" + this.zero(day) + "日";

        this.setData({
            dateRange: this.data.dateRange,
            currentDate,
        });

        this.getCurrentData(this.data.dateRange.end);

        this.getMounthData();
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