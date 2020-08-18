<template>
    <div>
        <div class="swiper-container swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in bannerData" :key="index">
                    <img :src="item.url" alt="">
                </div>
            </div>

            <div class="swiper-pagination pagination"></div>
        </div>
    </div>
</template>

<script>
    import Swiper from "swiper";

    export default {
        props: ["bannerData"],

        methods: {
            // get(id) {
            //     console.log(id)
            //     this.$axios({
            //         method: "GET",
            //         url: "/banner",
            //         data: {
            //             id,
            //         }
            //     }).then(res => {

            //         console.log("res ==> ", res);

            //     }).catch(err => {
                    
            //         console.log("err ==> ", err);

            //     });

            // }
        },

        mounted(){

            new Swiper('.swiper', {
                // 无限循环
                loop: true,
                // preventClicks : false, // 默认true
                // 自动轮播
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.pagination',
                    clickable: true,
                },
            });
            
        }
    }
</script>

<style lang="less" scoped>
    .swiper {
        width: 100%;
        height: 100%;
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
    }
</style>