<template>
    <div class="home">
        <!-- 顶部导航 -->
        <van-row class="homeTopNav">
            <van-col span="5">
                <span class="iconfont icon-oppo"></span>
            </van-col>
            <van-col span="15">
                <van-search placeholder="请输入搜索关键词" @focus="getSearch" />
            </van-col>
            <van-col span="4">
                <div class="login-user" v-if="$store.state.username">
                    <img src="../assets/images/user.jpg" alt="">
                </div>
                <div class="login-user" v-else @click="$router.push('/login')">登录</div>
            </van-col>
        </van-row>

        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in bannerData" :key="index">
                <img :src="item.url" alt="">
            </van-swipe-item>
        </van-swipe>

        <ul class="msg">
            <li v-for="(item, index) in msg" :key="index">{{ item }}</li>
        </ul>

        <ul class="nav-icon">
            <li v-for="(item, index) in navIcon" :key="index">
                <img :src="item.url" alt="">
                <p>{{ item.title }}</p>
            </li>
        </ul>

        <div class="floor-panel-contain">
            <ul>
                <li>
                    <div class="particulars" @click="getParticulars">
                        <img src="https://dsfs.oppo.com/archives/202005/202005221205185ec6a6fa54665.png" alt="">
                    </div>
                    <div class="particulars" @click="getParticulars">
                        <img src="https://dsfs.oppo.com/archives/202005/202005250905575ecb23cd7a2d0.png" alt="">
                    </div>
                </li>
                <li>
                    <div class="particulars" @click="getParticulars">
                        <img src="https://dsfs.oppo.com/archives/202005/202005211205095ec558417fa32.png" alt="">
                    </div>
                    <div class="particulars" @click="getParticulars">
                        <img src="https://dsfs.oppo.com/archives/202005/202005221205535ec6a71dca260.png" alt="">
                    </div>
                </li>
                <li class="last">
                    <div class="particulars" @click="getParticulars">
                        <img src="https://dsfs.oppo.com/archives/202005/202005180205245ec22a1808335.png" alt="">
                    </div>
                    <div class="particulars" @click="getParticulars">
                        <img src="https://dsfs.oppo.com/archives/202005/202005200905075ec48987493df.png" alt="">
                    </div>
                    <div class="particulars" @click="getParticulars">
                        <img src="https://dsfs.oppo.com/archives/202005/202005250805085ecbb3c032194.png" alt="">
                    </div>
                    <div class="particulars" @click="getParticulars">
                        <img src="https://dsfs.oppo.com/archives/202005/202005251105575ecb3e8579b95.png" alt="">
                    </div>
                </li>
            </ul>
        </div>

        <div class="sale">
            <div class="sale-title">
                <span class="title-text">今日必抢</span>
                <van-count-down :time="time">
                    <template v-slot="timeData">
                        <span class="block">{{ timeData.hours }}</span>
                        <span class="colon">:</span>
                        <span class="block">{{ timeData.minutes }}</span>
                        <span class="colon">:</span>
                        <span class="block">{{ timeData.seconds }}</span>
                    </template>
                </van-count-down>
                <span>后结束</span>

                <span class="more">更多</span>
            </div>

            <div class="swiper-container sale-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, index) in saleItem" :key="index" @click="$router.push('/particulars')">
                        <img :src="item.img" alt="">
                        <p>{{ item.name }}</p>
                        <div class="sale-price">
                            <span>￥{{ item.price }}</span>
                            <span>￥{{ item.original }}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="product">
            <div v-for="(item, index) in productData" :key="index">
                <div class="title">{{ item.name }}</div>
                <div class="floor-img">
                    <img :src="item.url" alt="">
                </div>

                <div class="product-item">
                    <div class="item" v-for="(item, index) in item.productDetailss" :key="index">
                        <img :src="item.url" alt="">

                        <p class="product-name">{{ item.title }}</p>

                        <span class="price">￥{{ item.price }}</span>
                        <span class="originalPrice" v-if="item.originalPrice">￥{{ item.originalPrice }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部信息组件 -->
        <footerInfo></footerInfo>

        <!-- 底部路由组件 -->
        <bottomRouter></bottomRouter>
    </div>
</template>

<script>
    // 引入轮播图插件
    import Swiper from "swiper";

    // 底部路由组件
    import bottomRouter from "../components/publics/bottomRouter.vue";
    // import swiper from "../components/swiper/swiper.vue";
    import footerInfo from "../components/publics/footerInfo.vue";

    export default {
        data(){
            return {
                // 轮播图数据
                bannerData: [],
                msg: null,

                // 图标数据
                navIcon: [],

                // 首页商品数据
                goodsData: [],

                time: 12 * 60 * 60 * 1000,

                saleItem: [
                    {
                        name: " 预售-OPPO Ace2 12G+256G 极光银 ",
                        img: "https://dsfs.oppo.com/archives/202005/202005250505415ecb8de9efaf6.png",
                        price: 4399,
                        original: 4599,
                    },
                    {
                        name: " 预售-Reno2 Z 8G+128G 晨雾白 ",
                        img: "https://dsfs.oppo.com/archives/202005/202005250505405ecb938874704.png",
                        price: 1899,
                        original: 2499,
                    },
                    {
                        name: " OPPO Enco Free 真无线耳机 恬白 ",
                        img: "https://dsfs.oppo.com/archives/201912/201912131012335df2f4091c73e.png",
                        price: 599,
                        original: 699,
                    },
                    {
                        name: " Reno3 8G+128G 蓝色星夜 ",
                        img: "https://dsfs.oppo.com/archives/201912/201912060212445de9fabc861e2.png",
                        price: 2999,
                        original: 3399,
                    },
                    {
                        name: " 预售-Reno Ace 8G+128G 星际蓝 ",
                        img: "https://dsfs.oppo.com/archives/202005/202005250405095ecb84a5c7e75.png",
                        price: 2299,
                        original: 3199,
                    },
                    {
                        name: " K3 保护壳 红色 ",
                        img: "https://dsfs.oppo.com/archives/201905/201905210805145ce3eb1ec22c8.png",
                        price: 9.90,
                        original: 19,
                    },
                    {
                        name: " K5保护壳 活力橙 ",
                        img: "https://dsfs.oppo.com/archives/201911/201911100411565dc7cb382c0ac.png",
                        price: 19.90,
                        original: 39,
                    },
                    {
                        name: " 归集小夜灯 ",
                        img: "https://dsfs.oppo.com/archives/202005/202005231105505ec89c6e5ece6.png",
                        price: 35,
                        original: 49,
                    },
                    {
                        name: " 欧瑞博智能插座 S30C ",
                        img: "https://dsfs.oppo.com/archives/201904/201904170404155cb6deb3918f7.png",
                        price: 45,
                        original: 55,
                    }
                ],

                saleContain: [],

                // 
                productData: [],

            };
        },

        components: {
            // swiper,
            footerInfo,
            bottomRouter,
        },

        methods: {
            // 获取轮播图数据
            getBaannerData() {
                this.$axios({
                    method: "GET",
                    url: "/banner",

                }).then(res => {

                    console.log("res ==> ", res);
                    if(res.data.code == 200) {
                        this.bannerData = res.data.data;
                    }

                }).catch(err => {

                    console.log("err ==> ", err);

                });
            },

            // 获取图标数据
            getIconNav() {

                this.$axios({
                    method: "GET",
                    url: "/iconNav",

                }).then(res => {

                    console.log("res ==> ", res);
                    if(res.data.code == 200){
                        
                        let one = res.data.data.splice(0, 1)[0];
                        this.msg = one.title.split("|");

                        this.navIcon = res.data.data;
                    }

                }).catch(err => {

                    console.log("err ==> ", err);

                });

            },

            // 获取首页商品数据
            getGoodsList() {

                this.$axios({
                    method: "GET",
                    url: "/homeGoodsList",

                }).then(res => {

                    // console.log("res ==> ", res);
                    if(res.data.code == 200){
                        this.goodsData = res.data.data.splice(0, 2);

                        this.saleContain = res.data.data.splice(0, 1);

                        this.productData = res.data.data;
                    }

                }).catch(err => {

                    console.log("err ==> ", err);

                });

            },

            // 跳转到搜索页面
            getSearch(){
                this.$router.push("/search");
            },

            // 跳转到详情页面
            getParticulars(){
                this.$router.push("/particulars");
            },

            
        },

        created(){
            // 获取轮播图数据
            this.getBaannerData();

            // 获取图标数据
            this.getIconNav();

            // 获取首页商品数据
            this.getGoodsList();

            this.$store.state.active = 0;
        },

        mounted() {

            new Swiper('.sale-container', {
                slidesPerView: 3.8,
            });
        }

    }
</script>

<style lang="less" scoped>
    .home{
        padding-bottom: 50px;
        overflow: hidden;
    }
    .homeTopNav{
        position: absolute;
        width: 100%;
        height: 44px;
        background-color: #fff;
        z-index: 9;
        .van-col{
            text-align: center;
            line-height: 44px;
            .van-search{
                height: 34px;
                padding: 0;
                margin: 5px;
            }
            .icon-oppo{
                font-size: 20px;
            }
            .login-user{
                width: 100%;
                height: 44px;
                img{
                    display: inline-block;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
        }
    }

    .my-swipe{
        height: 208px;
    }

    .msg{
        display: flex;
        padding-top: 10px;
        color: #b2b2b2;
        background-color: #fff;
        text-align: center;
        li{
            flex: 1;
            border-right: 1px solid #f7f7f7;
            line-height: 1em;
            &:last-child {
                border: none;
            }
        }
    }

    .nav-icon{
        display: flex;
        padding: 1em 0 2em;
        text-align: center;
        background-color: #fff;
        li{
            flex: 1;
            img{
                display: inline-block;
                width: 43px;
                height: 43px;
                vertical-align: middle;
            }
            p{
                margin-top: 5px;
                color: #666;
                line-height: 1em;
            }
        }
    }

    .floor-panel-contain{
        padding: 1em 1em 1.1em;
        
        li{
            display: flex;
            margin-bottom: 8px;
            justify-content: space-between;
            
            .particulars{
                width: 48.8%;
            }
            &.last{
                margin: 0;
                .particulars{
                    width: 23%;
                }
            }
        }
    }

    .sale{
        padding: 1em 0;
        .sale-title{
            padding: 0 1.2em;
            margin-bottom: 1em;
            .title-text{
                color: #000;
                font-size: 14px;
                // line-height: 23px;
            }
            .van-count-down{
                display: inline-block;
                .colon {
                    display: inline-block;
                    margin: 0 2px;
                    color: #ee0a24;
                }
                .block {
                    display: inline-block;
                    width: 22px;
                    color: #ee0a24;
                    font-size: 12px;
                    text-align: center;
                }
            }
            span{
                color: #ACADAF;
            }
            .more{
                float: right;
                margin-top: 2px;
                &::after{
                    content: "";
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    border-top: 1px solid #ACADAF;
                    border-right: 1px solid #ACADAF;
                    transform: rotate(45deg) translateY(-2px);
                }
            }
        }

        .sale-container {
            width: 100%;
            height: 100%;
            // margin-left: 1em;
            // padding-right: 1em;
            padding: 0 1em;
            // border-radius: 10px;
            .swiper-slide {
                width: 150px;
                background: #fff;
                text-align: center;
                padding-bottom: 8px;
                img{
                    display: inline-block;
                    width: 88px;
                    height: 88px;
                }
                p{
                    color: #000;
                    line-height: 1em;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .sale-price{
                    span{
                        color: #ee0a24;
                        &:last-child{
                            margin-left: 4px;
                            color: #b2b2b2;
                            text-decoration: line-through;
                        }
                    }
                }
            }
        }
    }

    .product{
        padding: 1em;

        .title{
            padding: 10px 0;
            font-size: 14px;
        }

        .floor-img{
            margin-bottom: 10px;
            border-radius: 10px;
            overflow: hidden;
        }

        .product-item{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .item{
                width: 33%;
                margin-top: 2px;
                padding: 10px;
                background-color: #fff;
                box-sizing: border-box;

                .product-name{
                    margin: 10px 0;
                }

                .price{
                    color: #F63434;
                }

                .originalPrice{
                    color: #B2B2B2;
                    text-decoration: line-through;
                }
            }

        }
    }
</style>