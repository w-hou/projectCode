<template>
  <div class="nav-item">
    <div id="nav">
      <router-link to="/">
        <span>推荐歌曲</span>
      </router-link>
      <router-link to="/hot">
        <span>热歌榜</span>
      </router-link>
      <router-link to="/search">
        <span>搜索</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#nav {
  display: flex;
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  border-bottom: 1px solid #f6f6f6;
  background-color: #fff;
  // z-index: 1;
  a {
    flex: 1;
    padding: 10px 0;
    color: #333;
    font-size: 15px;
    text-align: center;
    text-decoration: none;
    &.router-link-exact-active {
      color: #d43c33;
      span {
        padding: 0 5px 10px;
        border-bottom: 2px solid #d43c33;
      }
    }
  }
}
</style>