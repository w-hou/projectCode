<template>
    <div>
        <!-- Swiper -->
        <div class="swiper-container swiper-guidePage">
            <div class="swiper-wrapper">
                <div class="swiper-slide slide1">
                    <span class="iconfont icon-oppo"></span>
                    <span class="arr"></span>
                </div>
                <div class="swiper-slide slide2">
                    <span class="arr"></span>
                </div>
                <div class="swiper-slide slide3">
                    <div class="title">
                        <h2>Reno 印象</h2>
                        <p>定义 Reno, 赢野兽派马克杯</p>
                    </div>
                    <span class="arr"></span>
                </div>
                <div class="swiper-slide slide4">
                    <span class="btn" @click="$router.push('/home')">立即体验</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from "swiper";

    export default {
        mounted(){
            new Swiper('.swiper-guidePage', {
                // 垂直
                direction: 'vertical',
                // 速率
                speed: 1000,
                // 鼠标滚动
                mousewheel: true,
            });
        },
    }
</script>

<style lang="less" scoped>
    .swiper-guidePage {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        .swiper-wrapper{
	        /* 通过改变animation-timing-function 制作弹性切换效果 */
            // transition: 2s cubic-bezier(0.21, 0.88, 0.27, 1.34);
            
            .swiper-slide {
                position: relative;
                background: #fff;
                font-size: 18px;
                text-align: center;

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

                .icon-oppo{
                    position: absolute;
                    top: 10px;
                    color: #086F36;
                    font-size: 42px;
                }

                .arr{
                    position: absolute;
                    left: 50%;
                    bottom: 25px;
                    width: 12px;
                    height: 12px;
                    transform: translateX(-50%) rotateZ(45deg);
                    animation: up 1s infinite;

                    &::before{
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 12px;
                        height: 12px;
                        border-top: 2px solid #086F36;
                        border-left: 2px solid #086F36;
                        opacity: .8;

                    }
                    &::after{
                        content: "";
                        position: absolute;
                        top: 6px;
                        left: 6px;
                        width: 10px;
                        height: 10px;
                        border-top: 2px solid #086F36;
                        border-left: 2px solid #086F36;
                        opacity: .2;
                    }
                }

                .title{
                    position: absolute;
                    top: 50px;
                    color: #fff;
                    h2{
                        font-size: 40px;
                    }
                    p{
                        font-size: 14px;
                        letter-spacing: 1px;
                    }
                }

                .btn{
                    position: absolute;
                    bottom: 64px;
                    padding: 3px 10px;
                    color: #0F0F0F;
                    border: 1px solid #515151;
                    border-radius: 15px;
                    font-size: 12px;
                }
            }

            .slide1{
                background: url("../../assets/images/reno.jpg") no-repeat center/600px 700px;
                
            }
            
            .slide2{
                background: url("../../assets/images/2.png") no-repeat center/cover;
            }

            .slide3{
                background: url("../../assets/images/3.png") no-repeat;
            }

            .slide4{
                background: url("../../assets/images/watch.jpg") no-repeat center/cover;
                
            }

        }
    }

    @keyframes up {
        0%{
            transform: translateX(-50%) rotateZ(45deg);
            opacity: 1;
        }
        100%{
            transform: translateX(-50%) translateY(-100%) rotateZ(45deg);
            opacity: 0;
        }
    }
    
</style>