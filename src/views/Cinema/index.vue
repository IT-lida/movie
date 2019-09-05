<template>
  <div class="cinema">
    <Header class="header" title="附近影院" />
    <div class="cinema-box">
      <div class='cinema-content'>
        <router-link tag="div" to="/movie/city" class="city-name">
          <span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <Input class="cinema-ipt" />
      </div>
      <div class="massage">
        <BScroll class="bscroll">
          <div>
            <NBanner :pics="pics" />
            <CinemaList class="cinemaList" />
          </div>
        </BScroll>
      </div>
    </div>
    <Footer />
    <keep-alive>
      <router-view name="seatSelection" />
    </keep-alive>
  </div>
</template>
<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Input from "@/components/Input"
import CinemaList from "@/components/CinemaList"
import BScroll from "@/components/BScroll"
import NBanner from '@/components/NBanner'

const publicPath = process.env.BASE_URL

export default {
  name: "Cinema",
  components: {
    Header,
    Footer,
    Input,
    NBanner,
    CinemaList,
    BScroll
  },
  data: () => ({
    index: 0,
    pics: [
      `${publicPath}images/movie_3.jpg`,
      `${publicPath}images/movie_4.jpg`
    ],
    navBarFixed: false,
    menuBarFixed: false,
    fullHeight: document.documentElement.clientHeight
  }),
  watch: {
    fullHeight(val) {
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        let that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    }
  },
  methods: {
    watchScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 10) {
        this.navBarFixed = true
      } else {
        this.navBarFixed = false
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.watchScroll)

    const that = this
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        that.fullHeight = window.fullHeight
      })()
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.watchScroll);
  }
}
</script>
<style lang="scss" scoped>
  .massage {
    position: fixed;
    top: 94px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow: hidden;
  }

  .cinema-content {
    display: flex;
    height: 45px;
    line-height: 45px;
    background-color: #E8E5E5;
    border-bottom: 1px solid #CCCCCC;

    .city-name {
      flex: 0 0 70px;
      color: #8E8E90;
      text-align: center;

    }

    .cinema-ipt {
      flex: 1;
    }
  }
</style>