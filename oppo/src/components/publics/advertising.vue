<template>
    <div class="advertising">
        <div class="advertising-img">
            <img src="https://image.oppo.com/content/dam/oppo/cn/mkt/homepage/Discovery-PC-01.png" alt="">
        </div>

        <div class="app-title">
            <div class="app-logo">
                <img src="https://dsfs.oppo.com/store/cn/m/img/image1.e085c6b9.png" alt="">
            </div>
            <div class="text">
                <h1>OPPO 商城</h1>
                <p>万物互融新生态</p>
            </div>
        </div>
        <span class="skip" @click="$router.push('/home')">跳过 {{ num }}</span>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                num: 3,
                cleardata: null,
            };
        },
        created(){
            // 广告倒计时
            this.cleardata = setInterval(() => {
                if(this.num == 0){
                    // 跳转首页
                    this.$router.push('/home');
                } else{
                    this.num--;
                }
            }, 1000);
        },
        // 当组件销毁时
        beforeDestroy(){
            // 当路由器切换时候，关闭定时器
            clearInterval(this.cleardata);
        }
    }
</script>

<style lang="less" scoped>
    .advertising{
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        overflow: hidden;
        .advertising-img{
            height: 80%;
            img{
                height: 100%;
            }
        }
        .app-title{
            display: flex;
            height: 20%;
            justify-content: center;
            align-items: center;
            .app-logo{
                width: 50px;
                height: 50px;
            }
            .text{
                height: 50px;
                margin-left: 10px;
                line-height: 25px;
                letter-spacing: 1px;
                h1{
                    font-size: 16px;
                }
                p{
                    color: #999;
                }
            }
        }
        .skip{
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px 10px;
            color: #fff;
            background-color: rgba(0, 0, 0, .5);
            border-radius: 5px;
        }
    }
</style>