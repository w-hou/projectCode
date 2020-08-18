export default [
    {
        path: "/guidepage",
        name: "引导页",
        component: () => import("../../components/publics/guidePage.vue"),
    },
    {
        path: "/advertising",
        name: "广告页",
        component: () => import("../../components/publics/advertising.vue"),

        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            console.log(to, from);
            // 判断本地缓存中有没有数据
            if(localStorage.advertising) {
                // 有数据, 进去广告页
                next();
            } else{
                // 没有数据, 存储数据, 进入引导页
                localStorage.advertising = true;
                next("/guidepage");
            }
        }
    }
]