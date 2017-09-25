<template lang="html">
  <div class="productInfo">
    <img-scale v-if="showImg" @clickIt="viewImg" :imgSrc="imgSrc"></img-scale>
    <div class="product-wrapper" ref="productWrapper">
      <div>
        <article class="slide_wrap">
          <mt-swipe @change="handleChange" :auto="0">
            <mt-swipe-item v-for="(img, index) in product.imgs" :key="index">
              <img :src="img" alt="" @click="clickImg($event)">
            </mt-swipe-item>  
          </mt-swipe>
        </article>
        <article class="prop_detail ">
          <div class="price_info">
            ￥<strong class="cur_price">{{product.nowPrice}}</strong>
            <span class="right">
              <span class="cost_price price-line">￥{{product.oldPrice}}</span>
              <span class="buyNum">{{product.buyNum}}人已购买</span>
            </span>
          </div>
          <div class="count_down">
            <div class="left">距结束仅剩</div>
            <span>{{hour}}</span>时
            <span>{{min}}</span>分
            <span>{{sec}}</span>秒
          </div>
        </article>
        
        <article class="desc_wrap border-line ">
          <span class="desc_icon">自营</span>
          {{product.detail}}
        </article>
        <div class="additional-info border-line">
          <div class="wrap border-1px hasline">
            <div class="type">分期</div>
            <div class="content">
              <span class="detail">满1元即可加钱换购</span>
              <span class="arrow-icon-right">
                <img src="../../assets/icon/arrow_right.png" alt="">
              </span>
            </div>
          </div>
          <div class="wrap border-1px hasline">
            <div class="type">促销</div>
            <div class="content">
              <span class="detail">该商品最多可享12期分期购买福利</span>
              <span class="arrow-icon-right">
                <img src="../../assets/icon/arrow_right.png" alt="">
              </span>
            </div>
          </div>
          <div class="wrap hasline">
            <div class="type">运费</div>
            <div class="content">
              <span class="detail">本商品满299元或2件包邮</span>
              <span class="arrow-icon-right">
                <img src="../../assets/icon/arrow_right.png" alt="">
              </span>
            </div>
          </div>
          <div class="wrap">
            <div class="type">说明</div>
            <div class="content">
              <span class="detail detail-hook">
                <img src="../../assets/icon/hook.png" alt="">税费说明
              </span>
              <span class="arrow-icon-right">
                <img src="../../assets/icon/arrow_right.png" alt=""></span>
            </div>
          </div>
        </div>
        <article class="choose-info border-line">
          <span class="title_name">请选择</span>
          <span class="select_value">型号</span>
          <span class="arrow-icon-right">
            <img src="../../assets/icon/arrow_right.png" alt=""></span>
          </span>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ImgScale from '@/components/ImgScale.vue'

export default {
  data () {
    return {
      array: [],
      hour: 10,
      min: 30,
      sec: 60,
      showImg: false,
      imgSrc: ''
    }
  },
  created () {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    // this.$nextTick(() => {
    //    this.pageScroll = new BScroll(this.$refs.productWrapper, {
    //     click: true
    //   })
    // })
    this.interval = setInterval(() => {
      if(this.sec > 0) {
        let newSec = Math.round((this.sec - 0.1)*10)/10 + ''
        // math round 四舍五入 先扩大一倍 在除去自身
        // console.log((newSec + '').split('.')[1] ==  undefined)
        if(newSec.split('.')[0].length == 1) {
          newSec = '0' + newSec
        }
        if((newSec).split('.')[1] ==  undefined){
          this.sec = newSec + '.0'
        } else {
          this.sec = newSec
        }
      } else {
        this.sec = 60
        if(this.min > 0) {
            this.min--
        } else {
          this.min = 60
          this.hour--
        }
      }
      if(this.hour == 0 && this.min == 0 && this.sec == 0)
      clearInterval(this.interval)
    }, 100)
  },
  computed: {
    product () {
      // 等数据渲染完成 在加载
      this.$nextTick(() => {
         this.pageScroll = new BScroll(this.$refs.productWrapper, {
          click: true
        })
      })
      // 或者来使用mapGetters 需要在computed里面 会随着依赖的改变而改变 但是data只会在创建时候声明一次
      return this.$store.state.productInfo
    }
  },
  methods: {
    clickImg (e) {
      // 获得当前点击的图片地址 
      this.showImg = true
      this.imgSrc = e.currentTarget.src //获得当前的点击项目 e.currentTarget
    },
    viewImg () {
      this.showImg = false
    },
    handleChange () {}
  },
  components: {
    'img-scale': ImgScale
  }

}
</script>

<style lang="stylus" type="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.productInfo
  position absolute
  left 0
  right 0
  bottom 1.4rem
  top 1.24rem
  width 100%
  display flex
  overflow hidden
  box-sizing border-box
  .product-wrapper
    flex 1
    .slide_wrap
      height 10rem
      .mint-swipe-indicators.is-active
        background mainColor
        opacity 1
      .mint-swipe-item 
        width 10rem
        img
          width 10rem
          height 100%
    .prop_detail
      width 10rem
      height 1.5625rem
      background mainColor
      display flex
      color #fff
      align-items center
      padding 0rem 0.341rem
      .price_info
        font-size numFont
        position relative
        flex 1
        .cur_price
          font-size 1.09375rem
        .right
          .cost_price
            price-line(#fff,1)
            position absolute
            margin-left .1rem
            top .1rem
          .buyNum
            position absolute
            margin-left .15rem
            top .65rem
      .count_down
        font-size .3875rem
        padding-right .341rem
        flex .8
        .left
          display block
          margin-left 1.3rem
          padding-bottom .2rem
        span
          background #fff
          color #000
          display inline-block
          padding .08rem .08rem 0.1rem
          font-size numFont
          margin-right .1rem
          border-radius 20%
          text-align center
    .desc_wrap
      padding 0.341rem
      font-size mainFont
      position relative
      border-line()
      padding-bottom .5rem
      line-height .6rem
      width 9.3rem
      .desc_icon
        background mainColor
        color #fff
        line-height 1px
        font-size 0.4rem
        width 1rem
        padding .05rem
        border-radius 10%
        margin-left .1rem
    .additional-info
      padding 0rem 0.341rem
      position relative
      border-line()
      .hasline
        border-1px(92%)
      .wrap
        height 1.20625rem
        line-height 1.20625rem
        position relative
        padding-right .341rem
        font-size .4rem
        .type
          display inline-block
          color fontTint
          padding-right .8rem
        .content
          display inline-block
          .detail
            height 1.20625rem
            img
              display inline-block
              vertical-align middle
              width 8%
              padding-bottom .1rem
        .arrow-icon-right
          position absolute
          right .741rem
          top .12rem
          height .5rem
          width .5rem
          img
            height 100%
    .choose-info
      height 1.20625rem
      line-height 1rem
      position relative
      padding 0rem .341rem
      border-line()
      font-size .4rem
      color fontTint
      .select_value
        color #000
        padding-left .8rem
      .arrow-icon-right
        width .75rem
        height .75rem
        position absolute
        right 1.2rem
        top .12rem
        img
          height 100%



</style>
