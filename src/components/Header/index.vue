<template>
  <header class="header">
    <slot></slot>
    <h1>{{title}}</h1>
  </header>
</template>
<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: '琛趣电影'
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  color: #fff;
  background: #2F3336;
  border-bottom: 1px solid #2F3336;

  h1 {
    display: inline-block;
    font-size: 16px;
    text-align: left;
    vertical-align: top;
    line-height: 50px;
    padding: 0 10px;
    font-weight: 500;
  }
}

</style>