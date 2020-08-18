<template>
    <div>
        <div class="orderListNav">
            <span class="iconfont icon-zuo" @click="$router.push('/my')"></span>
            <h3>订单列表</h3>
        </div>
        <van-tabs v-model="active">
            <van-tab title="全部" to="/orderForm/orderAll"></van-tab>
            <van-tab title="待付款" to="/orderForm/orderPay"></van-tab>
            <van-tab title="待发货" to="/orderForm/orderGoods"></van-tab>
            <van-tab title="待收货" to="/orderForm/orderReceiving"></van-tab>
            <!-- <van-tab title="待评价" to="/orderForm/orderEvaluate"></van-tab> -->
            <van-tab title="已完成" to="/orderForm/orderEnd"></van-tab>
        </van-tabs>
        
        <!-- <div class="routerNav">
            <ul>
                <router-link to="/orderForm/orderAll" tag="li">全部</router-link>
                <router-link to="/orderForm/orderPay" tag="li">待付款</router-link>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div> -->

        <!-- 二级路由出口 -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
            }
        },
    }
</script>

<style lang="less" scoped>
    .orderListNav{
        position: relative;
        top: 0;
        left: 0;
        height: 45px;
        background-color: #fff;
        text-align: center;
        line-height: 45px;
        z-index: 99;
        .icon-zuo{
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            color: #F63434;
        }
        h3{
            font-size: 16px;
            font-weight: normal;
        }
    }
    
</style>