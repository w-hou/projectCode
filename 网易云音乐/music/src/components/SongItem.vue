<template>
  <li class="songItem" @click="play">
    <span class="order" v-if="options.order !== undefined">{{ options.order + 1 }}</span>
    <div class="main" :style="{ marginLeft: options.order !== undefined? '0' : '10px' }">
      <h4>
        {{ songItem.name }}
        <span>{{ songItem.song.alias[0] }}</span>
      </h4>
      <div class="info" v-if="options.info !== false">
        <i class="icon icon-quality"></i>
        <span class="artists">{{ joinArtists(songItem.song.artists) }} - {{ songItem.song.album.name }}</span>
      </div>
    </div>
    <img
      class="icon icon-play"
      style="background:none"
      v-if="currentSong && songItem.id === currentSong.id"
      src="../assets/playing.svg"
      alt
    />
    <i class="icon icon-play"></i>
  </li>
</template>

<script>
export default {
  name: "SongItem",
  props: {
    options: Object,
    songItem: Object,
    currentSong: Object
  },
  methods: {
    joinArtists(artists) {
      return artists.map(artist => artist.name).join(" / ");
    },
    play() {
      this.$emit("song-item", this.songItem);
    }
  }
};
</script>

<style lang="less" scoped>
.down {
  background-color: #ccc;
}
.up {
  background-color: #fcfcfc;
}
@color: #888;
.songItem {
  display: flex;
  padding: 5px 0px;
  border-bottom: 1px solid #f8f8f8;
  align-items: center;
  .order {
    width: 40px;
    text-align: center;
    color: @color;
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
        color: @color;
      }
    }
    .info {
      color: @color;
      font-size: 12px;
      line-height: 1.5em;
    }
  }
  .icon {
    display: inline-block;
    background-image: url("../assets/icon.png");
    background-size: 166px auto;
    &.icon-quality {
      width: 16px;
      height: 8px;
    }
    &.icon-play {
      width: 22px;
      height: 22px;
      margin: 0 10px;
      background-position: -24px 0;
    }
  }
}
</style>