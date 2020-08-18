import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import cart from "./cart.js";
import orderForm from "./orderForm.js";
import address from "./address.js";

export default new Vuex.Store({
    state: {
        active: 0,
        // 用户名
        username: null,
    },
    mutations: {},
    actions: {},
    modules: {
        // 购物车
        cart,
        // 订单
        orderForm,
        // 地址
        address,
    }
});
