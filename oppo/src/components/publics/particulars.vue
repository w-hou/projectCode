<template>
    <div class="particulars">
        <!-- 详情页头部导航 -->
        <div class="particularsNav">
            <span class="iconfont icon-zuo" @click="$router.go(-1)"></span>
            <ul class="navTitle">
                <li v-for="(item, index) in lists" :key="index" @click="active = index" :class="{active: active == index}">{{ item.title }}</li>
            </ul>
        </div>

        <!-- 轮播图 -->
        <div class="swiper-container swiper-particulars">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="https://dsfs.oppo.com/archives/202004/202004231004095ea10135dcccb.jpg" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="https://dsfs.oppo.com/archives/202005/202005131005475ebb5bd7e7ded.png" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="https://dsfs.oppo.com/archives/202005/202005131005545ebb5bde04a8d.png" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="https://dsfs.oppo.com/archives/202005/202005131005565ebb5be063d91.png" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="https://dsfs.oppo.com/archives/202005/202005131005015ebb5be55179e.png" alt="">
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination circle-pagination"></div>
        </div>

        <div class="box-small">
            <div>
                <img src="https://dsfs.oppo.com/archives/202005/202005140905155ebc9b6722a7e.png" alt="">
                <p>网络</p>
                <span>双模5G</span>
            </div>
            <div>
                <img src="https://dsfs.oppo.com/archives/202005/202005140905335ebc9bb5bf04c.png" alt="">
                <p>CPU</p>
                <span>天玑800</span>
            </div>
            <div>
                <img src="https://dsfs.oppo.com/archives/202005/202005140905505ebc9b8a2860c.png" alt="">
                <p>刷新率</p>
                <span>120Hz</span>
            </div>
            <div>
                <img src="https://dsfs.oppo.com/archives/202005/202005140905075ebc9b9bec2af.png" alt="">
                <p>摄像</p>
                <span>前置双摄</span>
            </div>
        </div>

        <div class="info">
            <h2>A92s 8G+128G 佳人粉</h2>
            <p><span>【新配色开售 | 享6期免息】</span>OPPO A92s 5G双模 120Hz畅感屏 前置焕颜双摄 4800万超广角四摄 美颜夜景自拍智能全网通手机。</p>
            <p><span>立即前往以旧换新 >>></span></p>
            <span class="money">￥2499</span>
        </div>

        <div class="promotion">
            <div class="promotion-title">促销</div>
            <div class="box-content">
                <div class="antCheckLater">
                    <span class="byStages">分期</span>花呗分期<span class="byStages-num">6</span>期免息
                </div>
                <div class="integral">
                    <span class="integral-text">积分</span>购买赠送积分
                </div>
            </div>
        </div>

        <van-goods-action>
            <van-goods-action-icon icon="wap-home-o" text="首页" @click="$router.push('/home')" />
            <van-goods-action-icon v-show="!collect" icon="star-o" text="收藏" @click="enshrine" />
            <van-goods-action-icon v-show="collect" icon="star" text="已收藏" color="#ff5000" @click="callOff" />

            <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/cart')" :badge="num ? num : null" />

            <van-button type="warning" @click="add(goods)">加入购物车</van-button>
            <van-button type="danger" @click="buy(goods)">立即购买</van-button>
        </van-goods-action>

        <!-- <div class="addCart">
            <div class="home">
                <span class="iconfont icon-home"></span>
                <p>首页</p>
            </div>
            <div class="enshrine">
                <span class="iconfont icon-shoucang"></span>
                <p>收藏</p>
            </div>
            <div class="cart">
                <span class="iconfont icon-ziyuan"></span>
                <p>购物车</p>
            </div>
            <div class="affiliate">
                <van-button type="warning">加入购物车</van-button>
            </div>
            <div class="buy">
                <van-button type="danger">立即购买</van-button>
            </div>
        </div> -->
    </div>
</template>

<script>
    import {createNamespacedHelpers} from "vuex";
    const {mapState, mapMutations} = createNamespacedHelpers("cart");

    // 引入轮播图插件
    import Swiper from "swiper";

    import { Toast } from 'vant';

    export default {
         data() {
            return {
                active: 0,
                lists: [
                    { 
                        title: "商品详情",
                        content: [

                        ],
                    },
                    // { title: "用户评价" },
                    // { title: "参数包装" },
                ],
                collect: false,
                goods: {
                    id: 1,
                    // isSelect: true,
                    name: "A92s 8G+128G 佳人粉",
                    img: "https://dsfs.oppo.com/archives/202005/202005131005215ebb5c713ed74.png",
                    price: "2499",
                    num: 1,
                }
            };
        },
        methods: {
            enshrine() {
                Toast('已收藏');
                this.collect = true;
            },
            callOff() {
                Toast('取消收藏');
                this.collect = false;
            },
            
            // 直接调用vuex里的方法
            ...mapMutations(["add"]),

            // 立即购买 
            buy(goods){
                if(this.$store.state.username){
                    this.goods.isSelect = true;
                    this.$store.commit("cart/buy", goods);
                    this.$router.push("/order");
                }else{
                    this.$router.push("/login");
                }
            }
        },
        computed:{
            // 获取vuex中的num值
            ...mapState({
                num: state => state.num,
            })
        },
        mounted(){
            new Swiper('.swiper-particulars', {
                // 无限循环
                loop: true,
                // 自动轮播
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.circle-pagination',
                    type: 'fraction',
                },
            });

            // this.$axios({
            //     name: "GET",
            //     url: "/goodsApi",
            //     params: {
            //         name: "oppo",
            //         price: 22,
            //         num: 1,
            //     }
            // }).then(res => {
            //     console.log("res ==> ", res);
            // }).catch(err => {
            //     console.log("err ==> ", err);
            // });
        },
    }
</script>

<style lang="less" scoped>
    .particulars{
        padding-bottom: 55px;
    }
    .particularsNav{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 35px;
        background-color: #fff;
        border-bottom: 1px solid #f6f6f6;
        z-index: 99;
        .icon-zuo{
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            color: #f63636;
            text-align: center;
            line-height: 35px;
        }
        .navTitle{
            display: flex;
            height: 100%;
            padding: 0 70px;
            li{
                position: relative;
                flex: 1;
                text-align: center;
                line-height: 35px;
                &.active{
                    color: #FA532F;
                    &::before{
                        content: "";
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        width: 30px;
                        height: 2px;
                        background-color: #FA532F;
                        transform: translateX(-50%);
                    }
                }
            }
        }
    }

    .swiper-particulars {
        width: 100%;
        height: 100%;
        margin-top: 35px;
    
        .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;

            /* Center slide text vertically */
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
            
        }
        .circle-pagination{
            left: 85%;
            width: 40px;
            height: 20px;
            color: #fff;
            background-color: rgba(0, 0, 0, .3);
            border-radius: 5px;
            text-align: center;
            line-height: 20px;
        }
    }

    .box-small{
        display: flex;
        height: 80px;
        padding: 10px 0;
        box-sizing: border-box;
        div{
            flex: 1;
            border-right: 1px solid #F1F2F3;
            text-align: center;
            &:last-child{
                border: none;
            }
            img{
                display: inline-block;
                width: 23px;
            }
        }
    }

    .info{
        width: 92%;
        margin: auto;
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
        box-sizing: border-box;
        h2{
            font-size: 16px;
            font-weight: normal;
            line-height: 40px;
        }
        p{
            span{
                color: #F79A47;
            }
        }
        .money{
            color: #F63434;
            font-size: 18px;
            line-height: 35px;
        }
    }

    .promotion{
        display: flex;
        width: 92%;
        margin: 1em auto 0;
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
        box-sizing: border-box;
        .promotion-title{
            width: 45px;
        }
        .box-content{
            flex: 1;
            .byStages, .integral-text{
                padding: 2px;
                margin-right: 10px;
                color: #FF722C;
                background-color: #FFF5E8;
                border-radius: 5px;
            }
            .byStages-num{
                color: #F63434;
            }
            .integral{
                margin-top: 8px;
            }
        }
    }

    .van-button{
        float: right;
        width: 95px;
        height: 35px;
        margin-left: 10px;
        padding: 0 10px;
        border-radius: 10px;
    }

    // .addCart{
    //     display: flex;
    //     position: fixed;
    //     bottom: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 55px;
    //     padding: 8px 0;
    //     background-color: #fff;
    //     text-align: center;
    //     box-sizing: border-box;
    //     z-index: 99;
    //     .home, .enshrine, .cart{
    //         width: 45px;
    //     }
    //     .home, .enshrine{
    //         border-right: 1px solid #f0f0f0;
    //     }
    //     .affiliate, .buy{
    //         flex: 1;
    //         .van-button{
    //             width: 102px;
    //             height: 35px;
    //             margin-top: 5px;
    //             border-radius: 10px;
    //         }
    //     }
    // }
</style>