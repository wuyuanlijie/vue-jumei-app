<template lang="html">
  <div class="detail_msg_img">
    <div class="detail_wrapper" ref="imgsWrapper">
      <div>
        <img v-lazy="item" v-for="(item, index) in product.imgDetail">
        <p>
          <img src="http://p0.jmstatic.com/templates/jumei/images/baoxian_pop.jpg" alt="">
          <img src="http://f0.jmstatic.com/btstatic/h5/htbsqH5.jpg" >
          <img src="http://p0.jmstatic.com/mobile/other/other/marketprice_h5.png" alt="">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
    }
  },
  created () {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
  },
  computed: {
    product () {
      // 等数据渲染完成 在加载
      // 或者来使用mapGetters 需要在computed里面 会随着依赖的改变而改变 但是data只会在创建时候声明一次
      return this.$store.state.productInfo
    }
  },
  mounted () {
    this.$nextTick(() => {
       this.imgsScroll = new BScroll(this.$refs.imgsWrapper, {
        click: true
      })
    })
  }

}
</script>

<style lang="stylus" type="stylesheet/stylus">
.detail_msg_img
  display flex
  overflow hidden
  position absolute
  left 0
  right 0rem
  bottom .2rem
  top 1.27rem
  .detail_wrapper
    position relative
    flex 1
    img[lazy=loading]
      display block
      height 100%
      background #000
      margin auto
    img
      display block
      width 100%

</style>
