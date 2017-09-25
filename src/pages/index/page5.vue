<template lang="html">
  <div class="page">
    <div class="content" ref="popWrapper">
      <ul>
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
        {img: 'http://mp5.jmstatic.com//jmstore/image/000/002/2620_std/59ae1bf852754_2048_1024.jpg?1505802135&imageView2/2/w/640/q/90'},
        {img: 'http://mp5.jmstatic.com//jmstore/image/000/003/3345_std/59c4d2e1691f7_2048_1024.jpg?1506074156&imageView2/2/w/640/q/90'},
        {img: 'http://mp5.jmstatic.com//jmstore/image/000/003/3072_std/59c3660005f97_2048_1024.jpg?1506044242&imageView2/2/w/640/q/90'},
        {img: 'http://mp5.jmstatic.com//jmstore/image/000/003/3548_std/599f8fefe01ba_2048_1024.jpg?1505889235&imageView2/2/w/640/q/90'},
        {img: 'http://mp6.jmstatic.com//jmstore/image/000/001/1021_std/59c31ea32650b_2048_1024.jpg?1505979165&imageView2/2/w/640/q/90'},
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
  .header
    position fixed
    left 0
    right 0
    top .1rem
    right 0
    height 1.24rem
    border-1px()
    line-height 1.24rem
    font-size .52rem
    text-align center
  .nav
    margin-left 1rem
    padding .1rem 0
  .content
    margin-top -0.1rem
    margin-bottom .5rem
    height 14rem
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
