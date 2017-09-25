<template lang="html">
  <ul class="online-wrap">
    <li class="deal-item border-line" v-for="(good, index) in goodsList"
      :key="index" @click="findProduct(good.id)">
      <div class="good-img">
        <img  alt="图片" v-lazy="good.imgs[0]">
      </div>
      <div class="good-detail">
        <div class="good-title">{{good.title}}</div>
        <div class="price-wrap">
          <div class="price-list">
            <span class="jumei-price">￥{{good.nowPrice}}</span>
            <span class="del-price price-line">￥{{good.oldPrice}}</span>
          </div>
          <div class="buy-num">{{good.buyNum}}人购买</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
   
    }
  },
  computed: {
    goodsList () {
      let data = JSON.parse(JSON.stringify(this.$store.state.activityList))
      data.push(...this.$store.state.activityList)
      return data
    }
  },
  methods: {
    findProduct(id) {
      let isfind = false
      // 可以进行async异步处理
      axios.get("/api/data").then(res => {
        this.$store.dispatch('productInfo', res.data.activityLists[id-1])
        // 在这里添加路由就不会出现调整页面的数据替换 异步
        this.$router.push({name:"product", params: {id:id}})
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
@import '../common/stylus/mixin.styl'
.online-wrap
  padding-bottom .6rem
  .deal-item
    position relative
    border-line()
    padding .266667rem 0.241rem
    display flex
    position relative
    .good-img
      display inline-block
      width 3.40625rem
      height 2.96875rem
      img
        height 100%
      img[lazy=loading]
        height 100%
        margin auto
        background fontTint
    .good-detail
      padding-left .21875rem
      width 9rem
      .good-title
        font-size .3675rem
        line-height .5rem
        width 60%
      .price-wrap
        position absolute
        color fontTint
        bottom 10%
        .price-list
          .jumei-price
            color mainColor
            font-size .5125rem
          .del-price
            position relative
            font-size .275rem
            price-line(fontTint, .2)
        .buy-num
          padding .1rem
          font-size 12px
</style>
