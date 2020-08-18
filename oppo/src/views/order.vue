<template>
    <div>
        <!-- 提交订单页标题 -->
        <div class="orderNav">
            <span class="iconfont icon-zuo" @click="cartLeft"></span>
            <h3>提交订单</h3>
        </div>

        <div class="orderpage">
            <!-- 地址 -->

            <div class="site" @click="siteAdd" v-if="$store.state.address.lists.length">
                <div class="info">
                    <span class="name">{{ name }}</span>
                    <span>{{ tel }}</span>
                </div>
                <p>{{ address }}</p>
            </div>
            <div v-else class="addsite" @click="siteAdd">
                <span class="iconfont icon-jia"></span>
                <span>新增收货地址</span>
            </div>

            <div class="goods">
                <!-- 商品信息 -->
                <div class="goods-info" v-for="(item, index) in lists" :key="index">
                    <img :src="item.img" alt="">
                    <div class="goods-text">
                        <p class="goods-name">{{ item.name }}</p>
                        <span>￥{{ item.price }}</span>
                        <p class="goods-count">X{{ item.num }}</p>
                    </div>
                </div>
            </div>

            <!-- 服务信息 -->
            <ul class="service">
                <li>
                    <p>商品金额</p>
                    <span>￥{{ total }}</span>
                </li>
                <li>
                    <p>运费</p>
                    <span>￥0</span>
                </li>
                <li>
                    <p>配送方式</p>
                    <span>普通配送 免邮</span>
                </li>
            </ul>

            <!-- 订单备注 -->
            <div class="remarks">
                <div class="remark">
                    <p>订单备注</p>
                    <input type="text" placeholder="选填" v-model="text">
                </div>
            </div>
        </div>

        <!-- 提交订单 -->
        <van-submit-bar :price="total * 100" button-text="提交订单"  @submit="onSubmit"></van-submit-bar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 备注信息
                text: "",
                name: null,
                tel: null,
                address: null,
            }
        },
        methods: {
            // 总价格
            sum(){
                // total 累加值
                this.total = this.lists.reduce((total, item) => {
                    // console.log(total, item);
                    // 判断选项选中计算价格
                    if(!item.isSelect) return total;

                    //总价格
                    return total + parseInt(item.price) * parseInt(item.num); 
                }, 0);

                // console.log(this.total);
            },

            siteAdd(){
                // 地址跳转
                if(this.$store.state.address.lists.length){

                    this.$router.push('/address');

                }else{

                    this.$router.push('/newAddress');
                    
                }
            },

            cartLeft(){
                this.$store.commit("orderForm/add", {
                    orderId: new Date().getTime(),
                    address: this.address,
                    goodsList: this.lists,
                    text: this.text,
                    total: this.total,
                    dateTime: new Date(),
                    type: 1,
                });
                // 清空
                this.$store.state.cart.lists = [];
                // 商品数量
                this.$store.state.cart.num = 0;
                this.$router.go(-1);
            },

            // 提交订单
            onSubmit(){
                // 调用vuex订单数据状态
                this.$store.commit("orderForm/add", {
                    orderId: new Date().getTime(),
                    address: this.address,
                    goodsList: this.lists,
                    text: this.text,
                    total: this.total,
                    dateTime: new Date(),
                    type: 2,
                });
                // 清空
                this.$store.state.cart.lists = [];
                // 商品数量
                this.$store.state.cart.num = 0;

                this.$router.push("orderForm/orderAll");
            }
        },
        created(){
            
            // 选中的商品
            this.$store.state.cart.lists.forEach((item, index) => {
                if(this.$store.state.cart.lists[index].isSelect){

                    this.lists = this.$store.state.cart.lists;
                };
            });

            // 获取地址
            let data = this.$store.state.address.lists.find(item => item.isDefault);
            if(data){
                this.name = data.name;
                this.tel = data.tel;
                this.address = data.address;
            };

            this.sum();
        },
    }
</script>

<style lang="less" scoped>
    .orderNav{
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
    // .van-contact-card{
    //     width: 92%;
    //     margin: 1em auto;
    //     border-radius: 10px;
    // }
    .orderpage{
        padding: 1em;

        .site{
            padding: 1em;
            background-color: #fff;
            border-radius: 10px;
            .info{
                span{
                    color: #666;
                    font-size: 14px;
                    &.name{
                        margin-right: 10px;
                        color: #000;
                        font-weight: bold;
                    }
                }
            }
            p{
                line-height: 25px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }

        .addsite{
            display: flex;
            height: 45px;
            background-color: #fff;
            border-radius: 10px;
            justify-content: center;
            align-items: center;
            span{
                font-size: 14px;
                &.icon-jia{
                    margin-right: 5px;
                    color: #F63434;
                }
            }
        }

        .goods{
            margin-top: 1em;
            border-radius: 10px;
            background-color: #fff;
            .goods-info{
                display: flex;
                border-bottom: 1px solid #F7F7F7;
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
        }

        .service{
            margin-top: 1em;
            background-color: #fff;
            border-radius: 10px;
            li{
                display: flex;
                padding: 1em;
                font-size: 15px;
                justify-content: space-between;
            }
        }

        .remarks{
            margin-top: 1em;
            background-color: #fff;
            border-radius: 10px;
            .remark{
                display: flex;
                padding: 1em;
                p{
                    font-size: 15px;
                    margin-right: 2em;
                }
                input{
                    flex: 1;
                    text-indent: 2em;
                }
            }
        }
    }

    .van-submit-bar{
        .van-submit-bar__text{
            text-align: left;
        }
        .van-submit-bar__button{
            width: 100px;
            height: 35px;
            margin-left: 100px;
            border-radius: 10px;
        }
    }
</style>