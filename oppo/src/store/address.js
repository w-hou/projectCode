export default {
    // 命名空间
    namespaced: true,

    state: {
        lists: [
            {
                id: '1',
                name: '小王',
                tel: '13888888888',
                address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                isDefault: true,
                province: "浙江省",
                city: "杭州市",
                county: "西湖区",
                areaCode: "330106",
                addressDetail: "文三路 138 号东方通信大厦 7 楼 501 室",
            }
        ],
    },
    mutations: {
        // 添加地址
        add(state, obj) {
            // console.log(state, obj);
            state.lists.forEach((item) => {
                item.isDefault = false;
            });

            // 默认地址
            obj.isDefault = true;
            obj.id = state.lists.length + 1;
            state.lists.push(obj);
        },
        // 修改默认
        editId(state, id) {
            state.lists.forEach((item) => {
                
                item.isDefault = item.id == id ? true : false;
            })
        },
        // 修改地址
        edit(state, obj) {
            // 再到当前id所存在的数据下标
            let index = state.lists.findIndex(item => item.id == obj.id);

            Object.assign(state.lists[index], obj);
        },
        // 删除
        del(state, id) {
            let index = state.lists.findIndex(item => item.id == id);

            state.lists.splice(index, 1);
        }
    },
    actions: {},
}