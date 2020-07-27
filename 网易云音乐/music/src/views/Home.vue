<template>
  <div class="home">
    <div v-if="loading" class="loading">
      <img src="../assets/loading.svg" alt />
    </div>

    <HomeLink></HomeLink>

    <div class="songList">
      <HomeTitle>推荐歌单</HomeTitle>

      <ul class="listCard">
        <!-- <SongListCard v-for="(item, index) in songlist" :key="index" :item="item"></SongListCard> -->
        <SongListCard v-for="(item, index) in randomSongList()" :key="index" :item="item"></SongListCard>
      </ul>
    </div>
    <div class="newSong">
      <HomeTitle>最新音乐</HomeTitle>

      <ul>
        <SongItem
          v-for="(item, index) in newsong"
          :key="index"
          :songItem="item"
          @song-item="$emit('song-item', $event)" :options="{info: true}"
          :currentSong="currentSong"
        ></SongItem>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeTitle from "@/components/HomeTitle.vue";
import SongListCard from "@/components/SongListCard.vue";
import HomeLink from "@/components/HomeLink.vue";
import SongItem from "@/components/SongItem.vue";

export default {
  name: "Home",
  data() {
    return {
      songlists: [],
      newsong: [],
      loading: false
    };
  },
  props: {
    currentSong: Object
  },
  components: {
    HomeTitle,
    SongListCard,
    HomeLink,
    SongItem
  },
  methods: {
    getSongList() {
      this.axios
        .get("/personalized")
        .then(response => {
          // console.log(response.data.result);
          this.songlists = response.data.result;

          window.localStorage.setItem(
            "songlist",
            JSON.stringify({
              expire: Date.now() + 1 * 60 * 60 * 1000,
              result: response.data.result
            })
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getNewSong() {
      this.axios
        .get("/personalized/newsong")
        .then(response => {
          console.log(response.data.result);
          this.newsong = response.data.result;

          window.localStorage.setItem(
            "newsong",
            JSON.stringify({
              expire: Date.now() + 1 * 60 * 60 * 1000,
              result: response.data.result
            })
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 六个歌单
    randomSongList() {
      // var arr = [...this.songlists];
      // console.log(arr);
      // var newArr = [];
      // for (let i = 0; i < 6; i++) {
      //   var r = Math.floor(Math.random() * arr.length);
      //   newArr.push(...arr.splice(r, 1));
      // }
      // console.log(newArr);
      // return newArr;
      return [...this.songlists].slice(0, 6);
    }
  },
  created() {
    let localCacheSongLists = JSON.parse(
      window.localStorage.getItem("songlist")
    );
    // console.log(localCacheSongLists);
    if (localCacheSongLists && localCacheSongLists.expire > Date.now()) {
      // console.log(this.songlists);
      this.songlists = localCacheSongLists.result;
    } else {
      this.getSongList();
    }

    let localCacheNewSong = JSON.parse(window.localStorage.getItem("newsong"));
    // console.log(localCacheNewSong);
    if (localCacheNewSong) {
      if (localCacheNewSong.expire > Date.now()) {
        // console.log(this.newsong);
        this.newsong = localCacheNewSong.result;
      }
    } else {
      this.getNewSong();
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loading = false;
    });
  },
  beforeRouteLeave(to, from, next) {
    // console.log("即将离开");
    this.loading = true;
    next();
  }
};
</script>
<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.listCard {
  display: flex;
  flex-wrap: wrap;
}
.home {
  position: relative;
  .loading {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9;
    justify-content: center;
    align-items: center;
  }
}
</style>

