<template>
  <div class="filmDetail" v-if="trailer">
    <video :src="detail.vd" width="100%" height="100%" autoplay="autoplay"></video>
    <div class="img" @tap="hideTrailer">
      <img src="../../../public/images/back1.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'FilmDetails',
  props: ['detail','trailer'],
  data: () => ({
    // trailer:true
  }),
  methods: {
    hideTrailer() {
      this.$router.go(0)
      // this.$emit('hideTrailer',123)
    }
  }
}
</script>
<style lang="scss" scoped>
.filmDetail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background-color: #fff;
  z-index: 10001;

  .img {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 30px;
    height: 25px;
    background-color: rgba(216,216,216,.8);
    border-radius: 10px;

    img {
      width: 20px;
      height: 20px;
      margin: 2px 5px;
    }
  }
}
</style>