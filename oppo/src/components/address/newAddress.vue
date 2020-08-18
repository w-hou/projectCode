<template>
    <div>
        <div class="newAddressNav">
            <span class="iconfont icon-zuo" @click="$router.go(-1)"></span>
            <h3>新增地址</h3>
        </div>

        <van-address-edit
            :area-list="areaList"
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
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
            }
        },
        methods: {
            onSave({name, tel, province, city, county, areaCode, addressDetail}) {
                // 调用vuex方法
                this.$store.commit("address/add", {
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
        }
    }
</script>

<style lang="less" scoped>
    .newAddressNav{
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