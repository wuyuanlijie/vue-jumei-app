<template lang="html">
  <div class="buy-box border-1px-top">
    <div class="icon-block">
      <span class="store-link fs10">
        <img src="../assets/icon/store.png" alt="">
        <p>店铺</p>
      </span>
      <span class="shop-cart fs10" @click="goCartPage">
        <img src="static/icon/cart.png" alt="">
        <p v-if="!clickTime">购物车</p>
        <p v-if="clickTime">{{time.min}}:{{time.sec}}</p>
        <span class="num" v-if="cartQunantity>0">{{cartQunantity}}</span>
      </span>
    </div>
    <div class="button-block">
      <span class="add" @click="addToCart">加入到购物车</span>
      <span class="add" @click="addToCart">立即购买</span>
    </div>
    <mt-popup v-model="cartVisible" position="bottom">
        <div class="sku-wrapper">
          <div class="title_content border-1px">
            <div class="product_imgs" >
              <img :src="product.cartImg" alt="">
            </div>
            <div class="product_info">
              <h2 class="product_price">￥{{product.nowPrice}}</h2>
              <div class="select_val">
                <strong class="selected_title">{{chooseTitle}}</strong>
                <strong class="selected_val">{{chooseType}}</strong>
              </div>
            </div>
            <i class="close" @click="cartVisible=false"></i>
          </div>
          <div class="select_option_wrap">
            <div class="item_content border-1px">
              <div class="property_title">分类</div>
               <ul class="property_name">
                 <li class="property_item" v-for="(type, index) in product.types"
                    @click="chooseTitle='已选',chooseType=type, chooseClick(index)" :class="isChoose==index?'isChoose':''">
                   {{type}}
                 </li>
               </ul>
            </div>
            <div class="buy-num">
              <span class="num_name">购买数量</span>
              <div class="num_content">
                <span class="shopping shop_reduce" @click="reduceGoods">
                  <img :src="reduceIcon" alt="">
                </span>
                <span class="input">{{buyNum}}</span>
                <span class="shopping shop_add" @click="addGoods">
                  <img src="static/icon/addIcon.png" alt="">
                </span>
              </div>
            </div>
          </div>
          <div class="submit_confirm_box">
            <span class="add" @click="addCartAtOnce">加入到购物车</span>
            <span class="add" @click="addCartAtOnce">立即购买</span>
          </div>
        </div>
    </mt-popup>
    
  </div>

</template>

<script>
// import {mapGetters} from 'vuex'
import * as TimeInterval from '@/common/util/TimeInterval.js'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      cartVisible: false,
      chooseType: '分类',
      chooseTitle: '请选择',
      isChoose: -1,
      buyNum: 1,
      reduceIcon: 'static/icon/reductIcon1.png',
      cartCar: '购物车',
      time: {
        min: 20,
        sec: '00.0',
      },
      clickTime: false
    }
  },
  methods: {
    // 真正的添加到购物车
    addCartAtOnce () {
      //  添加  商品信息到购物车
      let productInfo = {
        id: this.product.id,
        img: this.product.cartImg,
        title: this.product.title,
        type: this.chooseType,
        quantity: this.buyNum,
        price: this.product.nowPrice,
        inventory: this.product.inventory
      }
      this.$store.dispatch('addToCart', productInfo)
      console.log("添加到购物车成功!")
      TimeInterval.cartInterVal.call(this, this.time)
      this.clickTime = true
      this.cartVisible = false
      this.$emit('ballShowClick')
    },
    // 分割线
    addToCart () {
      if (!storage['user']) {
        MessageBox.alert('您尚未登录!').then(action => {
          this.$router.push('/login')
        })
      } else {
         this.cartVisible = true
      }
    },
    goCartPage () {
      this.$router.replace('/shopCart')
      this.$store.dispatch('selectTab', '购物车')
    },
    chooseClick (index) {
      this.isChoose = index
    },
    addGoods () {
      this.buyNum++
     
    },
    reduceGoods () {
      if (this.buyNum > 1) {
        this.buyNum--
      }
    }
  },
  // 计算属性获取信息
  computed: {
    product () {
      return this.$store.state.productInfo
    },
    cartQunantity () {
      let added = this.$store.state.cart.added
      let total = 0
      for (let item of added) {
        total += item.quantity
      }
      if (!storage['user']) {
        return 0
      }
      return total
    }
  },
  watch: {
    'buyNum' () {
      this.buyNum>1?this.reduceIcon="static/icon/reductIcon2.png":this.reduceIcon="static/icon/reductIcon1.png"
    },

  }

}
</script>

<style lang="stylus" type="stylesheet/style" >
@import '../common/stylus/mixin.styl'
.buy-box
  position fixed
  left 0
  right 0
  bottom 0
  height 1.4425rem
  display flex
  border-1px-top()
  background #fff
  box-sizing border-box
  .icon-block
    flex 5
    display flex
    text-align center
    position relative
    .store-link
      &:after
        content ''
        position absolute
        left 50%
        top 0
        bottom 0
        height 1.5625rem
        width 1px
        background mainTint
    .fs10
      flex 1
      height .6875rem
      width .6875rem
      display inline-block
      color fontTint
      margin .2rem
      font-size .34rem
      position relative
      &:last-child
        margin-top .22rem
        position relative
        img
          width 65%
        p
          margin-top .04rem
        .num
          position absolute
          display inline-block
          right 0
          top -.1rem
          height .5rem
          line-height .5rem
          width .5rem
          font-size .4rem
          background mainColor
          border-radius 50%
          color #ffffff
          text-align center
      img
        width 70%
  .button-block
    flex 11
    display flex
    .add
      display inline-block
      flex 1
      text-align center
      font-size mainFont
      // 行高等于盒子高度 垂直居中
      line-height 1.4625rem
      &:first-child
        background #FFF1F5
        color mainColor
      &:last-child
        background mainColor
        color #fff
  .sku-wrapper
    width 10rem
    height 14.375rem
    position relative
    .title_content
      border-1px()
      .product_imgs
        vertical-align top
        margin-left .375rem
        top -.6875rem
        display inline-block
        img
          height 3.125rem
          width 3.125rem
          margin-top -.6875rem
          box-shadow: 1px .0625rem .078125rem rgba(0,0,0,.11)
      .product_info
        display inline-block
        padding .71875rem 0px .625rem .30625rem
        font-size .65625rem
        .select_val
          padding-top .675rem
          padding-left .13rem
          font-size numFont
          .selected_val
            display inline-block
            width 4rem
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
      .close
        position absolute
        right .275rem
        top .275rem
        display inline-block
        height .8625rem
        width .8625rem
        background url('../assets/icon/close.png') no-repeat center center
        background-size 100%
    .select_option_wrap
      padding .275rem .375rem .375rem .415rem
      color fontMain
      .item_content
        position relative
        border-1px()
        .property_title
          padding-bottom .3125rem
        .property_name
          overflow hidden
          .property_item
            // box-sizing border-box
            float left
            min-width 1rem
            padding .20rem .3rem .2rem .3rem
            border-radius .625rem
            border 1px solid #e0e0e0
            height .38125rem
            line-height .38125rem
            text-align center
            margin 0px .46875rem .40625rem 0px
            &.isChoose
              background mainColor
              color #fff
              border 1px solid mainColor
      .buy-num
        padding-top .46875rem
        position relative
        .num_content
          display inline-block
          position absolute
          top .3rem
          right .3125rem
          font-size .34rem
          color #000
          .shopping
            display inline-block
            vertical-align middle
            margin  0rem .43125rem
            width .71875rem
            height .71875rem
            border-radius 50%
            &.shop_reduce
              margin-top .1rem
              img
                width 80%
            &.shop_add
              margin-right 0rem
              img
                width 100%
    .submit_confirm_box
      position fixed
      left 0
      right 0
      bottom 0
      height 1.4425rem
      font-size mainFont
      line-height 1.4625rem
      display flex
      .add
        text-align center
        flex 1
        &:first-child
          background #FFF1F5
          color mainColor
        &:last-child
          background mainColor
          color #fff




</style>
