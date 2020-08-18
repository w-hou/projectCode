import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import home from "./routers/home.js";
import classify from "./routers/classify.js";
import cart from "./routers/cart.js";
import my from "./routers/my.js";
import search from "./routers/search.js";
import publics from "./routers/publics.js";
import particulars from "./routers/particulars.js";
import order from "./routers/order.js";
import address from "./routers/address.js";
import orderForm from "./routers/orderForm.js";

const routes = [
    {
        path: "/",
        redirect: "/advertising",
    },
    // 首页
    home,
    // 分类
    classify,
    // 购物车
    cart,
    // 我的
    ...my,
    // 搜索
    search,
    // 引导页和广告页
    ...publics,
    // 详情页
    particulars,
    // 提交订单
    order,
    // 地址
    ...address,
    // 订单列表
    orderForm,
];

const router = new VueRouter({
    // mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
