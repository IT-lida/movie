<template>
  <div class="search" ref="resultList">
    <BScroll>
      <div>
        <div class="search-inp">
          <div class="iconfont icon-sousuo"></div>
          <input class="inp" type="text" placeholder="找影视剧、影院" v-model="message">
        </div>
        <div class="search_result">
          <h3>电影/电视剧/综艺</h3>
          <ul>
            <li v-for="item in searchMovieList" :key="item.id">
              <div class="img"><img :src="item.img | setWh('70.90')"></div>
              <div class="info">
                <p><span>{{item.nm}}</span><span>{{item.sc}}</span></p>
                <p>{{item.cat}}</p>
                <p>主演：{{item.dir}}</p>
                <p>{{item.rt}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </BScroll>
  </div>
</template>
<script>
import BScroll from "better-scroll"

export default {
  name: 'Search',
  data: () => ({
    message: '',
    searchMovieList: []
  }),
  methods: {
    // 1. 定义终止请求方法
    cancelRequest() {
      if (typeof this.source === 'function') {
        this.source('')
      }
    },
    initResultBscorll() {
      if (this.ResultBscorll) {
        this.ResultBscorll.refresh()
      } else {
        this.ResultBscorll = new BScroll(this.$refs.resultList)
      }
    }
  },
  watch: {
    message(value) {
      this.cancelRequest()
      if (!value) {
        this.searchMovieList = {}
      } else {
        this.axios.get('/api/searchList?cityId=10&kw=' + value, {
          cancelToken: new this.$http.CancelToken(c => {
            this.source = c
          })
        }).then(res => {
          let msg = res.data.msg
          let movie = res.data.data.movies
          if (msg && movie) {
            this.searchMovieList = movie.list
          }
        }).catch(err => {
          if (err) {
            if (this.$http.isCancel(err)) {
              // 终止多次请求 请求取消 返回取消后的信息
              console.log(err.message)
            } else {
              // 服务端数据异常
              console.log('没有搜索到数据哦')
              this.list = []
            }
          }
        })
      }

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initResultBscorll()
    })
  }
}
</script>
<style lang="scss" scoped>
.search {
  position: fixed;
  top: 95px;
  left: 0;
  bottom: 50px;
  right: 0;
  width: 100%;
  padding: 5px 10px;
  border-bottom: 1px solid #D3D1D1;
  overflow: hidden;

  .search-inp {
    position: relative;
    // display: flex;
    line-height: 30px;

    .iconfont {
      position: absolute;
      font-size: 24px;
      color: #999;
      left: 0;
      top: 3px;
    }

    .inp {
      // flex: 1;
      width: 90%;
      height: 30px;
      font-size: 16px;
      padding: 0 10px 0 25px;
      border: 1px solid #999;
      border-radius: 5px;

      &:focus {
        outline: none;
      }
    }
  }
  .search_result {

    h3 {
      font-size: 15px;
      color: #999;
      padding: 9px 10px;
      margin-top: 5px;
      border-bottom: 1px solid #e6e6e6;
      border-top: 1px solid #e6e6e6;
    }

    ul {

      li {
        border-bottom: 1px #c9c9c9 dashed;
        padding: 10px 15px;
        display: flex;

        .img {
          width: 60px;
          float: left;

          img {
            width: 100%;
          }
        }
      }
    }

    .info {
      float: left;
      margin-left: 15px;
      flex: 1;

      p {
        height: 22px;
        display: flex;
        line-height: 22px;
        font-size: 12px;
        color: #666;

        &:nth-of-type(1) span:nth-of-type(1) {
          display: block;
          width: 40px;
          font-size: 18px;
          flex: 1;
          color: #000;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;

        }
        &:nth-of-type(1) span:nth-of-type(2) {
          font-size: 16px;
          color: #fc7103;
        }
      }
    }
  }
}
</style>