<template>
    <div>
        <div class="succeed">
            <div class="yes">
                <span class="iconfont icon-chenggong4"></span>
                <p>恭喜! 注册成功, 现在可以去<span @click="$router.push('/login')">登录</span>啦...</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="less" scoped>
    .succeed{
        display: flex;
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        .yes{
            text-align: center;
            .icon-chenggong4{
                font-size: 70px;
                color: #2BBD76;
            }
            p{
                font-size: 15px;
                span{
                    margin: 0 5px;
                    color: blue;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>