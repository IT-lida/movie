<template>
  <div class="messageBox">
    <h2>定位当前城市为：<span>{{title}}</span></h2>
    <p>{{content}}</p>
    <div class="btn">
      <div @touchstart="cancelChange">{{cancel}}</div>
      <div class="sureChange" @touchstart="sureChange">{{sure}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MessageBox'
  }
</script>

<style lang="scss" scoped>
  .messageBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 80%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 1px #ccc;
    background-color: #fff;
    z-index: 100;

    h2 {
      text-align: center;
      font-size: 20px;
      color: #666;

      span {
        color: orange;
      }
    }

    p {
        margin: 25px 0;
        text-align: center;
        color: #666;
      }

    .btn {
      display: flex;
      width: 100%;
      text-align: center;
      border-top: 2px solid #B2B2B2;

      div {
        flex: 1;
        font-size: 20px;
        margin-top: 5px;
        padding: 5px;
        color: #555;

        &.sureChange {
          border-left: 2px solid #B2B2B2;
          color: orange;
        }
      }
    }
  }
</style>