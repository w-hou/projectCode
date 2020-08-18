export default {
    path: "/particulars",
    name: "详情页",
    component: () => import("../../components/publics/particulars.vue"),
    // children: [
    //     {
    //         path: "/particulars/commodity",
    //         name: "商品详情",
    //         component: () => import("../../components/publics/commodity.vue"),
    //     },
    //     {
    //         path: "/particulars/appraise",
    //         name: "用户评论",
    //         component: () => import("../../components/publics/appraise.vue"),
    //     },
    //     {
    //         path: "/particulars/parameter",
    //         name: "参数包装",
    //         component: () => import("../../components/publics/parameter.vue"),
    //     },
    // ],
}