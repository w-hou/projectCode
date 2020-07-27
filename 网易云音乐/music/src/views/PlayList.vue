<template>
  <div class="playList">
    <!-- {{ $route.query.id }} -->
    <template v-if="songListDetail">
      <div class="header">
        <div class="mask" :style="{ backgroundImage: `url(${songListDetail.coverImgUrl})` }"></div>
        <div class="fl">
          <img :src="songListDetail.coverImgUrl" alt />
          <span class="playcount">
            <i class="fa fa-headphones"></i>
            {{ playCountParse(songListDetail.playCount) }}
          </span>
          <span class="icon">歌单</span>
        </div>
        <div class="fr">
          <h3>{{ songListDetail.name }}</h3>
          <img :src="songListDetail.creator.avatarUrl" alt />
          <span>{{ songListDetail.creator.nickname }}</span>
        </div>
      </div>

      <div class="info">
        <div class="tags">
          <span>标签：</span>
          <i v-for="(tag, index) in songListDetail.tags" :key="index">{{tag}}</i>
        </div>
        <div class="desc" :class="{show: showMoreDesc}">
          <span>简介：</span>
          <span>{{ songListDetail.description }}</span>
        </div>
        <div class="more" @click="showMoreDesc = !showMoreDesc">
          <i v-if="showMoreDesc" class="fa fa-angle-up"></i>
          <i v-else class="fa fa-angle-down"></i>
        </div>
      </div>

      <div class="musicList">
        <h5 class="title">歌曲列表</h5>
        <ul>
          <li class="songMenu" v-for="(item, index) in songListDetail.tracks" :key="index" @click="$emit('song-item', songListDetail)">
            <span class="order">{{ index + 1 }}</span>
            <div class="main">
              <h4>
                {{ item.name }}
                <span>{{ item.alia[0] }}</span>
              </h4>
              <div class="author">{{ joinArtists(item.ar) }} - {{ item.al.name }}</div>
            </div>
            <i class="icon"></i>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
// import SongMenu from "@/components/SongMenu.vue";

export default {
  name: "PlayList",
  data() {
    return {
      songListId: this.$route.query.id,
      songListDetail: null,
      showMoreDesc: false,
    };
  },
  components: {
    // SongMenu
  },

  methods: {
    // getSongListDetail() {
    //   this.axios
    //     .get("/playlist/detail", {
    //       params: {
    //         id: this.$route.query.id
    //       }
    //     })
    //     .then(response => {
    //       // console.log(response.data.playlist);
    //       this.songListDetail = response.data.playlist;

    //       window.localStorage.setItem(
    //         "sl-" + this.$route.query.id,
    //         JSON.stringify({
    //           expire: Date.now() + 1 * 60 * 60 * 1000,
    //           result: response.data.playlist
    //         })
    //       );
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },

    playCountParse: function(n) {
      if (n > 100000000) return (n / 100000000).toFixed(1) + "亿";
      if (n > 10000) return (n / 10000).toFixed(1) + "万";
    },
    joinArtists(artists) {
      return artists.map(artist => artist.name).join(" / ");
    }
  },
  //   // 第一次进入
  //   created() {
  //     // this.getSongListDetail();
  //     let cacheSongListDetail = JSON.parse(
  //       window.localStorage.getItem("sl-" + this.songListId)
  //     );
  //     // console.log(cacheSongListDetail);
  //     if (cacheSongListDetail && cacheSongListDetail.expire > Date.now()) {
  //       this.songListDetail = cacheSongListDetail.result;
  //     } else {
  //       this.getSongListDetail();
  //     }
  //   },

  beforeRouteEnter(to, from, next) {
    // 可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
    // console.log(this)
    // 本地存储
    let cacheSongListDetail = JSON.parse(
      window.localStorage.getItem("sl-" + to.query.id)
    );
    if (cacheSongListDetail && cacheSongListDetail.expire > Date.now()) {
      // 守卫回调
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm.songListId = Number(to.query.id);
        vm.songListDetail = cacheSongListDetail.playlist;
      });
    } else {
      // 已经过期
      window.axios
        .get("/playlist/detail", {
          params: {
            id: to.query.id
          }
        })
        .then(response => {
          // 如果数据正确

          let playlist = response.data.playlist;
          // console.log(playlist);

          // 获取到的数据放入本地存储
          window.localStorage.setItem(
            "sl-" + to.query.id,
            // 过期时间1小时
            JSON.stringify({
              expire: Date.now() + 1 * 60 * 60 * 1000,
              playlist: response.data.playlist
            })
          );

          // 守卫回调
          next(vm => {
            // 通过 `vm` 访问组件实例
            vm.songListId = Number(to.query.id);
            vm.songListDetail = playlist;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
img {
  max-width: 100%;
}
.header {
  display: flex;
  padding: 30px 15px;
  position: relative;
  overflow: hidden;
  color: white;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(30px) brightness(0.8);
    transform: scale(1.5);
    background-position: center;
  }
  .fl {
    flex: 4;
    position: relative;
    font-size: 12px;
    line-height: 18px;
    .xxx() {
      position: absolute;
      left: 0;
      top: 0;
    }
    .playcount {
      .xxx();
      width: 100%;
      text-align: right;
      background: rgba(0, 0, 0, 0.1);
    }
    .icon {
      .xxx();
      top: 15px;
      background: #bb3b3f;
      padding: 0 10px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
  .fr {
    flex: 6;
    padding-left: 15px;
    h3 {
      margin: 0;
      padding: 5px 0 20px 0;
      font-weight: normal;
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
    span {
      font-size: 14px;
      padding-left: 15px;
    }
  }
}

.info {
  padding: 0 10px;
  line-height: 1.5em;
  font-size: 14px;
  .tags {
    margin: 10px 0;
    span {
      vertical-align: middle;
    }
    i {
      font-size: 12px;
      margin-right: 5px;
      font-style: normal;
      border: 1px solid lightgray;
      border-radius: 12px;
      padding: 2px 5px;
    }
  }
  .desc {
    height: 4.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    // background: red;
    &.show {
      height: auto;
    }
    span {
      white-space: pre-wrap;

      vertical-align: baseline;
    }
  }
  .more {
    overflow: hidden;
    i {
      float: right;
      font-size: 16px;
    }
  }
}

.musicList {
  .title {
    height: 24px;
    margin: 0;
    padding: 0 10px;
    color: #666;
    background-color: #eeeef0;
    font-weight: normal;
    line-height: 24px;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    .songMenu {
      display: flex;
      padding: 5px 0px;
      border-bottom: 1px solid #f8f8f8;
      align-items: center;
      .order {
        width: 40px;
        text-align: center;
        color: #888;
      }
      .main {
        width: 0;
        flex: 1;
        h4 {
          margin: 0;
          font-size: 17px;
          font-weight: normal;
          line-height: 1.5em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            color: #888;
          }
        }
        .author {
          color: #888;
          font-size: 12px;
          line-height: 1.5em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .icon {
        display: inline-block;
        width: 22px;
        height: 22px;
        margin: 0 10px;
        background-image: url("../assets/icon.png");
        background-size: 166px auto;
        background-position: -24px 0;
      }
    }
  }
}
</style>