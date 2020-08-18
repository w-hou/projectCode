<template>
    <div>
        <div class="addressNav">
            <span class="iconfont icon-zuo" @click="$router.go(-1)"></span>
            <h3>收货地址</h3>
        </div>

        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
        />
    </div>
</template>

<script>
    import { Toast } from 'vant';

    export default {
        data() {
            return {
                chosenAddressId: '1',
                list: [
                    // {
                    //     id: '1',
                    //     name: '小王',
                    //     tel: '13888888888',
                    //     address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                    //     isDefault: true,
                    // },
                    // {
                    //     id: '2',
                    //     name: '李四',
                    //     tel: '1310000000',
                    //     address: '浙江省杭州市拱墅区莫干山路 50 号',
                    // },
                ],
            };
        },
        methods: {
            onAdd() {
                // 跳转到新增地址
                this.$router.push("/newAddress");
            },
            onEdit(item) {
                // 传递参数跳转到修改地址
                this.$router.push({
                    path:"/editAddress", 
                    query: {
                        id: item.id,
                    },
                });
            },
            onSelect(item){
                // 调用vuex中的方法, 传递id
                this.$store.commit("address/editId",item.id);
                this.$router.go(-1);
                // console.log(item);
            },
        },
        created(){
            this.list = this.$store.state.address.lists || [];
            // 获取id值
            try {
                this.chosenAddressId = this.list.find(item => item.isDefault).id
            } catch (error) {
                Toast('没有地址数据');
            }
        },
    }
</script>

<style lang="less" scoped>
    .addressNav{
        position: relative;
        top: 0;
        left: 0;
        height: 45px;
        background-color: #fff;
        text-align: center;
        line-height: 45px;
        z-index: 99;
        .icon-zuo{
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            color: #F63434;
        }
        h3{
            font-size: 16px;
            font-weight: normal;
        }
    }
</style>