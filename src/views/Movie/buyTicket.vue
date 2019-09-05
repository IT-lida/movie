<template>
  <div class="buyTicket">
    <Header :title="detail.nm">
      <i class="iconfont icon-right" @click="backHome"></i>
    </Header>
    <Loading v-if="loading" />
    <BScroll class="bscroll" v-else>
      <div>
        <div class="movie-detail">
          <img class="movie-detail-bg" v-if="detail.img" :src="detail.img | setWh('106.148')">
          <div class="movie-detail-filter"></div>
          <div class="movie-detail-content">
            <div class="movie-detail-img">
              <img v-if="detail.img" :src="detail.img | setWh('106.148')">
              <div class="icon icon-uniE900" @tap="showTrailer" @hideTrailer="trailerHide"></div>
            </div>
            <div class="movie-detail-info">
              <h2>{{detail.nm}}</h2>
              <p class="enm">{{detail.enm}}</p>
              <p>豆瓣评分：<span>{{detail.sc}}</span></p>
              <p>{{detail.cat}}</p>
              <p>{{detail.fra}} / {{detail.dur}}分钟</p>
              <p>{{detail.pubDesc}}</p>
            </div>
          </div>
          <FilmDetails :detail="detail" :trailer="trailer" v-if="trailer"/>
        </div>
        <div class="itemNav">特惠购票</div>
        <CinemaList />
      </div>
    </BScroll>
  </div>
</template>
<script>
import Header from '@/components/Header'
import CinemaList from '@/components/CinemaList'
import Loading from '@/components/Loading'
import FilmDetails from '@/components/FilmDetails'

export default {
  name: 'buyTicket',
  props: ['movieId'],
  data: () => ({
    detail: {},
    loading: true,
    trailer: false
  }),
  components: {
    Header,
    CinemaList,
    Loading,
    FilmDetails
  },
  methods: {
    backHome() {
      this.$router.back()
    },
    showTrailer() {
      this.trailer = true
    },
    trailerHide(data) {
      console.log(data)
      this.trailer = false
    }
  },
  mounted() {
    console.log(this.trailer)
    this.axios.get('/api/detailmovie?movieId=' + this.movieId).then(res => {
      let msg = res.data.msg
      if (msg === 'ok') {
        this.detail = res.data.data.detailMovie
        this.loading = false
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  .buyTicket {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    z-index: 10000;

    .icon-right {
      line-height: 50px;
      padding-left: 5px;
      font-size: 20px;
    }

    .movie-detail {
      height: 200px;
      width: 100%;
      position: relative;
      overflow: hidden;

      .movie-detail-bg {
        width: 200%;
        height: 200%;
        transform: translateX(-10%) translateY(-10%);
        filter: blur(20px);
        background-size: cover;
        position: absolute;
        left: 0;
        top: 0;
      }

      .movie-detail-filter {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #40454d;
        opacity: .55;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
      }

      .movie-detail-content {
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
      }

      .movie-detail-img {
        position: relative;
        width: 108px;
        height: 150px;
        border: solid 1px #f0f2f3;
        border-radius: 2px;
        margin: 20px;

        img {
          width: 100%;
          height: 100%;
        }

        .icon-uniE900 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          font-size: 32px;
          text-align: right;
          line-height: 40px;
          width: 40px;
          height: 40px;
          border: 1px solid #999;
          border-radius: 50%;
          background-color: rgba(0,0,0,.5);
        }
      }
      .movie-detail-info {
        margin-top: 20px;

        h2 {
          font-size: 20px;
          color: white;
          font-weight: normal;
        }

        p {
          width: 85%;
          color: white;
          padding-top: 10px;
          font-size: 14px;
          color: #ccc;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;

          span {
            color: orange;
          }

        }

        .enm {
          font-size: 12px;
          padding-top: 7px;
          margin-bottom: 15px;
        }
      }
    }
  }

  .bscroll {
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;

    .itemNav {
      padding: 15px;
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      background-color: red;
      text-align: center;
      // border-bottom: 1px dashed #AAA5A5;
    }
  }
</style>