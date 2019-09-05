<template>
  <div class="button-box">
    <div class="btn" :style="{backgroundColor:(title=='购票'?'#ED3434':'green')}">{{title}}</div>
  </div>
</template>

<script>
  export default {
    name: "Btn",
    props: ["title"]
  }
</script>

<style scoped>
.btn {
  width: 50px;
  height: 30px;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  border-radius: 4px;
}
</style>