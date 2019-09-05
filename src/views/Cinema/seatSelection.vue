<template>
  <div class="selection">
    <Header :title="data">
      <i class="iconfont icon-right" @click="backHome"></i>
    </Header>
    <div class="selection-box">
      <div class="cinemaName">1号情侣厅银幕</div>
      <div class="cinemaCenter">银幕中央</div>
      <div class="line"></div>
      <div class="inner-seat-wrapper" ref="innerSeatWrapper">
        <div class="seat-row" v-for="row in seatRow">
          <div v-for="col in seatCol" v-if="seatArray.length>0" class="seat" :style="{width:seatSize+'px',height:seatSize+'px'}">
            <div class="inner-seat" @click="ChooseSeat(row-1,col-1)" v-if="seatArray[row-1][col-1]!==-1" :class="seatArray[row-1][col-1]===2?'bought-seat':(seatArray[row-1][col-1]===1?'selected-seat':'unselected-seat')">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sureBuy" @click="sureBuy">确认选座</div>
  </div>
</template>
<script>
import Header from '@/components/Header'
import { messageBox } from '@/components/JS'

export default {
  name: 'seatSelection',
  props: ['data'],
  components: {
    Header
  },
  data: () => ({
    seatRow: 10,
    seatCol: 10,
    seatArray: []
  }),
  methods: {
    backHome() {
      this.$router.go(-1)
    },

    initSeatArray() {
      let seatArray = Array(this.seatRow).fill(0).map(() => Array(this.seatCol).fill(0))
      this.seatArray = seatArray
      this.seatSize = parseInt(parseInt(window.getComputedStyle(this.$refs.innerSeatWrapper).width) / this.seatCol)
    },

    initOtherPlace() {
      console.log(this.seatArray)
      for (let i = 0; i < this.seatArray[0].length; i++) {
        this.seatArray[4][i] = -1;
        this.seatArray[i][0] = -1;
        this.seatArray[i][9] = -1;
      }
    },

    ChooseSeat(row, col) {
      let seatValue = this.seatArray[row][col]
      let newArray = this.seatArray
      if (seatValue === 2) { return }
      if (seatValue === 1) {
        newArray[row][col] = 0
      } else if (seatValue === 0) {
        newArray[row][col] = 1
      }

      this.seatArray = newArray.slice()
    },

    sureBuy() {
      for (var i = 0; i < this.seatRow; i++) {
        for (var j = 0; j < this.seatCol; j++) {
          var seatValue = this.seatArray[i][j]
          var newArray = this.seatArray
          if (seatValue === 1) {
            newArray[i][j] = 2
          }
        }
      }
      this.seatArray = newArray.slice()
      alert('确定选座吗')
      alert('恭喜，选座成功！')

    }
  },
  mounted() {
    this.initSeatArray()
    this.initOtherPlace()
  }
}
</script>
<style lang="scss" scoped>
.selection {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: #f1f1f1;
  z-index: 10000;

  .icon-right {
    line-height: 50px;
    padding-left: 5px;
    font-size: 20px;
  }

  .selection-box {
    overflow: hidden;

    .cinemaCenter {
      width: 60px;
      height: 20px;
      line-height: 18px;
      margin: 0 auto;
      text-align: center;
      font-size: 12px;
      color: #6D6C6A;
      border: 1px solid #ABABAB;
      border-radius: 25px;
    }

    .line {
      position: absolute;
      left: 50%;
      width: 0;
      height: 450px;
      border-right: 1px dashed #ABABAB;
    }

    .cinemaName {
      width: 40%;
      height: 40px;
      margin: 0 auto;
      background-color: #E3E3E3;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 700;
      color: #6A696F;
      line-height: 55px;
      transform: translateY(-40%);
      text-align: center;
    }

  }

  .inner-seat-wrapper {
    position: absolute;
    top: 150px;
    bottom: 55px;
    width: 100%;

    .seat {
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;

      .inner-seat {
        width: 80%;
        height: 80%;

        &.selected-seat {
          background: url('../../assets/selected.png') center center no-repeat;
          background-size: 100% 100%;
        }
        &.unselected-seat {
          background: url('../../assets/unselected.png') center center no-repeat;
          background-size: 100% 100%;
        }
        &.bought-seat {
          background: url('../../assets/bought.png') center center no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }

  .sureBuy {
    width: 70%;
    height: 50px;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    line-height: 50px;
    text-align: center;
    background-color: #FF6F00;
    border-radius: 7px;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>