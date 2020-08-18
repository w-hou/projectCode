export default [
    {
        path: "/address",
        name: "地址",
        component: () => import("../../components/address/address.vue"),
    },
    {
        path: "/newAddress",
        name: "新增地址",
        component: () => import("../../components/address/newAddress.vue"),
    },
    {
        path: "/editAddress",
        name: "修改地址",
        component: () => import("../../components/address/editAddress.vue"),
    },
]