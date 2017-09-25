<template lang="html">
  <div class="page">
    <div class="content" ref="popWrapper">
      <ul>
        <article class="slide_wrap">
          <mt-swipe  :auto="4000">
            <mt-swipe-item v-for="(img, index) in slideImg" :key="index">
              <img :src="img" alt="">
            </mt-swipe-item>  
          </mt-swipe>
        </article>
        <ul class="metra-lists">
          <li><img src="http://mp5.jmstatic.com/mobile/card_material/item_44819_512_512-ipad2048_1459308366.jpg?t=1459308366&imageView2/2/w/160/q/90" alt=""></li>
          <li><img src="http://mp5.jmstatic.com/mobile/card_material/item_44820_512_512-ipad2048_1459308381.jpg?t=1459308382&imageView2/2/w/160/q/90" alt=""></li>
          <li><img src="http://mp5.jmstatic.com/mobile/card_material/item_44822_512_512-ipad2048_1458815156.jpg?t=1458815156&imageView2/2/w/160/q/90" alt=""></li>
          <li><img src="http://mp5.jmstatic.com/mobile/card_material/item_44824_512_512-ipad2048_1458815202.jpg?t=1458815202&imageView2/2/w/160/q/90" alt=""></li>
        </ul>
        <div class="list-items">
          <h2 class="items-title">
            <span class="head_bg">
              <img src="http://f0.jmstatic.com/btstatic/h5/common/icon_title.png">
            </span>
            <span>今日特惠</span>
          </h2>
          <div class="items-img">
            <img src="http://mp6.jmstatic.com/mobile/card_material/item_1654_2048_1024-ipad2048_1506090370.jpeg?imageView2/2/w/640/q/90" alt="">
          </div>
        </div>
        <div class="list-items">
          <h2 class="items-title">
            <span class="head_bg">
              <img src="http://f0.jmstatic.com/btstatic/h5/common/icon_title.png">
            </span>
            <span>活动推荐</span>
          </h2>
          <div class="items-img">
            <img src="http://mp5.jmstatic.com/mobile/card_material/item_2835_2048_1024-ipad2048_1505990785.jpeg?imageView2/2/w/640/q/90" alt="">
          </div>
        </div>
        
        <li class="item-list" v-for="(item, index) in pops" :keys="index">
          <div class="pop-image">
            <img alt="" v-lazy="item.img">
          </div>
        </li>
      </ul> 
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      pops: [
        {img: 'http://mp5.jmstatic.com//jmstore/image/000/006/6282_std/59c46e9a14ebc_2048_1024.jpg?1506079046&imageView2/2/w/640/q/90'},
        {img: 'http://mp6.jmstatic.com//jmstore/image/000/006/6282_std/59c0ecbf90004_2048_1024.jpg?1505985436&imageView2/2/w/640/q/90'},
        {img: 'http://mp6.jmstatic.com//jmstore/image/000/006/6282_std/59c07675474ed_2048_1024.jpg?1505903359&imageView2/2/w/640/q/90'},
        {img: 'http://mp5.jmstatic.com//jmstore/image/000/003/3880_std/59c23f06af557_2048_1024.jpg?1505905565&imageView2/2/w/640/q/90'},
        {img: 'http://mp5.jmstatic.com//jmstore/image/000/006/6282_std/59c396f2e07e2_2048_1024.jpg?1506078148&imageView2/2/w/640/q/90'},
      ],
      slideImg: [
        'http://mp6.jmstatic.com/mobile/card_material/item_562_2048_838-ipad2048_1506073378.jpeg?imageView2/2/w/640/q/90',
        'http://mp6.jmstatic.com/mobile/card_material/item_562_2048_838-ipad2048_1506073479.jpeg?imageView2/2/w/640/q/90'
      ]
    }
  },
  methods: {
    _initScroll () {
      this.popScroll = new BScroll(this.$refs.popWrapper, {
        click: true,
        probeType: 3
      })
    },
  },
  created () {
    this.$nextTick(() => {
      this._initScroll()
    })
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.page 
  overflow hidden
  height 100%
  position absolute
  left 0
  right 0
  .content
    height 14rem
    margin-top .01rem
    margin-bottom .5rem
    .slide_wrap
      height 4.2rem
      width 10rem
      .mint-swipe-indicators.is-active
        background mainColor
        opacity 1
      .mint-swipe-item 
        width 10rem
        img
          width 10rem
          height 100%
    .metra-lists
      height 2.7rem
      display flex
      border-line()
      margin .1rem 0
      li
        flex 1
        img
          width 100%
    .list-items
      font-size .5rem
      border-line()
      .items-title
        width 100%
        text-align center
        height 1.3rem
        line-height 1.3rem
        margin-left .1rem
        .head_bg
          width .826rem
          height 2.133rem
          position relative
          right .1rem
          img
           width 4%
      .items-img
        img 
          width 100%
    .item-list
      background #ffffff
      height 5rem
      margin-top .1rem
      &:last-child
        padding-bottom 2rem
      .pop-image
        width 100%
        position relative
        img
          width 100%
        img[lazy=loading]
          display block
          width  100%
          height 5rem
          background #000
          margin auto
</style>
