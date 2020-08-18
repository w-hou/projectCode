<template>
    <div>
        <div class="content">
            <div class="left" ref="left">
                <ul>
                    <!-- <li v-for="(item, index) in left" :key="index" @click="leftItem(index)" ref="leftLis">
                        <h4 :class="{current: index == currentIndex}">{{ item }}</h4>
                    </li> -->
                    <li class="leftLis" v-for="(item, index) in left1" :key="index" @click="leftItem(index)" ref="leftLis">
                        <h4 :class="{ current: index == currentIndex }">{{ item }}</h4>
                    </li>

                </ul>
            </div>
            <div class="right" ref="right">
                <ul>
                    <li class="rightLis" v-for="(item, index) in right" :key="index" ref="rightLis">
                        <h2>{{ item.title }}</h2>
                        <!-- <h2>{{ item.name }}</h2> -->
                        <ul>
                            <li v-for="(i, index) in item.content" :key="index" class="phone-item">
                            <!-- <li v-for="(i, index) in item.productDetailss" :key="index" class="phone-item"> -->
                                <div class="phoneType">
                                    <img :src="i.img" alt="">
                                    <!-- <img :src="i.url" alt=""> -->
                                </div>
                                <div class="info">
                                    <h4>{{ i.name }}</h4>
                                    <p>{{ i.describe }}</p>
                                    <span>￥{{ i.price }}</span>
                                    <!-- <h4>{{ i.title }}</h4>
                                    <p>{{ i.secondTitle }}</p>
                                    <span>￥{{ i.price }}</span> -->
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core';

    export default {
        data(){
            return {
                // 记录高度
                listHeight: [],
                scrollY: 0,

            };
        },
        props: ["left", "right", "left1", "right1"],
        methods: {
            _initScroll(){
                // 左边联动效果
                this.lefts = new BScroll(this.$refs.left, {
                    // 拥有触发事件
                    click: true,
                    // 滚动位置探针效果
                    probeType: 3,
                });
                // 右边联动效果
                this.rights = new BScroll(this.$refs.right, {
                    // 滚动位置探针效果
                    probeType: 3,
                });

                // 获取滚动效果高度
                this.rights.on("scroll", this.onScrollfun);
            },
            onScrollfun(pos) {
                // console.log(pos.y);
                this.scrollY = Math.abs(Math.round(pos.y));
            },
            _getHeight() {

                // 获取每个对象
                // let rightItem = this.$refs.rightLis;
                // console.log(rightItem)
                setTimeout(() => {

                    let rightItem = this.$refs.right.getElementsByClassName("rightLis");
                    // console.log(rightItem, rightItem.length);

                    // 设置默认距离顶部高度
                    let height = 0;
                    this.listHeight.push(height);

                    // 循环对象获取各自到顶部的高度
                    for (let i = 0; i < rightItem.length; i++) {
                        // console.log(rightItem[i]);
                        // console.log(rightItem[i].clientHeight);

                        height += rightItem[i].clientHeight;
                        // console.log(height)
                        this.listHeight.push(height);
                    }
                    // console.log(this.listHeight)

                }, 200);

            },
            leftItem(index) {
                let rightItem = this.$refs.rightLis;
                // console.log(rightItem[index])

                // 通过下标获取相对的元素
                let el = rightItem[index];

                // 通过滚动事件指定目标元素
                this.rights.scrollToElement(el, 150);

            },

        },
        computed: {
            currentIndex() {
                // console.log(this.listHeight)
                for (let i = 0; i < this.listHeight.length; i++) {
                    // 获取两个相邻的距离顶部的高度
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];

                    // console.log(this.listHeight[i] + 1);
                    // console.log(height1);
                    // console.log(height2);
                    // console.log(this.scrollY)

                    // 判断高度之间为当前左选项变化
                    if(this.scrollY >= height1 && this.scrollY < height2){
                        // console.log(height1);
                        // console.log(height2);
                        // console.log(this.scrollY)
                        // 左边联动
                        // let leftItem = this.$refs.leftLis;
                        let leftItem = this.$refs.left.getElementsByClassName("leftLis");

                        // console.log("leftItem ==> ", leftItem);

                        this.lefts.scrollToElement(leftItem[i]);

                        return i;
                    }
                }
                // 如果没有高度值, 默认为0, 第一位
                return 0;
            }
        },
        mounted() {
            // 能在虚拟DOM执行完后，在回调方法
            this.$nextTick(() => {
                // 调用滚动效果
                this._initScroll();
                // 调用右边列表每一项距离顶部的距离
                this._getHeight();
            });
        },
        // 组件销毁前阻止滚动事件
        beforeDestroy(){
            this.rights.off("scroll", this.onScrollfun)
        },
    }
</script>

<style lang="less" scoped>
    .content {
        display: flex;
        position: absolute;
        top: 44px;
        bottom: 50px;
        width: 100%;
        overflow: hidden;
    
        .left {
            width: 30%;
            background-color: #fff;
            li{
                height: 43px;
                font-size: 14px;
                text-align: center;
                line-height: 43px;
                h4.current{
                    position: relative;
                    &::before{
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 0;
                        width: 3px;
                        height: 14px;
                        background-color: #F63434;
                        transform: translateY(-50%);
                    }
                }
            }
        }

        .right {
            // flex: 1;
            width: 70%;
            padding: 0 12px;
            background-color: #F7F8FA;
            h2{
                padding: 20px 0;
                color: #000;
                font-size: 14px;
                text-align: center;
            }
            li.phone-item {
                display: flex;
                margin-bottom: 10px;
                padding: 6px;
                background-color: #fff;
                border-radius: 10px;
                justify-content: space-between;
                .phoneType{
                    img{
                        width: 90px;
                    }
                }
                .info{
                    width: 60%;
                    padding-top: 18px;
                    h4{
                        color: #000;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    p{
                        color: #666;
                    }
                    span{
                        color: #F63434;
                    }
                }
            }
        }
    }
</style>