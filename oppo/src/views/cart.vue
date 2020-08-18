<template>
    <div class="cart">
        <h2 class="cart-title">
            <!-- <span class="iconfont icon-zuo" @click="$router.go(-1)"></span> -->
            购物车
        </h2>
        <div class="goodslist">
            <div class="goodsitem" v-for="(item, index) in lists" :key="index">

                <van-checkbox :value="item.isSelect" checked-color="#F63434" @click="inputselect(index)"></van-checkbox>
                
                <img :src="item.img" />

                <div class="goods-info">
                    <p class="goods-name">{{ item.name }}</p>
                    <div class="goods-price">￥{{ item.price }}</div>
                    
                    <div class="goods-count">
                        <van-stepper v-model="item.num" input-width="25px" button-size="20px" />

                        <span class="iconfont icon-shanchu" @click="del(index)"></span>
                    </div>
                </div>
            </div>

            <!-- 购物车没有数据 -->
            <div v-show="!(lists.length)" class="no">
                <img src="../assets/images/cart.png" alt="">
                <p>购物车空空，该补货啦</p>

                <van-button type="danger" @click="$router.push('/home')">去商城逛逛</van-button>

                <div class="goods-recommend">
                    <h3>看看大家都买了什么</h3>
                    <ul class="recommend-list">
                        <li @click="$router.push('/particulars')">
                            <img src="https://dsfs.oppo.com/archives/202005/202005210405385ec63bf2916e3.png" alt="">
                            <p class="phone-name">Find X2 Pro 竹青</p>
                            <p>超感官5G旗舰手机</p>
                            <span>￥6999</span>
                        </li>
                        <li @click="$router.push('/particulars')">
                            <img src="https://dsfs.oppo.com/archives/202003/202003250503005e7b20d88db26.png" alt="">
                            <p class="phone-name">Find X2 夜海</p>
                            <p>超感官5G旗舰手机</p>
                            <span>￥5499</span>
                        </li>
                        <li @click="$router.push('/particulars')">
                            <img src="https://dsfs.oppo.com/archives/202005/202005090905025eb606e63c3f0.png" alt="">
                            <p class="phone-name">Reno3 元气版 日出印象</p>
                            <p>一体化双模5G</p>
                            <span>￥2699</span>
                        </li>
                        <li @click="$router.push('/particulars')">
                            <img src="https://dsfs.oppo.com/archives/202005/202005280305205ecf618486331.png" alt="">
                            <p class="phone-name">Ace2 EVA限定版</p>
                            <p>新世纪福音战士限定版</p>
                            <span>￥4399</span>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>

        <!-- 去结算 -->
        <van-submit-bar v-show="lists.length" :price="total * 100" button-text="去结算"  @submit="onSubmit">
            <van-checkbox :value="checked" checked-color="#F63434" @click="checkboxAll">全选</van-checkbox>
        </van-submit-bar>


        <!-- 底部路由组件 -->
        <bottomRouter></bottomRouter>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import bottomRouter from "../components/publics/bottomRouter.vue";
    
    export default {
        data() {
            return {
                checked: true,
                total: 0,
                lists:[
                    // {
                    //     isSelect: true,
                    //     name: "A11 4G+64G 流云白",
                    //     img: "https://dsfs.oppo.com/archives/202005/202005131005215ebb5c713ed74.png",
                    //     price: 10,
                    //     num: 1
                    // },
                ],
            };
        },
        components: {
            bottomRouter,
        },
        methods: {
            // 删除
            del(index) {
                // console.log(index);
                this.lists.splice(index, 1);

                this.$store.state.cart.num -= 1;

            },

            // 总价格
            sum(){
                // total 累加值
                this.total = this.lists.reduce((total, item) => {
                    // console.log(total, item);
                    // 判断选项选中计算价格
                    //返回默认价格
                    if(!item.isSelect) return total;

                    //总价格
                    return total + parseInt(item.price) * parseInt(item.num); 
                }, 0)
            },

            checkboxclick(){
                this.checked = this.lists.every((item) => {
                    return item.isSelect;
                });
            },

            // 全选
            checkboxAll(){
                this.lists.forEach((item) => {
                    // console.log(item);
                    item.isSelect = !this.checked;
                });
                this.checked = !this.checked;
            },

            // 单选
            inputselect(index){
                this.lists[index].isSelect = !this.lists[index].isSelect;

                this.checkboxclick();
                this.sum();
            },

            // 去结算
            onSubmit(){
                if(this.$store.state.username){
                    this.$store.state.cart.lists.forEach((item, index) => {
                        // 判断商品是否被选中
                        if(this.$store.state.cart.lists[index].isSelect){

                            this.$router.push('/order');

                        }else{
                            Toast('请选择商品');
                        }
                    })
                }else{
                    this.$router.push('/login')
                }
            }

        },
        created() {
            this.lists = this.$store.state.cart.lists;
            this.checkboxclick();
            this.sum();

            this.$store.state.active = 2;
        },
        beforeUpdate(){
            this.sum();
        },
        beforeDestroy(){
            this.$store.commit("cart/edit", this.lists);
        }
    }
</script>

<style lang="less" scoped>
    .cart{
        padding-bottom: 50px;
    
        .cart-title{
            position: relative;
            height: 45px;
            background-color: #fff;
            font-size: 16px;
            font-weight: normal;
            text-align: center;
            line-height: 45px;
            // .icon-zuo{
            //     position: absolute;
            //     top: 0;
            //     left: 0;
            //     width: 60px;
            //     color: #f63636;
            //     text-align: center;
            //     line-height: 45px;
            // }
        }
        .goodslist{
            padding: 1.5em;
            .goodsitem{
                display: flex;
                margin-bottom: 1em;
                padding: 1em;
                background-color: #fff;
                border-radius: 10px;
                .van-checkbox{
                    padding: 4px;
                }
                img{
                    width: 50px;
                    height: 50px;
                }
                .goods-info{
                    flex: 1;
                    margin-left: 5px;
                    .goods-name{
                        color: #000;
                        font-size: 15px;
                    }
                    .goods-price{
                        color: #F63434;
                        font-size: 15px;
                    }
                    .goods-count{
                        display: flex;
                        margin-top: 10px;
                        justify-content: space-between;
                    }
                }
            }

            .no{
                text-align: center;
                img{
                    display: inline-block;
                    width: 20%;
                    margin-top: 30px;
                }
                p{
                    color: #B2B2B2;
                }
                .van-button{
                    height: 38px;
                    margin-top: 3em;
                    border-radius: 10px;
                }
                .goods-recommend{
                    margin-top: 8em;
                    h3{
                        font-size: 14px;
                    }
                    .recommend-list{
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        li{
                            width: 49%;
                            margin-top: 5px;
                            background-color: #fff;
                            text-align: center;
                            img{
                                width: 80px;
                                margin-top: 1em;
                            }
                            .phone-name{
                                color: #000;
                            }
                        }
                    }
                }
            }
        }
        
        .van-submit-bar{
            bottom: 50px;
            border-top: 1px solid #eee;
            .van-submit-bar__button{
                width: 90px;
                height: 35px;
                border-radius: 10px;
            }
        }
    }
</style>