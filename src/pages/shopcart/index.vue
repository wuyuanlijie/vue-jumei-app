<template lang="html">
  <div class="page">
    <mt-header fixed title="购物车" class="header">
      <!-- <img src="../../assets/icon/search_icon.png" alt="搜索"> -->
      <mt-button slot="right" class="edit">编辑</mt-button>
      <mt-button slot="right" class="msg">
        <img src="../../assets/icon/message.png" alt="">
      </mt-button>
    </mt-header>
    <div class="cart-content" ref="cartWrapper">
      <div>
        <cartDetail :allCartChoose="allChoose"></cartDetail>
        <div class="recommend">
          <div class="rec-title">
            <span :class="index==chooseIndex?'isRecChoose':''"
             v-for="(item, index) in recommends"
             @click="chooseIndex = index">
              {{item}}
            </span>
          </div>
          <div class="rec-content">
          </div>

        </div>
      </div>
    </div>
    <div class="submit-button" :class="hasProduct?'':'isHidden'">
      <div class="sub-info">
        <span class="check-icon" @click="allChoose = !allChoose"> 
          <img :src="allChoose?'static/icon/order_checked.png':'static/icon/order_not_checked.png'" alt="">
        </span>
        <span class="all-check-text">全选</span>
        <div class="summary">
          <span>合计</span>
          <span>￥{{totalPrice}}</span>
        </div>
      </div>
      <div class="submit-btn" @click="sumbitBtn">
        去结算({{totalQuantity}})
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {MessageBox} from 'mint-ui'
import cartDetail from '@/components/cartDetail'

export default {
  data () {
    return {
      recommends: ['大家还买了','为你推荐'],
      chooseIndex: 0,
      hasProduct: false,
      time: {
        min: 20,
        sec: '00',
      },
      totalPrice: 0,
      totalQuantity: 0,
      allChoose: false,

    }
  },
  created () {
    this.$store.dispatch('selectTab', '购物车')
    let added = this.$store.state.cart.added
    if (added.length !=0) {
      this.hasProduct = true
    }
    if (!storage['user']) {
      this.hasProduct = false
    }
  },
  mounted () {
    this.$nextTick(() => {
       this.cartScroll = new BScroll(this.$refs.cartWrapper, {
        click: true
      })
    })
  },
  computed: {
    cartLists () {
      // console.log(this.$store.state.cart.added)
      let added = this.$store.state.cart.added
      added.length !=0 ? this.hasProduct = true : this.hasProduct = false
      return added
    },
    quantityArray () {
      let added = this.cartLists
      let array = []
      for (let item of added) {
        array.push(item.quantity)
      }
      // console.log(array)
      return array
    }
  },
  components: {
    cartDetail,
  },
  methods: {
    getAllCart () {
      for(let item of this.cartLists) {
        this.totalQuantity += item.quantity
        this.totalPrice += item.price * item.quantity
      }
    },
    sumbitBtn () {
      if (this.totalQuantity) {
        MessageBox.alert('恭喜你结算成功,请等待收货！')
        this.$store.state.cart.added = []
        storage.setItem('cart', [])
      }
     
    }
  },
  watch: {
    quantityArray () {
      // 监听数据的变化 从而改变价格
      this.totalQuantity = 0
      this.totalPrice = 0
      this.getAllCart()
    },
    allChoose () {
      if(this.allChoose) {
        this.totalQuantity = 0
        this.totalPrice = 0
        this.getAllCart()
      } else {
        this.totalQuantity = 0
        this.totalPrice = 0
      }
    } 
  }

}
</script>

<style lang="stylus" type="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.page
  font-size .42975rem
  overflow hidden
  .header
    border-1px()
    position fixed
    background #fff
    font-size .51375rem
    padding .65rem 0
    color #000
    .edit
      display inline-block
      vertical-align middle
    .msg
      height .6rem
      width .6rem
      margin 0rem .3rem
      vertical-align middle
      img
        width 100%
  .cart-content
    padding-bottom 1.4rem
    height 12rem
    .recommend
      width 100%
      .rec-title
        display flex
        font-size .44975rem
        border-line(.2rem, .8)
        span
          flex 1
          height 1.375rem
          line-height 1.275rem
          text-align center
          &.isRecChoose
            color mainColor
  .submit-button
    position fixed
    left 0
    right 0
    height 1.5625rem
    bottom 1.4625rem
    line-height 1.5625rem
    padding 0rem .20625rem
    border-1px-top()
    background #fff
    &.isHidden
      display none
    .sub-info
      display inline-block
      .check-icon
        vertical-align top
        margin-top .34rem
        display inline-block
        height 0.90375rem
        width 0.90375rem
        img
          width 100%
      .all-check-text
        vertical-align middle
        padding-right .2125rem
        font-size .48rem
      .summary
        display inline-block
        padding-right .2125rem
        span
          &:first-child
            smallFont()
            color fontTint
            vertical-align bottom
          &:last-child
            color mainColor
            font-size .5rem
            vertical-align bottom
    .submit-btn
      display inline-block
      height 1rem
      width 3.09375rem
      background mainColor
      color #fff
      line-height 1rem
      text-align center
      border-radius 1.25rem
      position absolute
      right 0
      top .24rem
      right 0.40625rem
</style>
