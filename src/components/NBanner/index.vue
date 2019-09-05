<template>
  <div class="slider-banner">
    <div class="banner" ref="slider">
      <img v-for="(pic,index) in pics" :src="pic" alt="index">
      <img :src="pics[0]" alt="0">
    </div>
  </div>
</template>
<script>
export default {
  name: 'NBanner',
  props: {
    pics: {
      type: Array,
      required: true
    },
    picWidth: {
      type: Number,
      default: 375
    }
  },
  data: () => ({
    index: 0,
    timer: null
  }),
  methods: {
    nextPic() {
      this.index++
      let offsetX = -(100 * this.index)
      this.$refs.slider.style.transition = 'all .8s linear'
      this.$refs.slider.style.marginLeft = `${offsetX}%`
    },
    resetPic() {
      if (this.index >= this.pics.length) {
        this.index = 0
        let offsetX = -(100 * this.index)
        this.$refs.slider.style.transition = 'none'
        this.$refs.slider.style.marginLeft = `${offsetX}%`
      }
    }
  },
  mounted() { //生命周期 ，页面加载完成之后开始执行
    this.timer = setInterval(this.nextPic, 3000)
    this.$refs.slider.addEventListener('transitionend', this.resetPic)
  }
}
</script>
<style scoped>
.slider-banner {
  width: 100%;
  height: 100px;
  overflow: hidden;
}
.banner {
  width: 1000%;
}
.banner::after {
  display: block;
  clear: both;
  content: "";
}
.banner img {
  width: 10%;
  float: left;
}
</style>