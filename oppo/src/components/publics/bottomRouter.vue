<template>
    <div>
        <van-tabbar v-model="$store.state.active" active-color="#FA532F">
            <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" to="/classify">分类</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o" to="/cart" :badge="num ? num : null">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
 
<script>
    import {createNamespacedHelpers} from "vuex";
    const {mapState} = createNamespacedHelpers("cart");

    export default {
        computed:{
            // 获取vuex中的num值
            ...mapState({
                num: state => state.num,
            })
        },
    }
</script>

<style lang="less" scoped>
    .van-tabbar {
            border-top: 1px solid #eee;
            box-sizing: border-box;
            z-index: 99;
   
            .van-tabbar-item{
                color: #999;
                a{
                    color: #999;
                    // &.router-link-exact-active{
                    //     color: #FA532F;
                    // }
                }
            }
        }
</style>