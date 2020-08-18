<template>
    <div>
        <van-row class="searchTopNav">
            <van-col span="4" @click="$router.go(-1)">
                <span class="iconfont icon-zuo"></span>
            </van-col>
            <van-col span="16">
                <van-search placeholder="请输入搜索关键词" />
            </van-col>
            <van-col span="4">搜索</van-col>
        </van-row>

        <!-- 热门推荐 -->
        <div class="recomm">
            <h4>热门推荐</h4>
            <div class="search-referral">
                <span v-for="(item, index) in referral" :key="index">{{ item }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                referral: ["新品Reno4系列", "Enco W31真无线耳机", "A92s", "Blicca双肩包", "Find X2系列", "OPPO Watch", "Ace2", "游戏手柄"],
            };
        },
    }
</script>

<style lang="less" scoped>
    .searchTopNav {
        height: 44px;
        background-color: #fff;
        border-bottom: #f6f6f6;
        .van-col {
            text-align: center;
            line-height: 44px;
            .van-search {
                height: 34px;
                padding: 0;
                margin: 5px;
            }
            .icon-zuo {
                color: #f63636;
                font-size: 20px;
            }
        }
    }

    .recomm {
        padding: 30px 12px 0;
        background-color: #fff;
        h4 {
            color: #999;
            font-weight: normal;
        }
        .search-referral{
            margin-top: 1.5em;
            span {
                display: inline-block;
                margin: 0 8px 8px 0;
                padding: 0 1em;
                background-color: #F7F8FA;
                border-radius: 5px;
                line-height: 33px;
            }
        }
    }
</style>