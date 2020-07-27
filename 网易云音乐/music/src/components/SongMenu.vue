<template>
  <li class="songMenu">
    <span class="order"></span>
    <div class="main">
      <h4></h4>
      <span></span>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    songItem: Object
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

<style>
</style>