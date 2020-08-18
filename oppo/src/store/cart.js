import { Toast } from 'vant';

export default {
    namespaced: true,//命名空间
    state: {
        // 商品数量
        num: null,
        // 购物车数据
        lists: [],
    },
    mutations: {
        add(state, obj) {
            Toast.success('加入购物车成功！');

            // 获取数据中id
            let index = state.lists.findIndex(val => val.id == obj.id);
            // console.log(index);

            if(index == "-1"){
                // 默认选中
                obj.isSelect = true;
                // 不存在, 添加数据
                state.lists.push(obj);
                state.num += 1;
            }else {
                // 存在, 商品数量加一
                state.lists[index].num += 1;
                // 修改数量
                // state.num = state.lists[index].num;
            }
        },
        edit(state, obj){
            Object.assign(state.lists, obj);
        },
        // 购买
        buy(state, obj){
            state.lists.push(obj);
        },
    },
    actions: {},
}