<template lang="html">
  <div class="page">
    <div class="content" ref="popWrapper">
      <ul>
        <section class="list-items">
          <div class="metra-list-one">
            <span><img src="../../assets/dutyfree/free1.jpg" alt=""></span>
            <span><img src="../../assets/dutyfree/free2.jpg" alt=""></span>
            <span><img src="../../assets/dutyfree/free3.jpg" alt=""></span>
            <span><img src="../../assets/dutyfree/free4.jpg" alt=""></span>
          </div>
        </section>
        <section class="list-items">
          <h2 class="items-title">
            <span class="head_bg">
              <img src="http://f0.jmstatic.com/btstatic/h5/common/icon_title.png">
            </span>
            <span>全球品牌旗舰店</span>
          </h2>
          <ul class="metra-list-two">
            <li v-for="(item, index) in brands">
              <img :src="item" alt="">
            </li>
          </ul>
        </section>
        <section class="list-items">
          <h2 class="items-title">
            <span class="head_bg">
              <img src="http://f0.jmstatic.com/btstatic/h5/common/icon_title.png">
            </span>
            <span>疯抢专场 早10点上新</span>
          </h2>
          <li class="item-list" v-for="(item, index) in pops" :keys="index">
            <div class="pop-image">
              <img alt="" v-lazy="item.img">
            </div>    
          </li>
        </section>
        
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
        {img: 'http://mp5.jmstatic.com//jmstore/image/000/003/3266_std/59c485f7f3728_2048_1024.jpg?1506079705&imageView2/2/w/640/q/90'},
        {img: 'http://mp6.jmstatic.com//jmstore/image/000/006/6282_std/59ba1677abc0e_2048_1024.jpg?1506061433&imageView2/2/w/640/q/90'},
        {img: 'http://mp5.jmstatic.com//jmstore/image/000/006/6377_std/59c4b5d0b637c_2048_1024.jpg?1506070511&imageView2/2/w/640/q/90'},
        {img: 'http://mp6.jmstatic.com//jmstore/image/000/004/4369_std/59bb4077b6b7a_2048_1024.jpg?1506065073&imageView2/2/w/640/q/90'},
        {img: 'http://mp6.jmstatic.com//jmstore/image/000/005/5151_std/59c0fc0d1c986_2048_1024.jpg?1505962440&imageView2/2/w/640/q/90'},
      ],
      brands: [
        'http://p0.jmstatic.com/pop_store/000/003/3247_std/57b557db8214b_320_320.jpg?1474536101',
        'http://p0.jmstatic.com/pop_store/000/002/2892_std/57fb2e1891a0f_320_320.jpg?1482919085',
        'http://p0.jmstatic.com/pop_store/000/003/3147_std/57a013e9a2685_320_320.jpg?1490690189',
        'http://p0.jmstatic.com/pop_store/000/003/3315_std/57ad73dc82817_320_320.jpg?1474534192',
        'http://p0.jmstatic.com/pop_store/000/005/5445_std/597ad5c4d9642_320_320.jpg?1501223372',
        'http://p0.jmstatic.com/pop_store/000/002/2340_std/59507d9268dbd_320_320.jpg?1498447350',
        'http://p0.jmstatic.com/pop_store/000/002/2762_std/597847b5b7d01_320_320.jpg?1501148809',
        'http://p0.jmstatic.com/pop_store/000/002/2762_std/5773387eade00_320_320.jpg?1474534895'
      ],

    }
  },
  methods: {
    _initScroll () {
      this.popScroll = new BScroll(this.$refs.popWrapper, {
        click: true,
        probeType: 3
      })
    }
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
    margin-top -0.1rem
    margin-bottom .5rem
    height 14rem
    .list-items
      font-size .5rem
      border-line()
      .metra-list-one
        margin-top .1rem
        overflow hidden
        padding-bottom .5rem
        padding-left .2rem
        span
          width 45%
          height 2.1rem
          display inline-block
          float left
          padding 0rem 0.2rem
          img
            width 100%
      .metra-list-two
        overflow hidden
        li
          float left
          width 2.5rem
          height 2.5rem
          img 
            width 100%
      .items-title
        width 100%
        text-align center
        height 1.3rem
        line-height 1.3rem
        margin-left .1rem
        font-size .48rem
        .head_bg
          width .826rem
          height 2.133rem
          position relative
          right .1rem
          img
           width 4%
    .item-list
      background #ffffff
      height 5rem
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
