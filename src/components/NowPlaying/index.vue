<template>
  <div class="nowPlaying">
    <Loading v-if="loading"/>
    <BScroll v-else :renewStrat="renewStrat" :renewEnd="renewEnd">
      <div class="movie-box">
        <p class="renewMessage">{{message}}</p>
        <NBanner :pics="pics" />
        <ul>
          <li class="movie-list" 
              v-for="item in movieList" 
              :key="item.id" 
              @tap="intoDetail(item.id)"
              >
            <div class="movie-left">
              <img :src="item.img | setWh('70.90')" alt="电影海报">
            </div>
            <div class="movie-right">
              <h2 class="movie-title">{{item.nm}}<img class="maxs" v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
              <p class="movie-sc" v-if="item.sc">猫眼评分<span class="sc">{{item.sc}}</span></p>
              <p class="movie-sc no" v-else>暂无评分</p>
              <p class="star">主演：{{item.star}}</p>
              <p class="showInfo">{{item.showInfo}}</p>
            </div>
            <Btn class="btn" title="购票" />
          </li>
        </ul>
      </div>
    </BScroll>
  </div>
</template>
<script>
import NBanner from '@/components/NBanner'
import Btn from '@/components/Btn'
import Loading from '@/components/Loading'

const publicPath = process.env.BASE_URL

export default {
  name: 'NowPlaying',
  components: {
    NBanner,
    Btn,
    Loading,
  },
  data: () => ({
    index: 0,
    pics: [
      `${publicPath}images/movie_3.jpg`,
      `${publicPath}images/movie_4.jpg`
    ],
    movieList: [],
    localCityId: -1,
    message: "",
    loading: true,
  }),
  methods: {
    renewStrat(pos) {
      if (pos.y > 30) {
        this.message = "更新中..."
      }
    },
    renewEnd(pos) {
      if (pos.y > 30) {
        let cityId = this.$store.state.city.id
        if (this.localCityId === cityId) {
          retusrn
        }
        this.axios.get('/api/movieOnInfoList?cityId=' + cityId).then(res => {
          let msg = res.data.msg
          if (msg === "ok") {
            this.message = "已更新"
            setTimeout(() => {
              this.movieList = res.data.data.movieList
              this.message = ""
            }, 2000)

          }
        })
      }
    },
    intoDetail(movieId) {
      this.$router.push('/movie/buyTicket/'+movieId)
    }
  },
  activated() {
    let cityId = this.$store.state.city.id
    if (this.localCityId === cityId) {
      return
    }
    this.axios.get('/api/movieOnInfoList?cityId=' + cityId).then(res => {
      let msg = res.data.msg
      if (msg === "ok") {
        this.loading = false
        this.movieList = res.data.data.movieList
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  .nowPlaying {
    position: fixed;
    top: 95px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow: hidden;
  }

  .renewMessage {
    width: 100%;
    font-size: 14px;
    color: #999;
    text-align: center;
    line-height: 32px;
  }

  .movie-list {
    position: relative;
    display: flex;
    margin: 0 10px;
    padding: 10px 0;
    border-bottom: 1px solid #d0d0d0;

    .btn {
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translateY(-50%)
    }

    .movie-left {
      flex: 0 0 70;
      height: 98px;
      overflow: hidden;

      img {
        width: 70px;
        height: 98px;
      }
    }

    .movie-right {
      flex: 1;
      padding-left: 10px;

      .movie-title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 8px;

        .maxs {
          display: inline-block;
          width: 50px;
          margin-left: 10px;
          vertical-align: top;
        }
      }

      .movie-sc,
      .star,
      .showInfo {
        font-size: 14px;
        font-weight: normal;
        color: #4B4B4B;
        line-height: 22px;

        &.no {
          color: #999;
        }
      }

      .sc {
        font-size: 16px;
        color: orange;
        padding-left: 2px;
      }

      .showInfo {
        color: #999;
      }

      .star {
        max-width: 50vw;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
</style>