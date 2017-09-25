<template lang="html">
  <div class="cart-detail">
    <div class="cart-no-good" :class="hasProduct?'isHidden':''">
      <div class="opps">
        <img src="../assets/icon/pay_pop_img_loading_fail.png" alt="">
      </div>
      <p class="empty-title">您的购物车中没有商品，请先去挑选心爱的商品吧！</p>
      <div class="go-shop" @click="goToShop">去逛逛</div>
    </div>

    <div class="count-down" :class="hasProduct?'':'isHidden'">
      <div class="clock-icon"></div>
      <span class="time-text">
        {{time.min}}:{{time.sec}}
      </span>
      <span class="time-msg">结算时间，商品可能被抢空，请尽快买</span>
    </div>
    <ul class="groups" :class="hasProduct?'':'isHidden'">
      <div class="g-header">
        <span class="check-icon" @click="chooseAll = !chooseAll">
          <img :src="chooseAll?checkIcon:checkNotIcon" alt="">
        </span>
        <span class="title">聚美优品发货</span>
      </div>
      <li class="group" v-for="(item, index) in cartLists" :key="index">
        <span class="check-icon" @click="chooseOne = !chooseOne">
          <img :src="chooseOne?checkIcon:checkNotIcon" alt="">
        </span>
        <div class="group-content">
          <div class="img-wrap">
            <img :src="item.img" alt="">
          </div>
          <div class="text-wrap">
            <span class="title">{{item.title}}</span>
            <div class="type">{{item.type}}</div>
            <div class="price-edit">
              <span class="price">￥{{item.price}}</span>
              <div class="add-cart-reduce">
                <span class="icon-reduce iconCart" @click="reduceNum(item)"></span>
                {{item.quantity}}
                <span class="icon-add iconCart" @click="addNum(item)"></span>
              </div>

            </div>
          </div>
        </div>
      </li>
      <div class="g-footer" v-if="totalQuantity<2">
        <span class="icon">免</span>
        <span class="tail">还差一件可享自营满2件包邮</span>
        <span class="more" @click="goToShop">去凑单</span>
      </div>
      <div class="g-footer freeFee" v-if="totalQuantity>=2">
        <span class="icon">免</span>
        <span class="tail">已可享自营满2件包邮</span>
      </div>
    </ul>
  </div>
</template>

<script>
// 导入定时器
import * as TimeInterval from '@/common/util/TimeInterval.js'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      hasProduct: false,
      time: {
        min: 20,
        sec: '00.0',
      },
      chooseAll: false,
      checkNotIcon: 'static/icon/order_not_checked.png',
      checkIcon: 'static/icon/order_checked.png',
      chooseOne: false,
      totalQuantity: 0
    }
  },
  props: {
    allCartChoose: Boolean
  },
  computed: {
    cartLists () {
      let added = this.$store.state.cart.added
      added.length!=0 ? this.hasProduct = true : this.hasProduct = false
      this.totalQuantity = 0
      for (let item of added) {
        this.totalQuantity += item.quantity
      }
      if (storage['user']) {
        return added
      } else {
        this.hasProduct = false
        return []
      }
     
    }
  },
  methods: {
    goToShop () {
      if (!storage['user']) {
        MessageBox.alert('您尚未登录!').then(action => {
          this.$router.push('/login')
        })
      } else {
        this.$router.replace('./index/page1')
      }

    },
    sendNewProduct (id, type, quantity) {
      let newProduct = {id:id, type:type, quantity:quantity}
      this.$store.dispatch('updateThisCart', newProduct)
    },
    addNum (item) {
      this.buyNum++
      // updateThisCart
      // 改变购买数量
      let {id, type, quantity} = item
      quantity++
      let newProduct = {
        id: id,
        type: type,
        quantity: quantity
      }
      this.$store.dispatch('updateThisCart', newProduct)
    },
    reduceNum (item) {
      let {id, type, quantity} = item
      quantity--
      if (quantity === 0) {
        MessageBox.confirm('确认要删除所选商品?').then(action => {
          this.sendNewProduct(id, type, quantity)
        }).catch(err => {
          quantity++
          this.sendNewProduct(id, type, quantity)
        })
      } else {
       this.sendNewProduct(id, type, quantity)
      }
    }
     
  },
  watch: {
    "chooseAll" () {
      this.chooseAll?this.chooseOne=true:this.chooseOne=false
    },
    "allCartChoose" () {
      if (this.allCartChoose) {
        this.chooseOne = true
        this.chooseAll = true
      } else { 
        this.chooseOne = false
        this.chooseAll = false
      }
    }
  },
  created () {
    TimeInterval.cartInterVal.call(this, this.time)

  }


}
</script>

<style lang="stylus" type="stylesheet/stylus" scoped>
@import '../common/stylus/mixin.styl'

.cart-detail
  .cart-no-good
    border-line()
    padding-top .33125rem
    padding-bottom .69375rem
    margin-top 1.5rem
    display flex
    justify-content center
    align-items center
    flex-direction column
    &.isHidden
      display none
    .opps
      height 3.25rem
      width 3.25rem
      img
        width 100%
    .empty-title
      margin-top .13125rem
      font-size .4rem
    .go-shop
      margin-top .59375rem
      width 3.90625rem
      height 1.125rem
      background mainColor
      color #fff
      text-align center
      line-height 1.125rem
      border-radius 1.25rem

  .count-down
    border-line()
    padding 0rem .3125rem .3125rem
    margin-top 1.35rem
    height .90625rem
    line-height .90625rem
    color fontTint
    &.isHidden
      display none
    .clock-icon
      height  .7rem
      display inline-block
      vertical-align middle
      margin-top -.02rem
      width .7rem
      background url('../assets/icon/clock.png') no-repeat
      background-size 100% 100%
    .time-text
      color mainColor
      display inline-block
      width 1.3rem
    .time-msg
      smallFont()
      margin-left .3125rem
  .groups
    font-size .44875rem
    padding-left .1425rem
    &.isHidden
      display none
    .g-header
      height 1.25rem
      line-height 1.25rem
      border-1px()
      .check-icon
        vertical-align middle
        margin-top -0.085rem
        display inline-block
        height 0.90375rem
        width 0.90375rem
        img
          width 100%
    .group
      border-1px()
      display flex
      .check-icon
        vertical-align middle
        flex 0 0 .92rem
        display inline-block
        height 0.90375rem
        width 0.90375rem
        margin-top 1.575rem
        img
          width 100%
      .group-content
        flex 1
        padding .3125rem 0.3125rem 0.425rem 0
        display flex
        .img-wrap
          display inline-block
          flex 1
          height 3.125rem
          width 3.125rem
          img
            height 100%
        .text-wrap
          padding-left .1175rem
          flex 2
          .title
            display inline-block
            line-height .56rem
            overflow hidden
            height 1.06rem
          .type
            color fontTint
            padding .3125rem 0rem
          .price-edit
            margin-top .3125rem
            font-size .5rem
            position relative
            .price
              color mainColor
            .add-cart-reduce
              position absolute
              right .1rem
              top -.2rem
              display inline-block
              height .8125rem
              line-height .78125rem
              .icon-reduce
                display inline-block
                height .8125rem
                width .8125rem
                background url('../assets/icon/cartReduce.png') no-repeat
                background-size 100% 100%
                vertical-align top
                margin-right .2625rem
              .icon-add
                display inline-block
                height .7825rem
                width .7825rem
                background url('../assets/icon/cartAdd.png') no-repeat
                background-size 100% 100%
                vertical-align top
                margin-left .2625rem
    .g-footer
      line-height 1.27625rem
      height 1.40625rem
      font-size .35875rem
      border-line()
      padding-left .2125rem
      .icon
        display inline-block
        border 1px solid #000
        border-radius 50%
        width .52rem
        height .52rem
        text-align center
        line-height .5rem
        font-size 12px
        margin-right .1125rem
      .more
        color mainColor
        position relative
        arrow-right(0.2rem,0.15rem, 1.4rem,mainColor)
      &.freeFee
        color mainColor
        .icon
          border 1px solid mainColor


</style>
