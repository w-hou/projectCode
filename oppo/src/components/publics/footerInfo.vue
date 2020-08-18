<template>
    <div>
        <div class="footer-wrapper">
            <div class="download-and-login">
                <div class="download-app">
                    <a href="https://www.opposhop.cn/app/download.html" target="_blank">
                        <span class="iconfont icon-shouji"></span>
                        <span>下载APP</span>
                    </a>
                </div>
                <div class="login-app">
                    <span class="iconfont icon-tuichu"></span>
                    <span>登录账号</span>
                </div>
            </div>

            <div class="oppo-info">
                <span class="license">营业执照</span>
                <span class="privacy">隐私政权</span>
                <span class="user">用户协议</span>
            </div>

            <div class="copyright"> © 2005 - 2020 OPPO 版权所有 粤ICP备14056724号-2 </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
    .footer-wrapper{
        margin-top: 1em;
        background-color: #fff;
        .download-and-login{
            display: flex;
            height: 40px;
            text-align: center;
            align-items: center;
            .download-app{
                flex: 1;
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                    span:last-child{
                        color: #555;
                    }
                }
            }
            .login-app{
                flex: 1;
            }
            .icon-shouji, .icon-tuichu{
                margin-right: 5px;
                color: #B9B2C3;
            }
        }
        .oppo-info{
            display: flex;
            margin: 1em 0;
            justify-content: center;
            .privacy{
                padding: 0 32px;
            }
        }
        .copyright{
            padding-bottom: 1em;
            text-align: center;
        }
    }
</style>