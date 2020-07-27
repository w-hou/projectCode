<template>
  <li class="card" @click="songListDetails(item.id)">
    <div class="thumb">
      <img :src="item.picUrl" alt />
      <span>
        <i class="fa fa-headphones"></i>
        {{ playCountParse(item.playCount) }}
      </span>
    </div>
    <p>{{ item.name }}</p>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      // 默认值
      default: () => {
        return {
          alg: "featured",
          canDislike: false,
          copywriter: "编辑推荐：恭喜华晨宇成为《歌手·当打之年》歌王！",
          highQuality: false,
          id: 3233380300,
          name: "歌手·当打之年现场及原曲合集",
          picUrl:
            "https://p2.music.126.net/GMy_E4iX4_IVWGHMw5bwZw==/109951164685568806.jpg",
          playCount: 74929832,
          trackCount: 197,
          trackNumberUpdateTime: 1587740280952,
          type: 0
        };
      }
    }
  },
  methods: {
    playCountParse(n) {
      // console.log(n);
      if (n > 10000) return (n / 10000).toFixed(1) + "万";
      if (n > 100000000) return (n / 100000000).toFixed(1) + "亿";
    },
    // 歌单详情页
    songListDetails(id) {
      this.$router.push({ path: "playlist", query: { id: id } });
    }
  }
};
</script>
<style lang="less" scoped>
.card {
  margin-bottom: 10px;
  flex-basis: 30%;
  flex-grow: 1;
  &:nth-child(3n + 2) {
    margin: 0 4px;
  }
  .thumb {
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    span {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      font-size: 12px;
    }
  }
  p {
    height: 32px;
    margin: 5px;
    font-size: 14px;
    line-height: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>