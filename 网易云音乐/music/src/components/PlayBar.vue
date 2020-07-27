<template>
  <div class="playbar">
    <div class="player" @click="showplayPage = true">
      <img :class="{active: playing}" :src="currentSong.picUrl" alt />
      <div class="info">
        <h5>
          {{ currentSong.name }}
          <span>{{ currentSong.song.alias[0] }}</span>
        </h5>
        <span class="author">{{ joinArtists(currentSong.song.artists) }}</span>
      </div>
      
      <div class="play" @click.stop="playing = !playing">
        <canvas id="canvas" width="30" height="30"></canvas>
        <i class="fa fa-pause" v-if="playing"></i>
        <i class="fa fa-play" v-else></i>
      </div>
      <div class="playlist" @click.stop="displayPlayList = !displayPlayList">
        <i class="fa fa-list-ul"></i>
      </div>
    </div>

    <!-- 播放列表 -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animated slideInUp"
      leave-active-class="animated fadeOut"
    >
      <ul class="defaultPlayList" v-if="displayPlayList">
        <SongItem
          v-for="(item, index) in defaultPlayList"
          :key="index"
          :songItem="item"
          :options="{order: index, info: true}"
          :currentSong="currentSong"
          @song-item="$emit('song-item', $event)"
        ></SongItem>
      </ul>
    </transition>

    <!-- 播放页 -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="playPage" v-show="showplayPage">
        <div class="mark" :style="{backgroundImage: `url(${currentSong.picUrl})`}"></div>
        <div class="header">
          <i class="fa fa-arrow-left" @click="showplayPage = false"></i>
          <div class="songName">
            <h5>{{ currentSong.name }}</h5>
            <span>{{ joinArtists(currentSong.song.artists) }}</span>
          </div>
        </div>

        <div class="circle" :class="{active: playing}" v-show="show" @click="show = false">
          <div class="needle"></div>
          <div class="glue">
            <img :src="currentSong.picUrl" alt />
          </div>
        </div>
        <div class="lyrics" v-show="!show" @click="show = true">
          <ul class="scroll" :style="{ transform: `translateY(${-currentLyricsIndex * 35}px)` }">
            <li
              v-for="(item, index) in parsedLyrics"
              :key="index"
              :class="{active: index === currentLyricsIndex}"
            >{{item.text}}</li>
          </ul>
        </div>

        <div class="footer"></div>
      </div>
    </transition>

    <audio :src="songUrl" controls autoplay></audio>
  </div>
</template>

<script>
import SongItem from "@/components/SongItem";

export default {
  data() {
    return {
      playing: false,
      showplayPage: false,
      show: true,
      currentLyrics: null,
      currentLyricsIndex: 0,
      displayPlayList: false,
      defaultPlayList: [this.currentSong]
    };
  },
  components: {
    SongItem
  },
  props: {
    currentSong: Object
  },
  methods: {
    joinArtists(artists) {
      return artists.map(artist => artist.name).join(" / ");
    },
    drawProgess() {
      var canvas = this.$el.querySelector("#canvas");
      // console.log(canvas);
      var audio = this.$el.querySelector("audio");
      // console.log(audio);
      // 歌曲时长
      var duration = this.currentSong.song.duration;
      //   console.log(duration);

      audio.ontimeupdate = () => {
        // console.log(duration, (this.currentTime * 1000) / duration);
        var context = canvas.getContext("2d");

        context.beginPath();
        context.arc(15, 15, 14, 0, Math.PI * 2);
        context.closePath();
        context.strokeStyle = "#ccc";
        context.lineWidth = "1";
        context.stroke();

        context.beginPath();
        context.arc(
          15,
          15,
          14,
          -0.5 * Math.PI,
          -0.5 * Math.PI + 2 * Math.PI * ((audio.currentTime * 1000) / duration)
        );
        context.strokeStyle = "#d43c33";
        context.lineWidth = "1";
        context.stroke();

        // 滚动歌词
        let index;
        for (let i = 0; i < this.parsedLyrics.length; i++) {
          if (audio.currentTime + 0.3 < this.parsedLyrics[i].time) {
            index = i - 1;
            break;
          }
        }
        if (index === undefined) {
          index = this.parsedLyrics.length - 1;
        }
        this.currentLyricsIndex = index;
      };
    },
    // 获取歌词
    getlyrics() {
      var cachedLyric = window.localStorage.getItem(
        "lyric" + this.currentSong.id
      );
      // console.log(cachedLyric);
      if (cachedLyric) {
        this.currentLyrics = cachedLyric;
      } else {
        window.axios
          .get("lyric", {
            params: {
              id: this.currentSong.id
            }
          })
          .then(response => {
            this.currentLyrics = response.data.lrc.lyric;

            window.localStorage.setItem(
              "lyric" + this.currentSong.id,
              response.data.lrc.lyric
            );
          });
      }
    }
  },
  computed: {
    songUrl() {
      if (this.currentSong) {
        return `https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`;
      } else {
        return "";
      }
    },
    // 处理歌词
    parsedLyrics() {
      if (this.currentLyrics) {
        return this.currentLyrics.split("\n").map(item => {
          // console.log(item);
          var regex = /\d{2}:\d{2}\.\d+/i;
          if (item.search(regex) !== -1) {
            var time = item.match(regex)[0];
            var m = time.substr(0, 2);
            var s = time.substr(3, 2);
            var n = time.substr(5);
            return {
              time: Number(m) * 60 + Number(s) + Number(n),
              text: item.substr(11) || "------"
            };
          } else {
            return {};
          }
        });
      } else {
        return null;
      }
    }
  },
  created() {
    this.getlyrics();
  },
  mounted() {
    this.drawProgess();

    var audio = this.$el.querySelector("audio");
    audio.onplay = () => {
      this.playing = true;
    };
    audio.onpause = () => {
      this.playing = false;
    };
  },
  watch: {
    playing(value) {
      var audio = this.$el.querySelector("audio");

      if (value) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    currentSong(value) {
      this.getlyrics();

      // 添加到播放列表, 去重
      let isExist = this.defaultPlayList.some(item => {
        return item.id == value.id;
      });
      if (!isExist) {
        this.defaultPlayList.unshift(value);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.wh() {
  width: 30px;
  height: 30px;
}
.player {
  display: flex;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    animation: rotate 5s linear infinite paused;
    &.active {
      animation-play-state: running;
    }
  }
  .info {
    width: 0;
    flex: 1;
    padding: 0 8px;
    h5 {
      margin: 0;
      font-size: 15px;
      font-weight: normal;
      letter-spacing: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        color: #999;
      }
    }
    .author {
      color: #999;
      font-size: 12px;
    }
  }
  .play {
    .wh;
    position: relative;
    margin: 4px;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -7px;
      color: #ccc;
      font-size: 14px;
      line-height: 1em;
      transform: translateX(-50%);
      &.fa-play {
        transform: translateX(-36%);
      }
    }
  }
  .playlist {
    .wh;
    margin: 4px;
    color: #999;
    font-size: 28px;
    text-align: center;
    line-height: 30px;
  }
}

// 播放列表
.defaultPlayList {
  position: fixed;
  bottom: 8%;
  left: 5%;
  width: 90%;
  height: 50vh;
  margin: 0;
  padding: 0;
  list-style-type: none;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 10px 2px #999;
  overflow: hidden;
  overflow-y: auto;
}

// 播放页
.playPage {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  z-index: 99;
  .mark {
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(25px) brightness(0.5);
    transform: scale(2);
    background-color: rgba(0, 0, 0, 0.5);
    background-position: center;
    background-size: cover;
    z-index: -1;
  }
  .header {
    display: flex;
    height: 35px;
    padding: 5px 0;
    i {
      width: 40px;
      color: #fff;
      font-size: 20px;
      line-height: 32px;
      text-align: center;
    }
    .songName {
      h5 {
        margin: 0;
        font-size: 14px;
        color: #fff;
        font-weight: normal;
        letter-spacing: 1px;
      }
      span {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .circle {
    position: relative;
    text-align: center;
    flex: 1;
    .needle {
      position: absolute;
      top: 0;
      left: 50%;
      width: 96px;
      height: 137px;
      margin-left: -20px;
      background: url("../assets/needle.png") no-repeat 0 0 / cover;
      transform: rotate(-20deg);
      transform-origin: 20px 0;
      transition: 0.5s;
      z-index: 9;
    }
    .glue {
      display: inline-block;
      width: 180px;
      height: 180px;
      margin-top: 75px;
      padding: 50px;
      background-image: url("../assets/disc_light-ip6.png"),
        url("../assets/disc-ip6.png");
      background-size: cover;
      border-radius: 50%;
      animation: rotate 5s linear infinite paused;
      img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    &.active {
      .needle {
        transform: rotate(0deg);
      }
      .glue {
        animation-play-state: running;
      }
    }
  }
  .lyrics {
    position: relative;
    margin: 10px 0;
    text-align: center;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    .scroll {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      margin: -17px 0 0;
      padding: 0;
      list-style-type: none;
      transition: all 1s;
      li {
        color: #999;
        font-size: 14px;
        line-height: 2.5em;
        &.active {
          color: #fff;
          transform: scale(1.2);
        }
      }
    }
  }
  .footer {
    height: 100px;
  }
}
.animated {
  animation-duration: 0.5s;
}
</style>