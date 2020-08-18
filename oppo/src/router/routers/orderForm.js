export default {
    path: "/orderForm",
    name: "订单列表",
    component: () => import("../../views/orderForm.vue"),
    children: [
        {
            path: "orderAll",
            name: "全部",
            component: () => import("../../components/orderForm/orderAll.vue")
        },
        {
            path: "orderPay",
            name: "待付款",
            component: () => import("../../components/orderForm/orderPay.vue")
        },
        {
            path: "orderGoods",
            name: "待发货",
            component: () => import("../../components/orderForm/orderGoods.vue")
        },
        {
            path: "orderReceiving",
            name: "待收货",
            component: () => import("../../components/orderForm/orderReceiving.vue")
        },
        {
            path: "orderEnd",
            name: "已完成",
            component: () => import("../../components/orderForm/orderEnd.vue")
        },
    ]
}