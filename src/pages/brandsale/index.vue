<template lang="html">
  <div class="page">
    <div class="header">
      名牌特卖
    </div>
    <navbar :chooseItem="2" :navs="navs" class="nav" marginPx="1"></navbar>
    <div class="content" ref="popWrapper">
      <ul>
        <li class="item-list" v-for="(item, index) in pops" :keys="index">
          <div class="pop-image">
            <img alt="" v-lazy="item.img">
          </div>
          <div class="pop-info">
            <div class="left-info">
              <p class="pop-title">{{item.title}}</p>
              <p class="timer">{{item.timer}}</p>
            </div>
            <div class="right-logo">
              <img :src="item.logo" alt="">
            </div>
          </div>
        </li>
      </ul> 
    </div>
  </div>
</template>

<script>
import navbar from '@/components/NavBar.vue'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      navs:['服饰运动','家居品牌','鞋包配饰'],
      pops: [
        {
          img: 'http://mp6.jmstatic.com//jmstore/image/000/005/5096_std/59c20706ac6a9_2048_1024.jpg?1506064698&imageView2/2/w/640/q/90',
          title: 'MLB棒球帽专场',
          timer: '剩余02剩天16时',
          logo: 'http://p0.jmstatic.com/brand/logo_180/14835.jpg'
        },
        {
          img: 'http://mp6.jmstatic.com//jmstore/image/000/000/828_std/59c1d9660fb71_2048_1024.jpg?1505884641&imageView2/2/w/640/q/90',
          title: '艾微妮 换季底价促销',
          timer: '剩余01剩天16时',
          logo: 'http://p0.jmstatic.com/brand/logo_180/2133.jpg'
        },
        {
          img: 'http://mp5.jmstatic.com//jmstore/image/000/002/2200_std/59bf9c4a2c0a6_2048_1024.jpg?1505889335&imageView2/2/w/640/q/90',
          title: '秋冬新款89元2双起',
          timer: '剩余00剩天16时',
          logo: 'http://p0.jmstatic.com/brand/logo_180/9978.jpg'
        },
        {
          img: 'http://mp5.jmstatic.com//jmstore/image/000/005/5271_std/59c0ba92ae803_2048_1024.jpg?1506060726&imageView2/2/w/640/q/90',
          title: '阿迪耐克运动鞋专场',
          timer: '剩余00剩天16时',
          logo: 'http://p0.jmstatic.com/brand/logo_180/15045.jpg'
        },
        {
          img: 'http://mp5.jmstatic.com//jmstore/image/000/005/5961_std/59c3bc7e898d7_2048_1024.jpg?1506002564&imageView2/2/w/640/q/90',
          title: '迪赛吉普 季末清仓',
          timer: '剩余00剩天16时',
          logo: 'http://p0.jmstatic.com/brand/logo_180/7882.jpg'
        },
      ]
    }
  },
  components: {
    navbar
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
    height 14rem
    .item-list
      background #ffffff
      height 6.8rem
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
          height 6.8rem
          background #000
          margin auto
      .pop-info
        padding 0.4rem
        overflow hidden
        display flex
        height 1rem
        align-items center
        .left-info
          flex 2
          .pop-title
            font-size 14px
            color #333
            line-height 14px
          .timer
            margin-top .2rem
            color #999
            font-size 12px
            line-height 12px
            height 12px
        .right-logo
          flex 1
          padding-left .5rem
          img
            width 90%
          
</style>
