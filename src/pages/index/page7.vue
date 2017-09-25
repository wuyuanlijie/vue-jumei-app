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
      navs:['服饰运动','家居品牌','鞋包配饰'],
      pops: [
        {img: 'http://mp7.jmstatic.com/product/003/885/3885746_std/3885746_1000_1000.jpg@base@tag=imgScale&w=800&q=90?v=1505532027',},
        {img: 'http://mp6.jmstatic.com/product/003/781/3781300_std/3781300_1000_1000.jpg?v=1505095340&imageView2/2/w/800/q/90'},
        {img: 'http://mp5.jmstatic.com/product/003/690/3690558_std/3690558_1000_1000.jpg?v=1498205617&imageView2/2/w/800/q/90'},
        {img: 'http://mp6.jmstatic.com/product/000/827/827128_std/827128_1000_1000.jpg?v=1504669693&imageView2/2/w/800/q/90'},
        {img: 'http://mp5.jmstatic.com/product/003/597/3597234_std/3597234_1000_1000.jpg?v=1504773864&imageView2/2/w/800/q/90'},
        
        
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
    margin-top .2rem
    margin-bottom 5rem
    height 14rem
    .item-list
      background #ffffff
      height 10rem
      &:last-child
        padding-bottom 2rem
      .pop-image
        width 100%
        img
          width 100%
        img[lazy=loading]
          display block
          width  100%
          height 10rem
          background #000
          margin auto
     
</style>
