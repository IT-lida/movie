<template>
  <div class="city-wrapper">
    <BScroll ref="cityList">
      <div ref="citySortList">
        <div class="hot-city">
          <p class="hot-city-item">热门城市</p>
          <ul class="city-list">
            <li class="city-name" v-for="item in hotList" :key="item.id" @tap="changeCity(item.nm,item.id)">{{item.nm}}</li>
          </ul>
        </div>
        <div class="city-sort" ref="citySort">
          <div v-for="c in cityList" :key="c.id">
            <p class="city-pName" ref="sortIndex">{{c.index}}</p>
            <ul>
              <li class="Sort-name" v-for="item in c.list" :key="item.id" @tap="changeCity(item.nm,item.id)">{{item.nm}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="firstWort">
        <div class="word-list" v-for="(item,i) in cityList" :key="item.index" @tap="findCity(i)">{{item.index}}</div>
      </div>
    </BScroll>
  </div>
</template>
<script>

export default {
  name: 'City',
  data: () => ({
    hotList: [],
    cityList: [],
  }),
  methods: {
    async getCityData() {
      try {
        let hotList = window.localStorage.getItem("hotList")
        let cityList = window.localStorage.getItem("cityList")
        if (hotList && cityList) {
          this.hotList = JSON.parse(hotList)
          this.cityList = JSON.parse(cityList)
        } else {
          let res = await this.$http('/api/cityList')
          let msg = res.data.msg
          if (msg === "ok") {
            this.$nextTick(() => {
              let cities = res.data.data.cities
              let { hotList, cityList } = this.initCityData(cities)
              this.hotList = hotList
              this.cityList = cityList

              window.localStorage.setItem("hotList", JSON.stringify(this.hotList))
              window.localStorage.setItem("cityList", JSON.stringify(this.cityList))
            })

          }
        }
      } catch (e) {
        console.error(e)
      }
    },
    initCityData(cities) {
      var cityList = [];
      var hotList = [];

      cities.forEach(i => {
        if (i.isHot === 1) {
          hotList.push(i)
        }
      })

      cities.forEach(c => {
        var firstLetter = c.py.substring(0, 1).toUpperCase();
        if (judge(firstLetter)) {
          cityList.push({ index: firstLetter, list: [{ nm: c.nm, id: c.id }] });
        } else {
          cityList.forEach(j => {
            if (j.index === firstLetter) {
              j.list.push({ nm: c.nm, id: c.id });
            }
          })
        }
      })
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });

      function judge(firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false;
          }
        }
        return true;
      }
      return { hotList, cityList }
    },
    findCity(i) {
      var citySort = this.$refs.citySort.querySelectorAll('.city-pName')
      this.$refs.cityList.toFindCity(-citySort[i].offsetTop)
    },
    changeCity(nm, id) {
      this.$store.commit('city/CITY_INFO', { nm, id })
      this.$router.go(-1)
      window.localStorage.setItem('cityName', nm)
      window.localStorage.setItem('cityId', id)
    }
  },
  mounted() {
    this.getCityData()
  }
}
</script>
<style lang="scss" scoped>
.city-wrapper {
  position: fixed;
  top: 95px;
  left: 0;
  right: 0;
  bottom: 50px;
  background-color: #E0E0E0;
  overflow: hidden;

  p {
    display: block;
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
    color: #000;
    background: #D6D6D6;
    font-weight: normal;
  }

  .hot-city {
    width: 100%;
    min-height: 190px;
    height: 25px;

    .city-list {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 15px;

      .city-name {
        flex: 0 0 29%;
        background: #fff;
        height: 33px;
        margin-top: 15px;
        margin-left: 3%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
      }
    }
  }
  .city-sort {
    .Sort-name {
      margin: 0 4% 0 3%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ADADAD;
    }
  }
  .firstWort {
    position: fixed;
    top: 25%;
    right: 0;

    .word-list {
      font-size: 12px;
      padding-bottom: 5px;
      color: #555;
      text-align: center;
    }
  }
}
</style>