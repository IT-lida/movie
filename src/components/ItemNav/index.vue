<template>
  <div class="cinema_menu">
    <div class="city_switch">
      选座购票 <i class="iconfont icon-lower-triangle"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ItemNav'
}
</script>
<style lang="scss" scoped>
.cinema_menu {
  display: flex;
  height: 45px;
  background-color: #E8E5E5;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;

  .city_switch {
    flex: 33%;
    font-size: 16px;
    text-align: center;
    line-height: 25px;
    border-right: 1px solid #ccc;
  }
}
</style>