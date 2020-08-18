import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// axios配置
import axios from "axios";
Vue.prototype.$axios = axios;
// 默认配置
axios.defaults.baseURL = "http://127.0.0.1:3000/";

// rem 适配
import "lib-flexible";
// 初始化样式库
import "./assets/css/base.css";
// 字体图标库
import "./assets/font/iconfont.css";

// vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';

// swiper轮播图插件
import "swiper/css/swiper.min.css";

Vue.use(Vant);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
