<template>
  <div id="app" :class="{active:currentSong}" @touchstart="touchstart" @touchend="touchend">
    <!-- 一级路由出口 -->
    <keep-alive>
      <router-view @song-item="currentSong = $event"></router-view>
    </keep-alive>

    <!-- 播放器组件 -->
    <PlayBar v-if="currentSong" :currentSong="currentSong" @song-item="currentSong = $event"></PlayBar>
  </div>
</template>

<script>
import PlayBar from "@/components/PlayBar.vue";

export default {
  data() {
    return {
      currentSong: null,
      touchstartX: 0
    };
  },
  components: {
    PlayBar
  },

  methods: {
    touchstart(event) {
      console.log("开始", event.changedTouches[0].clientX);
      this.touchstartX = event.changedTouches[0].clientX;
    },
    touchend(event) {
      console.log("结束", event.changedTouches[0].clientX);
      if (this.touchstartX - event.changedTouches[0].clientX > 100) {
        console.log("向左滑动, 前进");
        this.routerForward();
      }
      if (event.changedTouches[0].clientX - this.touchstartX > 100) {
        console.log("向右滑动, 后退");
        this.routerBack();
      }
    },
    routerForward() {
      this.$router.forward();
    },
    routerBack() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  &.active {
    padding-bottom: 55px;
  }
  .playbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 54px;
    background-color: #fff;
    border-top: 1px solid #eee;
  }
}
</style>
