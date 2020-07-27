import { utils } from "../../js/utils";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        epidemicData: [
            {
                title: "国内疫情",
                listData: []
            },
            {
                title: "国外疫情",
                listData: []
            }
        ],

        date: "",
    },

    // 切换
    switchover: function (e) {

        this.setData({
            active: e.currentTarget.dataset.key,
        });

    },

    // 获取国内/全球疫情数据
    getInlandEpidemicData: function () {

        // 获取当前时间
        let date = utils.formatDate(new Date(), "yyyy-MM-dd");


        // 加载提示
        wx.showLoading({
            title: "加载中",
            mask: true
        });

        // 发起请求
        wx.request({
            method: "GET",
            url: "https://api.tianapi.com/txapi/ncov/index",
            data: {
                key: "0f144a8fcf2b4ec99ea664f258a57913",
                // date,
            },
            success: res => {
                wx.hideLoading();

                
                if (res.data.code == 200) {
                    // 国内疫情数据
                    let inlandArr = [
                        {
                            title: "累计确诊",
                            count: res.data.newslist[0].desc.confirmedCount,
                            incr: res.data.newslist[0].desc.confirmedIncr,
                            color: "#CC4100",
                        },
                        {
                            title: "累计治愈",
                            count: res.data.newslist[0].desc.curedCount,
                            incr: res.data.newslist[0].desc.curedIncr,
                            color: "#008D5D",
                        },
                        {
                            title: "累计死亡",
                            count: res.data.newslist[0].desc.deadCount,
                            incr: res.data.newslist[0].desc.deadIncr,
                            color: "#666",
                        },
                        {
                            title: "现有确诊",
                            count: res.data.newslist[0].desc.currentConfirmedCount,
                            incr: res.data.newslist[0].desc.currentConfirmedIncr,
                            color: "#F50",
                        },
                        {
                            title: "境外输入确诊",
                            count: res.data.newslist[0].desc.suspectedCount,
                            incr: res.data.newslist[0].desc.suspectedIncr,
                            color: "#638AA7",
                        },
                        {
                            title: "现有疑似",
                            count: res.data.newslist[0].desc.foreignStatistics.suspectedCount,
                            incr: res.data.newslist[0].desc.foreignStatistics.suspectedIncr,
                            color: "#E68600",
                        }
                    ];

                    // 国外
                    let foreignArr = [
                        {
                            title: "累计确诊",
                            count: res.data.newslist[0].desc.globalStatistics.confirmedCount,
                            incr: res.data.newslist[0].desc.globalStatistics.confirmedIncr,
                            color: "#CC4100",
                        },
                        {
                            title: "现有确诊",
                            count: res.data.newslist[0].desc.globalStatistics.currentConfirmedCount,
                            incr: res.data.newslist[0].desc.globalStatistics.currentConfirmedIncr,
                            color: "#F50",
                        },
                        {
                            title: "累计治愈",
                            count: res.data.newslist[0].desc.globalStatistics.curedCount,
                            incr: res.data.newslist[0].desc.globalStatistics.curedIncr,
                            color: "#008D5D",
                        },
                        {
                            title: "累计死亡",
                            count: res.data.newslist[0].desc.globalStatistics.deadCount,
                            incr: res.data.newslist[0].desc.globalStatistics.deadIncr,
                            color: "#666",
                        },
                    ];

                    this.data.epidemicData[0].listData = inlandArr;
                    this.data.epidemicData[1].listData = foreignArr;

                    this.setData({
                        epidemicData: this.data.epidemicData,
                    });

                    // 获取国外国家疫情数据
                    this.getForeignEpidemicData();

                }

            },
            fail: err => {
                wx.hideLoading();

                

            }
        })

        this.setData({
            date,
        });

        // 
        // 
        // 
    },

    // 获取国外国家疫情数据
    getForeignEpidemicData: function() {

        // 加载提示
        wx.showLoading({
            title: "加载中",
            mask: true
        });

        // 发起请求
        wx.request({
            method: "GET",
            url: "https://api.tianapi.com/txapi/ncovabroad/index",
            data: {
                key: "0f144a8fcf2b4ec99ea664f258a57913",
            },
            success: res => {
                wx.hideLoading();

                // 
                if (res.data.code == 200) {
                    // 

                    // 按确诊人数排名
                    res.data.newslist.sort((a, b) => {
                        return a.confirmedCountRank - b.confirmedCountRank;
                    });

                    // 取前四个国家的疫情数据
                    for(let i = 0; i < 4; i++) {
                        // 

                        var obj = {
                            title: res.data.newslist[i].provinceName + "确诊",
                            count: res.data.newslist[i].confirmedCount,
                            color: "#CC4100",
                        }

                        this.data.epidemicData[1].listData.push(obj);

                    }

                    this.setData({
                        epidemicData: this.data.epidemicData,
                    });

                }

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

        // 获取国内疫情数据
        this.getInlandEpidemicData();

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