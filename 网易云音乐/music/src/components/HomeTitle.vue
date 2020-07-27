<template>
  <div class="title">
    <h4>
      <slot></slot>
    </h4>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
h4 {
  margin: 18px 0;
  padding-left: 10px;
  border-left: 2px solid #d43c33;
  font-size: 18px;
  font-weight: normal;
}
</style>