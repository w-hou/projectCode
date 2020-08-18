<template>
    <div>
        <div class="login">
            <div class="goBack">
                <span class="iconfont icon-zuo" @click="$router.go(-1)"></span>
            </div>
            <div class="box">
                <div class="logo">
                    <span class="iconfont icon-oppo"></span>
                </div>
                <p>登录 OPPO 帐号可享受更多的服务</p>

                <!-- 登录表单 -->
                <!-- <div class="forms">
                    <h4>密码登录</h4>
                    <p><input type="text" placeholder="请输入账户名" v-model="username"></p>
                    <p><input type="password"  placeholder="请输入密码" v-model="password"></p>
                </div> -->
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="username"
                        name="username"
                        label="用户名"
                        placeholder="请输入用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        name="password"
                        label="密码"
                        placeholder="请输入密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button block type="primary"  native-type="submit">登录</van-button>
                    </div>
                    <!-- 跳转注册页面 -->
                    <router-link to="/register">注册账号</router-link>
                </van-form>

            </div>

            <div class="statement">
                <a href="https://muc.oppomobile.com/document/privacyPolicy/privacy_policy_zh-CN.html" target="_blank">账号隐私声明</a>
            </div>

            <div class="copyright">
                <p><span>© 2005 - 2020 OPPO 版权所有 粤ICP备14056724号-2</span><span>联系方式：4001-666-888</span></p>
            </div>

        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    
    export default {
        data(){
            return{
                username: null,
                password: null,
            }
        },
        methods: {
            onSubmit(params){
                // let _this = this;
                this.$axios.get("login", {params}).then((res) => {
                    // 判断是否请求成功
                    // console.log(res);
                    if(res.data == "200"){
                        Toast.success({
                            message: '登录成功',
                            onOpened: () => {
                                // 将用户名存储到vuex中
                                this.$store.state.username = this.username;
                                // 跳转路由
                                this.$router.push('/home');
                            }
                        });
                    }else{
                        Toast.fail('登录失败');
                    }
                });
            }
        },
    }
</script>

<style lang="less" scoped>
    .login{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-color: #fff;
        .goBack{
            position: relative;
            height: 50px;
            .icon-zuo{
                position: absolute;
                top: 0;
                left: 0;
                width: 50px;
                text-align: center;
                line-height: 50px;
            }
        }

        .box{
            padding: 25px;
            color: #000;
            text-align: center;
            .icon-oppo{
                font-size: 3.2em;
            }

            // .forms{
            //     margin-top: 3em;
            //     h4{
            //         margin: 1em 0;
            //         font-size: 16px;
            //         font-weight: normal;
            //     }
            //     input{
            //         width: 100%;
            //         height: 45px;
            //         margin: 5px 0;
            //         background-color: #F7F7F7;
            //         border-radius: 10px;
            //         text-indent: 2em;
            //     }
            // }
            .van-form{
                margin-top: 5em;
                .van-button{
                    margin-top: 2em;
                    width: 100%;
                    border-radius: 10px;
                }
            }

            a{
                color: #2AD181;
                font-size: 14px;
                line-height: 35px;
            }
        }

        .statement{
            margin-top: 1em;
            text-align: center;
            a{
                color: #5A6E97;
                font-size: 15px;
            }
        }

        .copyright{
            position: fixed;
            bottom: 3em;
            padding: 0 25px;
            p{
                padding: 0 2em;
                color: #A89BB5;
                text-align: center;
                span{
                    margin-left: 6px;
                }
            }
        }
    }
</style>