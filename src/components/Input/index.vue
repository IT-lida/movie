<template>
  <div class="input">
    <i class="iconfont icon-sousuo"></i>
    <input class="inp" type="text" placeholder="找影院">
  </div>
</template>
<script>
export default {
  name:"Input"
}
</script>
<style lang="scss" scoped>
.input {
  position: relative;
  vertical-align: middle;

  .iconfont {
    position: absolute;
    font-size: 24px;
    color: #999;
    left: 0;
    top: 12px;
  }

  .inp {
    width: 85%;
    height: 25px;
    font-size: 16px;
    padding: 0 10px 0 25px;
    vertical-align: middle;
    border: 1px solid #999;
    border-radius: 5px;

    &:focus {
      outline: none;
    }
  }

}
</style>