<template lang="html">
  <div class="page">
    <div class="content" ref="popWrapper">
      <ul>
        <section class="list-items">
          <div class="metra-list-one">
            <span><img src="http://mp5.jmstatic.com/mobile/card_material/item_5518_1024_512-ipad2048_1503468995.jpeg?imageView2/2/w/320/q/90" alt=""></span>
            <span><img src="http://mp7.jmstatic.com/mobile/card_material/item_5518_1024_512-ipad2048_1503469024.jpeg@base@tag=imgScale&w=320&q=90" alt=""></span>
          </div>
        </section>
        <section class="list-items">
          <h2 class="items-title">
            <span class="head_bg">
              <img src="http://f0.jmstatic.com/btstatic/h5/common/icon_title.png">
            </span>
            <span>全球热销品牌</span>
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
            <span>活动推荐</span>
          </h2>
          <ul class="metra-list-three">
            <li v-for="(item, index) in products">
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
        {img: 'http://mp5.jmstatic.com//jmstore/image/000/006/6355_std/59bf47d8dbf8c_1024_512.jpg?1505716382&imageView2/2/w/640/q/90'},
        {img: 'http://mp6.jmstatic.com//jmstore/image/000/005/5869_std/599e789e346fe_1024_512.jpg?1505804622&imageView2/2/w/640/q/90'},
        {img: 'http://mp6.jmstatic.com//jmstore/image/000/005/5869_std/59c0c6cce3d67_1024_512.jpg?1505880612&imageView2/2/w/640/q/90'},
        {img: 'http://mp5.jmstatic.com//jmstore/image/000/005/5869_std/59bf6ee030b37_1024_512.jpg?1505718079&imageView2/2/w/640/q/90'},
        {img: 'http://mp6.jmstatic.com//jmstore/image/000/001/1819_std/59c38e0144566_1024_512.jpg?1505988170&imageView2/2/w/640/q/90'},
      ],
      brands: [
        'http://mp5.jmstatic.com/mobile/card_material/item_2386_512_512-ipad2048_1502086238.jpeg?imageView2/2/w/160/q/90',
        'http://mp5.jmstatic.com/mobile/card_material/item_2386_512_512-ipad2048_1498543173.jpeg?imageView2/2/w/160/q/90',
        'http://mp5.jmstatic.com/mobile/card_material/item_2386_512_512-ipad2048_1498559288.jpeg?imageView2/2/w/160/q/90',
        'http://mp5.jmstatic.com/mobile/card_material/item_2386_512_512-ipad2048_1498543472.jpeg?imageView2/2/w/160/q/90',
        'http://mp6.jmstatic.com/mobile/card_material/item_2386_512_512-ipad2048_1498543621.jpeg?imageView2/2/w/160/q/90',
        'http://mp5.jmstatic.com/mobile/card_material/item_2386_512_512-ipad2048_1498543566.jpeg?imageView2/2/w/160/q/90',
        'http://mp5.jmstatic.com/mobile/card_material/item_2386_512_512-ipad2048_1498543264.jpeg?imageView2/2/w/160/q/90',
        'http://mp6.jmstatic.com/mobile/card_material/item_2386_512_512-ipad2048_1498543700.jpeg?imageView2/2/w/160/q/90'
      ],
      products: [
        'http://mp6.jmstatic.com/mobile/card_material/item_5640_1024_1024-ipad2048_1505991108.jpeg?imageView2/2/w/320/q/90',
        'http://mp5.jmstatic.com/mobile/card_material/item_5640_1024_1024-ipad2048_1505874638.jpeg?imageView2/2/w/320/q/90',
        'http://mp5.jmstatic.com/mobile/card_material/item_5640_1024_1024-ipad2048_1505806477.jpeg?imageView2/2/w/320/q/90',
        'http://mp5.jmstatic.com/mobile/card_material/item_5640_1024_1024-ipad2048_1505727603.jpeg?imageView2/2/w/320/q/90',
        'http://mp5.jmstatic.com/mobile/card_material/item_5640_1024_1024-ipad2048_1505716829.jpeg?imageView2/2/w/320/q/90',
        'http://mp6.jmstatic.com/mobile/card_material/item_5640_1024_1024-ipad2048_1505988268.jpeg?imageView2/2/w/320/q/90',
      ]
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
        display flex
        width 10rem
        margin-top .1rem
        span
          width 5rem
          display inline-block
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
      .metra-list-three
        overflow hidden
        li
          float left
          width 5rem
          height 5rem
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
