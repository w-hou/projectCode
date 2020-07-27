import { utils } from "../../js/utils";

let wxCharts = require("../../js/wxcharts");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 当前选择的日期
        currentDate: "选择日期",

        // 年 月 日查询
        title: ["年", "月", "日"],
        default: 1,

        // 开始日期-结束日期
        date: {
            start: "",
            end: ""
        },

        // 收入支出
        listActive: 0,
        list: [
            { title: "收入", total: 0, type: "shouru" },
            { title: "支出", total: 0, type: "zhichu" },
        ],

        // 有31号的月份
        day31: ["01", "03", "05", "07", "08", "10", "12"],

        // 收入支出数据
        bookingData: {
            shouru: [],
      
            zhichu: []
        },

        // canvas宽度
        canvasWidth: 0,
    },

    // 获取初始日期, 上线日期
    getOnlineDate: function () {
        // 加载提示
        wx.showLoading({
            title: "加载中",
            mask: true
        });

        wx.cloud.callFunction({
            name: "getOnlineDate",
            success: res => {
                wx.hideLoading();

                // 
                if (res.result.data.length > 0) {
                    // 开始日期
                    this.data.date.start = res.result.data[0].onlineDate;
                    // // 结束日期
                    let end = utils.formatDate(new Date(), "yyyy-MM-dd");
                    this.data.date.end = end;

                    this.setData({
                        date: this.data.date,
                        currentDate: end,
                    });

                    this.getBillDataByDate();
                }
            },
            fail: err => {
                wx.hideLoading();

                
            }
        });
    },

    //选择日期
    selectDate: function (e) {
        // 
        this.setData({
            currentDate: e.detail.value,
        });

        this.getBillDataByDate();
    },

    // 切换年 月 日查询
    toggleSearch: function () {
        // this.data.default = this.data.default == this.data.title.length - 1 ? 0 : this.data.default + 1;
        // 
        this.setData({
            default: this.data.default == this.data.title.length - 1 ? 0 : this.data.default+1,
        });

        this.getBillDataByDate();
    },

    // 切换收入 支出
    toggleList: function (e) {

        this.setData({
            listActive: e.currentTarget.dataset.index,
        });

        // 绘制饼图
        this.drawPie(this.data.bookingData[this.data.list[this.data.listActive].type]);

    },

    // 根据日期(年月日)查询账单数据
    getBillDataByDate: function () {
        // 获取当前日期
        let current = utils.formatDate(new Date(), "yyyy-MM-dd");

        let date = current.split("-");
        // 
        let currentDate = this.data.currentDate.split("-")
        // 

        //日期条件范围
        let dateCondition = {
            start: "",
            end: ""
        }

        // 按日查询
        if (this.data.default == 2) {

            dateCondition.start = this.data.currentDate;

        } else if (this.data.default == 1) {
            // 按月查询

            dateCondition.start = currentDate[0] + "-" + currentDate[1] + "-01";

            // 判断是否同年
            if (date[0] == currentDate[0]) {

                // 如果同月
                if (date[1] == currentDate[1]) {

                    dateCondition.end = current;

                } else {
                    // 如果不同月

                    // 如果是二月份,
                    if(currentDate[1] == "02") {

                        // 判断是否是闰年
                        if(currentDate[0] % 400 == 0 || (currentDate[0] % 4 == 0 && currentDate[0] % 100 != 0)) {
                            // 闰年 29天
                            dateCondition.end = currentDate[0] + "-" + currentDate[1] + "-29";
                        } else {
                            // 平年 28天
                            dateCondition.end = currentDate[0] + "-" + currentDate[1] + "-28";
                        }

                    } else{
                        // 如果不是二月份, 先判断有31号的月份

                        // 有31号的月份
                        if(this.data.day31.indexOf(currentDate[1] > -1)){

                            dateCondition.end = currentDate[0] + "-" + currentDate[1] + "-31";

                        } else{

                            // 没有31号的月份
                            dateCondition.end = currentDate[0] + "-" + currentDate[1] + "-30";

                        }

                    }

                }

            } else {
                // 如果不同年

                // 如果是二月份,
                if(currentDate[1] == "02") {

                    // 判断是否是闰年
                    if(currentDate[0] % 400 == 0 || (currentDate[0] % 4 == 0 && currentDate[0] % 100 != 0)) {
                        // 闰年 29天
                        dateCondition.end = currentDate[0] + "-" + currentDate[1] + "-29";
                    } else {
                        // 平年 28天
                        dateCondition.end = currentDate[0] + "-" + currentDate[1] + "-28";
                    }

                } else{
                    // 如果不是二月份, 先判断有31号的月份

                    // 有31号的月份
                    if(this.data.day31.indexOf(currentDate[1] > -1)){

                        dateCondition.end = currentDate[0] + "-" + currentDate[1] + "-31";

                    } else{

                        // 没有31号的月份
                        dateCondition.end = currentDate[0] + "-" + currentDate[1] + "-30";

                    }

                }
            }

        } else {
            // 按年查询
            dateCondition.start = currentDate[0] + "-01-01";

            // 如果同年
            if(date[0] == currentDate[0]) {

                dateCondition.end = current;

            } else {

                // 不同年
                dateCondition.end = currentDate[0] + "-12-12";

            }

        }

        

        // 根据日期查询收入-支出类型记账数据
        this.getBookingByData(dateCondition);

    },

    // 根据日期查询收入-支出类型记账数据
    getBookingByData: function(date) {
        // 加载提示
        wx.showLoading({
            title: "加载中",
            mask: true
        });

        wx.cloud.callFunction({
            name: "getBookingByDate",
            data: {
                start: date.start,
                end: date.end,
            },
            success: res => {
                wx.hideLoading();

                // 

                // 支出收入分类
                let bookingData = {
                    shouru: [],
                    zhichu: [],
                };

                res.result.data.forEach(item => {
                    bookingData[item.costType.type].push(item);
                });

                // 计算总收入和总支出
                let totalMoney = {
                    shouru: 0,
                    zhichu: 0
                };
                this.data.list.forEach(item => {
                    item.total = 0;

                    bookingData[item.type].forEach(i => {
                        item.total += Number(i.bookingInfo.money);
                        // totalMoney[item.type] = item.total;
                        totalMoney[item.type] += Number(i.bookingInfo.money);
                    });
                    
                    // 千分化总金额
                    item.total = utils.thousandthPlace(item.total.toFixed(2));
                });

                // 获取
                let types = {};
                for(let key in bookingData) {
                    types[key] = [];

                    bookingData[key].forEach(item => {
                        if(types[key].indexOf(item.bookingType.type) == -1) {
                            types[key].push(item.bookingType.type)
                        }
                    });
                };
                
                for(let key in types) {
                    // 清空
                    this.data.bookingData[key] = [];

                    types[key].forEach(item => {

                        // 随机生成颜色
                        let rgb = [];
                        for (let i = 0; i < 3; i++) {
                        // 在0-255之间生成随机数据
                        let random = Math.ceil(Math.random() * 255);
                            rgb.push(random);
                        }

                        rgb = "rgb(" + rgb.join(",") + ")";

                        let obj = {
                            // 类型
                            [item]: [],
                            // 数量
                            count: 0,
                            // 同类型的总金额
                            total: 0,
                            // 名称
                            title: null,
                            // 图标路径
                            url: null,
                            // 收入-支出标题
                            costTitle: null,
                            // 百分比
                            percent: null,
                            // 账单每一项的 id
                            ids: [],

                            // 饼图数据
                            // 类型总金额占比
                            data: 0,
                            // 类型标题
                            name: null,
                            // 饼图块的颜色
                            color: rgb,
                            // 格式化饼图文本内容
                            format(value) {
                                return " " + this.name + " " + (value * 100).toFixed(3) + "% ";
                            }
                        }

                        bookingData[key].forEach(i => {
                            
                            if(item == i.bookingType.type) {
                                obj[item].push(i);
                                obj.count++;
                                obj.total += Number(i.bookingInfo.money);
                                obj.data += Number(i.bookingInfo.money);
                                obj.ids.push(i._id);
                                
                                if (obj[item].length == 1){
                                    // 名称
                                    obj.title = i.bookingType.title;
                                    // 图标路径
                                    obj.url = i.bookingType.url;

                                    // 类型标题
                                    obj.name = i.bookingType.title;
                                    // 收入-支出标题
                                    obj.costTitle = i.costType.title;
                                }
                            }
                            
                        });
                        // 百分比
                        obj.percent = (obj.total / totalMoney[key] * 100).toFixed(2) + "%";

                        // 千分化同类型的总金额
                        obj.total = utils.thousandthPlace(obj.total.toFixed(2));

                        obj.ids = obj.ids.join('-');

                        this.data.bookingData[key].push(obj);
                        
                    });

                }
                
                
                this.setData({
                    list: this.data.list,
                    bookingData: this.data.bookingData,
                });
                
                // 
                

                

                // 绘制饼图
                this.drawPie(this.data.bookingData[this.data.list[this.data.listActive].type]);

            },
            fail: err => {
                wx.hideLoading();

                

            }
        });
    },

    // 绘制饼图
    drawPie: function(data) {
        if(data.length == 0){
            return;
        }

        new wxCharts({
            canvasId: 'pieCanvas',
            type: 'pie',
            series: data,
            width: this.data.canvasWidth,
            height: 295,
            dataLabel: true
        });
    },

    // 账单类型详情
    goParticulars: function(e) {

        let params = "";

        for(let key in e.currentTarget.dataset){
            params += key + "=" + e.currentTarget.dataset[key] + "&";
        }
        params = params.slice(0, -1);
        // 
        // 跳转账单详情
        wx.navigateTo({
          url: "../particulars/particulars?" + params,
        })
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
        //获取屏幕宽度
        const res = wx.getSystemInfoSync();

        this.setData({
            canvasWidth: res.screenWidth,
        });

        // 获取初始日期, 上线日期
        this.getOnlineDate();

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