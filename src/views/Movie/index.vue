<template>
  <div class="movie">
    <Header title="琛趣电影">
      <img class="logo" src="../../../public/images/logo.png" alt="">
    </Header>
    <div class="movie-menu">
      <router-link tag="div" to="/movie/city" class="city-name">
        <span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
      </router-link>
      <div class="hot-swtich">
        <router-link tag="div" to="/movie/nowPlaying" class="hot-item">正在热映</router-link>
        <router-link tag="div" to="/movie/comingSoon" class="hot-item">即将上映</router-link>
      </div>
      <router-link tag="div" to="/movie/search" class="search-entry">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="cover" v-if='show'></div>
    <Footer />
    <router-view name="buyTicket" />
  </div>
</template>
<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { messageBox } from '@/components/JS'

export default {
  name: "Movie",
  data: () => ({
    show: false
  }),
  components: {
    Header,
    Footer
  },
  mounted() {

    setTimeout(() => {
      this.axios.get('/api/getLocation').then(res => {
        let msg = res.data.msg
        if (msg === 'ok') {
          var nm = res.data.data.nm
          var id = res.data.data.id

          if (this.$store.state.city.id == id) {
            return
          }
          this.show = true
          messageBox({
            title: nm,
            content: '确定切换到当前定位城市吗？',
            cancel: '取消',
            sure: '切换城市',
            cancelChange() {
              this.show = false
            },
            sureChange() {
              window.localStorage.setItem('cityName', nm)
              window.localStorage.setItem('cityId', id)
              window.location.reload()
              this.show = false
            }
          })
        }
      })
    }, 3000)
  }
}
</script>
<style lang="scss" scoped>
.logo {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 10px 0 10px 10px;
  background-color: #DEDEDE;
  border-radius: 4px;
}

  .movie-menu {
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 10;

    .router-link-active {
      color: red;
      border-bottom: 2px solid red;
    }

    .city-name {
      padding: 0 15px;
      height: 100%;
      line-height: 45px;
      color: #8E8E90;
    }
    .hot-swtich {
      display: flex;
      height: 100%;
      line-height: 45px;

      .router-link-active {
        color: red;
        border-bottom: 2px solid red;
      }
    }
    .hot-item {
      font-size: 15px;
      color: #666;
      width: 80px;
      text-align: center;
      margin: 0 12px;
      font-weight: 700;
    }
    .search-entry {
      padding: 0 10px;
      height: 100%;
      line-height: 45px;
      border-left: 1px solid rgba(255, 141, 141, .3);

      i {
        font-size: 24px;
        color: red;
      }
    }
  }
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(144, 147, 147, .6);
    z-index: 99;
  }
</style>