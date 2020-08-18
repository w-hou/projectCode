<template>
    <div>
        <div class="register">
            <div class="goBack">
                <span class="iconfont icon-zuo" @click="$router.go(-1)"></span>
            </div>
            <div class="box">
                <h2>注册账号</h2>
                <!-- 注册表单 -->

                <!-- <div class="forms">
                    <p><input type="text" placeholder="请输入账户名" v-model="username"></p>
                    <p><input type="password"  placeholder="请输入密码" v-model="password"></p>
                    <p><input type="password2"  placeholder="请确认密码" v-model="password"></p>
                </div>  -->
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
                    <van-field
                        v-model="password2"
                        type="password"
                        name="password2"
                        label="确认密码"
                        placeholder="请确认密码"
                        :rules="[{ required: true, message: '请填写确认密码' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button block type="primary"  native-type="submit">注册</van-button>
                    </div>
                </van-form>

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
                password2: null,
            }
        },
        methods: {
            onSubmit(params){
                this.$axios.get("register", {params}).then((res) => {
                    // 判断是否请求成功
                    // console.log(res);
                    if(res.data == "200"){
                        Toast.success({
                            message: '注册成功',
                            onOpened: () => {
                                this.$router.push('/succeed');
                            }
                        });
                    }else{
                        Toast.fail('注册失败');
                    }
                });
            }
        },
    }
</script>

<style lang="less" scoped>
    .register{
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
            text-align: center;

            h2{
                margin-top: 2em;
                color: #000;
                font-size: 24px;
                font-weight: normal;
            }

            // .forms{
            //     margin-top: 3em;
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
                margin-top: 3em;
                .van-button{
                    margin-top: 2em;
                    width: 100%;
                    border-radius: 10px;
                }
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