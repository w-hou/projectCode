<template>
    <div>
        <div class="orderReceiving">
            <div class="order-list" v-for="(item, index) in lists" :key="index">

                <div v-if="item.type == 3">

                    <div class="order-title">
                        <div class="ordernum">
                            <p>订单号<span>{{ item.orderId }}</span></p>
                            <span class="status">{{ typeList[item.type] }}</span>
                        </div>
                        <div class="time">{{ item.dateTime.toLocaleString() }}</div>
                    </div>
                    <!-- 商品列表 -->
                    <div class="goods" v-for="(val, i) in item.goodsList" :key="i">
                        <div class="goods-info">
                            <img :src="val.img" alt="">
                            <div class="goods-text">
                                <p class="goods-name">{{ val.name }}</p>
                                <span>￥{{ val.price }}</span>
                                
                                <p class="goods-count">X{{ val.num }}</p>
                            </div>
                        </div>
                        <div class="sum">总金额: <span>￥{{ item.total }}</span></div>
                        <p class="remarks">备注: {{ item.text }}</p>
                    </div>

                    <div class="footer">
                        <!-- 已发货 -->
                        <div v-if="item.type == 3">
                            <van-button size="mini" type="primary" @click="onGoods(index)">确认收货</van-button>
                            <van-button size="mini" type="danger" @click="onDel(index)">取消订单</van-button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';

    export default {
        methods: {
            onGoods(index){
                this.lists[index].type = 4;
            },
            onDel(index){
                this.lists[index].type = 99;
                Toast("取消订单成功!");
            }
        },
        created() {
            // 类型为 3 代表待收货
            this.lists = this.$store.state.orderForm.lists.filter(item => item.type == 3);
            
            this.typeList = this.$store.state.orderForm.typeList;
        },
    }
</script>

<style lang="less" scoped>
    .orderReceiving{
        padding: 1em;
        .order-list{
            margin-bottom: 1em;
            padding: 1em;
            background-color: #fff;
            border-radius: 10px;
            .order-title{
                border-bottom: 1px solid #F7F7F7;
                .ordernum{
                    display: flex;
                    p{
                        flex: 1;
                        font-size: 14px;
                        span{
                            margin: 0 5px;
                        }
                    }
                    .status{
                        font-size: 14px;
                    }
                }
            }
            .goods-info{
                display: flex;
                padding: 1em;
                align-items: center;
                img{
                    width: 52px;
                    height: 52px;
                    margin-right: 10px;
                }
                .goods-text{
                    flex: 1;

                    .goods-name{
                        font-size: 15px;
                    }
                    span{
                        font-size: 15px;
                        color: #F63434;
                    }
                    .goods-count{
                        text-align: right;
                    }
                }
            }
            .sum{
                font-size: 14px;
                span{
                    color: #F63434;
                }
            }
            .footer{
                text-align: right;
                .van-button{
                    padding: 0 6px;
                    border-radius: 5px;
                }
            }
        }
    }
</style>