<template>
    <div>
        <div class="editAddressNav">
            <span class="iconfont icon-zuo" @click="$router.go(-1)"></span>
            <h3>编辑地址</h3>
        </div>

        <van-address-edit
            :area-list="areaList"
            show-search-result
            show-delete
            :address-info="addressInfo"
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
        />
    </div>
</template>

<script>
    // 引入地址数据信息
    import areaList from "../../assets/js/address.js";

    export default {
        data(){
            return{
                areaList,
                searchResult: [],
                addressInfo: null,
            }
        },
        methods: {
            onSave({name, tel, province, city,county, areaCode, addressDetail}) {
                // 获取id
                let id = this.$route.query.id;
                // 调用vuex方法
                this.$store.commit("address/edit", {
                    id,
                    name,
                    tel,
                    address: province + city + county + addressDetail,
                    province,
                    city,
                    county,
                    areaCode,
                    addressDetail,
                });

                this.$router.go(-1);
            },
            // 删除
            onDelete(){
                // 获取id
                let id = this.$route.query.id;
                this.$store.commit("address/del", id);
                this.$router.go(-1);
            }
        },
        created(){
            // 回去传过来的id
            let id = this.$route.query.id;

            this.addressInfo = this.$store.state.address.lists.find(item => item.id == id); 
        },
    }
</script>

<style lang="less" scoped>
    .editAddressNav{
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