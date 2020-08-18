<template>
    <div class="my">
        <div class="userHead">
            <div class="userinfo" v-if="$store.state.username">
                <div class="userphoto">
                    <img src="../assets/images/user.jpg" alt="">
                </div>
                <div class="container">
                    <h2 v-text="$store.state.username"></h2>
                    <p class="bg">普卡会员</p>
                </div>
                <van-button type="danger" size="small" @click="$store.state.username=''">退出登录</van-button>
            </div>
            <div class="userinfo" v-else>
                <div class="userphoto">
                    <img src="../assets/images/photo.png" alt="">
                </div>
                <div class="container">
                    <h2>登录 OPPO 账号</h2>
                    <p>体验更多功能</p>
                </div>
                <van-button type="danger" size="small" @click="$router.push('/login')">登录</van-button>
            </div>

            <div class="property">
                <div>
                    <p v-if="$store.state.username">0</p>
                    <p v-else>--</p>
                    <span>优惠券</span>
                </div>
                <div>
                    <p v-if="$store.state.username">0</p>
                    <p v-else>--</p>
                    <span>回收代金卷</span>
                </div>
                <div>
                    <p v-if="$store.state.username">0</p>
                    <p v-else>--</p>
                    <span>积分</span>
                </div>
            </div>
        </div>

        <div class="page">
            <div class="user-order">
                <div class="myorder">我的订单<span @click="$router.push('/orderForm/orderAll')">全部订单</span></div>
                <div class="order-list">
                    <div @click="$router.push('/orderForm/orderPay')">
                        <span class="iconfont icon-daifukuan5050px"></span>
                        <p>待付款</p>
                    </div>
                    <div @click="$router.push('/orderForm/orderGoods')">
                        <span class="iconfont icon--fahuo"></span>
                        <p>待发货</p>
                    </div>
                    <div @click="$router.push('/orderForm/orderReceiving')">
                        <span class="iconfont icon-icon_shouhuo"></span>
                        <p>已发货</p>
                    </div>
                    <div @click="$router.push('/orderForm/orderEnd')">
                        <span class="iconfont icon-renwuliebiao_zhijian"></span>
                        <p>已完成</p>
                    </div>
                    <!-- <div>
                        <span class="iconfont icon-huishou"></span>
                        <p>回收单</p>
                    </div> -->
                </div>
            </div>

            <div class="card-module">
                <img src="https://dsfs.oppo.com/archives/202005/202005281005105ecfc9c6b05f5.jpg" alt="">
            </div>

            <div class="interaction">
                <p class="title">互动乐园</p>
                <div class="card-item">
                    <div class="card" @click="$router.push('/particulars')">
                        <div class="card-text">
                            <h5>幸运锦鲤</h5>
                            <span>一人独享礼包</span>
                        </div>
                        <img src="https://dsfs.oppo.com/archives/201911/201911010911235dbc385bc5fb3.png" alt="">
                    </div>
                </div>
            </div>

            <div class="tool">
                <p class="title">常用工具</p>
                <div class="tool-list">
                    <div>
                        <img src="https://dsfs.oppo.com/archives/201912/201912020712185de4f76eba47b.png" alt="">
                        <p>服务网点</p>
                    </div>
                    <div>
                        <img src="https://dsfs.oppo.com/archives/201912/201912020712065de4f79ee379f.png" alt="">
                        <p>保障服务</p>
                    </div>
                    <div>
                        <img src="https://dsfs.oppo.com/archives/201912/201912020712335de4f7b9dcd4b.png" alt="">
                        <p>真伪查询</p>
                    </div>
                    <div>
                        <img src="https://dsfs.oppo.com/archives/201912/201912020712115de4f7df611f6.png" alt="">
                        <p>维修服务</p>
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
    import bottomRouter from "../components/publics/bottomRouter.vue";
    // 引入底部信息组件
    import footerInfo from "../components/publics/footerInfo.vue";

    export default {
        components: {
            footerInfo,
            bottomRouter,
        },
        created(){
            this.$store.state.active = 3;
        },
    }
</script>

<style lang="less" scoped>
    .my{
        padding-bottom: 50px;
    
        .userHead{
            padding: 0 1em;
            background: url("https://dsfs.oppo.com/store/cn/m/img/bg.d66a35d4.png") no-repeat 0 0/cover;
            .userinfo{
                display: flex;
                padding: 20px 0;
                align-items: center;
                .userphoto{
                    width: 60px;
                    height: 60px;
                    margin-right: 10px;
                    img{
                        border-radius: 50%;
                    }
                }
                .container{
                    flex: 1;
                    h2{
                        font-size: 16px;
                        font-weight: normal;
                        letter-spacing: 1px;
                    }
                    p.bg{
                        width: 60px;
                        padding: 2px;
                        background-color: cyan;
                        border-radius: 5px;
                        text-align: center;
                    }
                }
                .van-button{
                    height: 25px;
                    border-radius: 6px;
                }
            }
            .property{
                display: flex;
                justify-content: space-around;
                text-align: center;
                div{
                    flex: 1;
                    p{
                        margin-bottom: 5px;
                    }
                }
            }
        }

        .page{
            background-color: #fff;

            .user-order{
                background-color: #FDFDFD;
                .myorder{
                    padding: 20px 10px 10px;
                    color: #000;
                    font-size: 13px;
                    span{
                        float: right;
                        color: #666;
                        &::after{
                            content: "";
                            display: inline-block;
                            width: 6px;
                            height: 6px;
                            margin: 0 0 1px 2px;
                            border-top: 1px solid #b2b2b2;
                            border-right: 1px solid #b2b2b2;
                            transform: rotateZ(45deg);
                        }
                    }
                }
                .order-list{
                    display: flex;
                    margin: 1em 0;
                    padding: 0 1em;
                    justify-content: space-around;
                    div{
                        width: 50px;
                        text-align: center;
                        .iconfont{
                            font-size: 20px;
                        }
                    }
                }
            }
        
            .card-module{
                margin-top: 30px;
                padding: 0 1em;
                border-radius: 10px;
                img{
                    border-radius: 10px;
                }
            }
        
            .interaction{
                margin-top: 18px;
                .card-item{
                    padding: 0 1em;
                    .card{
                        display: flex;
                        width: 45%;
                        height: 45px;
                        padding: 1em;
                        background-color: #F7F8FA;
                        border-radius: 10px;
                        align-items: center;
                        .card-text{
                            flex: 1;
                        }
                        img{
                            width: 45px;
                            height: 45px;
                        }
                    }
                }
            }

            p.title{
                padding: 1em;
                font-size: 13px;
            }

            .tool{
                margin-top: 18px;
                .tool-list{
                    display: flex;
                    padding: 0 1em;
                    div{
                        margin: 10px;
                        flex: 1;
                        text-align: center;
                        img{
                            display: inline-block;
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
            }
        }

        
    }
</style>