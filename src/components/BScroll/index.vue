<template>
  <div class="bScroll" ref="bScroll">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  name: 'BScroll',
  props: {
    renewStrat: {
      type: Function,
      default: function() {}
    },
    renewEnd: {
      type: Function,
      default: function() {}
    }
  },
  mounted() {
      var Scroll = new BScroll(this.$refs.bScroll, {
        tap: true,
        probeType: 1
      })

      this.scroll = Scroll

      Scroll.on('scroll',(pos) => {
        this.renewStrat(pos)
      })
      Scroll.on('touchEnd',(pos) => {
        this.renewEnd(pos)
      })
  },
  methods: {
    toFindCity(y) {
      this.scroll.scrollTo(0,y)
    }
  }
}
</script>
<style scoped>
.bScroll {
  height: 100%;
}
</style>