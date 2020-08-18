<template>
    <div>
        <div class="orderAll">
            <div class="order-list" v-for="(item, index) in lists" :key="index">

                <div class="order-title">
                    <div class="ordernum">
                        <p>订单号<span>{{ item.orderId }}</span></p>
                        <span class="status">{{ typeList[item.type] }}</span>
                    </div>
                    <div class="time">{{ item.dateTime.toLocaleString() }}</div>
                </div>
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

                    <!-- 代付款 -->
                    <div v-if="item.type == 1">
                        <van-button size="mini" type="info" @click="onPay(item.orderId)">支付订单</van-button>
                        <van-button size="mini" type="danger" @click="onDel(item.orderId)">取消订单</van-button>
                    </div>

                    <!-- 待发货 -->
                    <div v-if="item.type == 2">
                        <van-button size="mini" type="primary" disabled>备货中...</van-button>
                        <van-button size="mini" type="danger" @click="onDel(item.orderId)">取消订单</van-button>
                    </div>

                    <!-- 已发货 -->
                    <div v-if="item.type == 3">
                        <van-button size="mini" type="primary" @click="onGoods(item.orderId)">确认收货</van-button>
                        <van-button size="mini" type="danger" @click="onDel(item.orderId)">取消订单</van-button>
                    </div>

                    <!-- 已完成 -->
                    <div v-if="item.type == 4">
                        <van-button size="mini" type="danger" @click="onDel(item.orderId)">删除订单</van-button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';

    export default {
        data(){
            return {
                lists: [],
            }
        },
        methods: {
            onPay(orderId){
                let index = this.lists.findIndex(item => item.orderId == orderId);

                 //切换订单状态
                this.lists[index].type = 2; 
            },

            onGoods(orderId){
                let index = this.lists.findIndex(item => item.orderId == orderId);

                 //切换订单状态
                this.lists[index].type = 4;
            },

            toggle(){
                // 如果当前是待发货状态, 过五秒后切换待收货状态
                this.lists.findIndex((item) => {
                    // console.log(item.type);

                    if(item.type == 2){
                        setTimeout(() => {
                            item.type = 3;
                            console.log(item.type);
                            Toast("已发货");
                        },5000);
                    }
                    
                });
            },

            onDel(orderId){
                let index = this.lists.findIndex(item => item.orderId == orderId);
                this.lists.splice(index, 1);

                Toast("取消订单成功!");
            }
        },
        created() {
            this.lists = this.$store.state.orderForm.lists;
            
            this.typeList = this.$store.state.orderForm.typeList;

            // 将订单类型为99的删除, 订单类型为99的代表已删除
            this.lists.forEach((item, index)=>{
                if(item.type == 99){
                    this.lists.splice(index, 1);
                }
            });

            this.toggle();
        },
        mounted(){
            
        },
        // 组件销毁
        beforeDestroy() {
            if(this.lists.length) {
                this.$store.commit("orderForm/editId", this.lists);
            }
        }
    }
</script>

<style lang="less" scoped>
    .orderAll{
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