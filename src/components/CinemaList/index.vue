<template>
  <div class="cinemaList">
    <ul>
      <li class="cinemas" v-for="item in cinemas" :key="item.id" @tap="selectSeat(item.nm)">
        <div class="cinema-name">
          <span class="name">{{item.nm}}</span>
          <div class="price">
            <span class="sellPrice">{{item.sellPrice}}</span>
            <span class="word">元起</span></div>
        </div>
        <div class="cinema-address">{{item.addr}}</div>
        <div class="distance">{{item.distance}}</div>
        <div class="tag">
          <span :class="['tag_type',{'tagType':index=='allowRefund'||index=='sell'}]" v-for="(t,index) in item.tag" v-show="t==1">{{index | addTagName}}</span>
          <span class="tagType" v-for="f in item.tag.hallType" v-show="f!=''">{{f}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'CinemaList',
  data: () => ({
    cinemas: [],
    localCityId: -1
  }),
  methods: {
    selectSeat(data) {
      this.$router.push('/cinema/seatSelection/'+data)
    }
  },
  mounted() {
    let cityId = this.$store.state.city.id
    if(this.localCityId===cityId) {
      return
    }
    this.axios.get('/api/cinemaList?cityId='+cityId).then(res => {
      this.localCityId = cityId
      if (res.data.msg === 'ok') {
        this.cinemas = res.data.data.cinemas
      }
    })
  },
  filters: {
    addTagName(index) {
      let tag = [
        {index:"allowRefund",value:"改签"},
        {index:"buyout",value:"包场"},
        {index:"cityCardTag",value:"城市标签"},
        {index:"deal",value:"协议"},
        {index:"endorse",value:"发票"},
        {index:"hallTypeVOList",value:"IMAX厅"},
        {index:"sell",value:"退"},
        {index:"snack",value:"小吃"},
        {index:"vipTag",value:"折扣卡"}
      ] 

      for(var i=0;i<tag.length;i++) {
        if(tag[i].index===index) {
          return tag[i].value
        }
      }
      return ""
    }
  }
}
</script>
<style lang="scss" scoped>
.cinemaList {
  padding: 0 15px;

  .cinemas {
    position: relative;
    border-bottom: 1px solid #E8E5E5;
    padding: 15px 0;

    .cinema-name {
      position: relative;
      font-size: 18px;
      margin-bottom: 12px;

      .price {
        position: absolute;
        right: 0;
        top: 0;
      }

      .name {
        display: inline-block;
        width: 60%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .sellPrice {
        color: orange;
        padding-right: 3px;
      }
      .word {
        font-size: 14px;
        color: #999;
      }
    }
    .cinema-address {
      width: 80%;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .distance {
      position: absolute;
      top: 44px;
      right: 0;
      font-size: 12px;
    }

    .tag {
      margin-top: 10px;

      .tag_type {
        border: 1px solid orange;
        border-radius: 3px;
        font-size: 12px;
        color: orange;
        padding: 1px;
        margin-right: 5px;
      }

      .tagType {
        border: 1px solid #006600;
        border-radius: 3px;
        font-size: 12px;
        color: #006600;
        padding: 1px;
        margin-right: 5px;
      }
    }
  }
}
</style>