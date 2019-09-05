<template>
  <div class="comingSoon" ref=nowMovie>
    <Loading v-if="loading" />
    <BScroll v-else :renewStrat="renewStrat" :renewEnd="renewEnd">
      <div>
        <p class="renewMessage">{{message}}</p>
        <div class="nowPopular">近期最受欢迎</div>
        <div class="porpuleList" ref=porpuleList>
          <ul class="popular-list">
            <li class="popular" v-for="(item,index) in comingList" :key="item.id" v-show="item.wish>10000">
              <img class="img" :src="item.img | setWh('90.100')" alt="电影海报">
              <div class="movie-bottom">
                <h2 class="movie-nm">{{item.nm}}</h2>
                <p class="movie-sc"><span class="sc">{{item.wish}}</span>人想看</p>
                <p class="time">{{item.rt}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="nowPopular">即将上映</div>
        <ul>
          <li class="movie-list"
              v-for="item in comingList" 
              :key="item.id"
              @tap="intoDetail(item.id)"
              >
            <div class="movie-left">
              <img :src="item.img | setWh('70.90')" alt="电影海报">
            </div>
            <div class="movie-right">
              <h2 class="movie-title">{{item.nm}}<img class="maxs" v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
              <p class="movie-sc"><span class="sc">{{item.wish}}</span>人想看</p>
              <p class="star">主演：{{item.star}}</p>
              <p class="showInfo" v-if="item.showInfo">{{item.showInfo}}</p>
              <p class="showInfo" v-else>暂无上映安排</p>
            </div>
            <Btn class="btn" title="想看" />
          </li>
        </ul>
      </div>
    </BScroll>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Btn from '@/components/Btn'
import Loading from '@/components/Loading'

export default {
  name: 'ComingSoon',
  data: () => ({
    comingList: [],
    localCityId: -1,
    message: "",
    loading: true
  }),
  components: {
    Btn,
    Loading
  },
  methods: {
    initMovieBscorll() {
      if (this.propuleScroll) {
        this.propuleScroll.refresh()
      } else {
        this.propuleScroll = new BScroll(this.$refs.porpuleList, {
          startX: 0,
          click: true,
          scrollX: true,
          scrollY: false,
          eventPassthrough: "vertical"
        })
      }
    },
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
    this.axios.get('/api/movieComingList?cityId=' + cityId).then(res => {
      let msg = res.data.msg
      if (msg === "ok") {
        this.loading = false
        this.comingList = res.data.data.comingList
        this.$nextTick(() => {
          this.initMovieBscorll()
        })
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.comingSoon {
  position: fixed;
  top: 95px;
  left: 0;
  right: 0;
  bottom: 50px;
  margin: 0 10px;
  overflow: hidden;

  .nowPopular {
    padding: 5px;
    color: #555444;
    border-bottom: 1px solid #d0d0d0;
    background-color: #E5E5E5;
  }

  .renewMessage {
    width: 100%;
    font-size: 14px;
    color: #999;
    text-align: center;
    line-height: 32px;
  }

  .popular-list {
    width: 720px;

    &::after {
      display: block;
      clear: both;
      content: "";

    }

    .popular {
      float: left;
      padding: 10px 0;
      margin-right: 10px;
    }

    .img {
      width: 90px;
      height: 120px;
      overflow: hidden;
    }

    .movie-bottom {
      margin-top: 5px;
      width: 90px;

      .movie-nm {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .movie-sc {
        padding: 5px 0;
        font-size: 12px;

        .sc {
          color: orange;
        }
      }
      .time {
        font-size: 12px;
      }
    }
  }
}

.movie-list {
  position: relative;
  display: flex;
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