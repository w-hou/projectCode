<template>
    <div class="classify">
        <div class="search">
            <van-search placeholder="请输入搜索关键词" @focus="getSearch" />
        </div>
        <!-- 联动组件 -->
        <BScroll :left="left" :right="right" :left1="left1" :right1="right1"></BScroll>

        <!-- 底部路由组件 -->
        <bottomRouter></bottomRouter>
    </div>
</template>

<script>
    // 引入联动组件
    import BScroll from "../components/scroll/BScroll";
    // 底部路由组件
    import bottomRouter from "../components/publics/bottomRouter.vue";

    export default {
        data() {
            return {
                left: ["Find X系列", "Reno系列", "Ace系列", "K系列", "A系列", "智能穿戴", "充电必备", "耳机影音", "手机配件", "游戏文娱", "家居电器", "个护健康", "车载出行"],
                right: [
                    { title: "Find X系列", content: [
                        { name: "Find X2 Pro 兰博基尼", img: "https://dsfs.oppo.com/archives/202003/202003250503185e7b20ae20b16.png", describe: "兰博基尼定制版", price: 12999, }, 
                        { name: "Find X2 夜海", img: "https://dsfs.oppo.com/archives/202003/202003250503415e7b2089e4cd1.png", describe: "超感官5G旗舰手机", price: 5499, }, 
                        { name: "Find X 冰珀蓝", img: "https://dsfs.oppo.com/archives/201809/201809180509035ba0c4336d3bf.png", describe: "曲面全景屏", price: 4999, } ]
                    },

                    { title: "Reno系列", name: "众筹", content: [
                        { name: "Reno3 元气版 日出印象", img: "https://dsfs.oppo.com/archives/202005/202005090905025eb606e63c3f0.png", describe: "一体化双模5G", price: 2699, }, 
                        { name: "Reno3 Pro 月夜黑", img: "https://dsfs.oppo.com/archives/201912/201912060312535dea00a181940.png", describe: "5G视频手机", price: 3699, }, 
                        { name: "Reno3 蓝色星夜", img: "https://dsfs.oppo.com/archives/201912/201912060212445de9fabc861e2.png", describe: "一体化双模5G", price: 2999, },
                        { name: "Reno2  深海夜光", img: "https://dsfs.oppo.com/archives/201910/201910150210315da5674b33765.png", describe: "视频超级防抖", price: 2999, },
                        { name: "Reno 星云紫", img: "https://dsfs.oppo.com/archives/201904/201904110204335caede9166811.png", describe: "全景屏，VOOC 3.0", price: 1999, },
                        { name: "Reno2 Z 晨雾白", img: "https://dsfs.oppo.com/archives/201910/201910170310425da812c653c16.png", describe: "4800万夜拍四摄", price: 2299, },
                        { name: "Reno 10倍变焦版", img: "https://dsfs.oppo.com/archives/201904/201904160304045cb5865c26d65.png", describe: "骁龙855,60倍数码变焦", price: 2799, }, ]
                    },
                    
                    { title: "Ace系列", name: "Redmi", content: [
                        { name: "OPPO Ace2 极光银", img: "https://dsfs.oppo.com/archives/202005/202005090505595eb6797fc36a8.png", describe: "高通骁龙865", price: 3999, }, 
                        { name: "Reno Ace 电音紫", img: "https://dsfs.oppo.com/archives/201909/201909301109505d917a32d5ed4.png", describe: "65W超级闪充", price: 2699, }, ]
                    },

                    { title: "K系列", name: "黑鲨", content: [
                        { name: "K5 赛博金属", img: "https://dsfs.oppo.com/archives/202002/202002081002175e3e17d51d2f9.png", describe: "高通730g，VOOC 4.0", price: 1899, }, 
                        { name: "K3 电波蓝", img: "https://dsfs.oppo.com/archives/201907/201907300207295d3fea1de633e.png", describe: "骁龙710，全面屏", price: 1899, }, ]
                    },

                    { title: "A系列", name: "5G合约", content: [
                        { name: "A92s 佳人粉", img: "https://dsfs.oppo.com/archives/202005/202005131005215ebb5c713ed74.png", describe: "120Hz畅感屏", price: 2499, }, 
                        { name: "A11  流云白", img: "https://dsfs.oppo.com/archives/202002/202002200902595e4de72f70a2a.png", describe: "5000mAh超大电池", price: 1299, }, 
                        { name: "A8  秘夜黑", img: "https://dsfs.oppo.com/archives/201912/201912240312015e01b771a8ae7.png", describe: "4230mAh大电池", price: 1199, },
                        { name: "A52 星耀白", img: "https://dsfs.oppo.com/archives/202004/202004201004575e9d0fb5c6534.png", describe: "5000mAh超大电池", price: 1599, },
                        { name: "A11x 暮辰紫", img: "https://dsfs.oppo.com/archives/201910/201910310910035dbae343d9453.png", describe: "5000mAh超大电池", price: 1599, },
                        { name: "A5 珊瑚红", img: "https://dsfs.oppo.com/archives/201812/201812210812215c1cdb39189ce.png", describe: "全屏双摄、长效续航", price: 699, },
                        { name: "A91 暗夜星辰", img: "https://dsfs.oppo.com/archives/201912/201912200912455dfc2535772a4.png", describe: "4800万超广角微距四摄", price: 1799, },
                        { name: "A9x 曜石黑", img: "https://dsfs.oppo.com/archives/201905/201905200905315ce2a7fbe1dca.png", describe: "4800万超清像素", price: 1799, }, ]
                    },
                ],

                left1: [],

                right1: [],
            };
        },
        components: {
            BScroll,
            bottomRouter,
        },
        methods: {
            getSearch() {
                this.$router.push("/search");
            },

            // 获取手机分类数据
            getPhoneClassify() {
                this.$axios({
                    methods: "GET",
                    url: "/phoneClassify"
                }).then(res => {
                    // console.log("res ==> ", res);
                    
                    if(res.data.code == 200) {
                        // console.log("res ==> ", res.data.data);

                        this.right1 = res.data.data;
                    }

                }).catch(err => {
                    console.log("err ==> ", err);


                });
            },

            // 获取配件分类数据
            getPartsClassify() {
                this.$axios({
                    methods: "GET",
                    url: "/partsClassify"
                }).then(res => {
                    // console.log("res ==> ", res);

                    if(res.data.code == 200) {
                        // console.log("res ==> ", res.data.data);

                        res.data.data.forEach(item => {
                            this.right1.push(item);
                        })

                        this.right1.forEach(item => {
                            this.left1.push(item.name);
                        })


                    }

                }).catch(err => {
                    console.log("err ==> ", err);

                    
                });
            }
        },
        created(){

            // 获取手机分类数据
            this.getPhoneClassify();

            // 获取配件分类数据
            this.getPartsClassify();

            this.$store.state.active = 1;
        },
    }
</script>

<style lang="less" scoped>
    .search{
        height: 44px;
        padding: 5px 0;
        background-color: #fff;
        box-sizing: border-box;
        .van-search {
            width: 90%;
            height: 34px;
            margin: auto;
            padding: 0;
            border-radius: 10px;
        }
    }
</style>