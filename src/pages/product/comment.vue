<template lang="html">
  <div class="comments">
    <img-scale v-if="showImg" @clickIt="viewImg" :imgSrc="imgSrc"></img-scale>
    <div class="comment-wrapper" ref="commentWrapper">
      <ul>
        <li class="comment-item border-1px" v-for="(item, index) in comments" :key="index">
          <div class="customer-info">
            <img :src="item.avatar" alt="">
            <span class="detail">
              <p class="name">{{item.name}}</p>
              <span class="block">{{item.member}}  加入聚美{{item.joinTime}}天</span>
            </span>
            <span class="buyTime">购买于 {{item.buyTime}}</span>
          </div>
          <p class="comment-detail">
            {{item.comment}}
          </p>
          <p class="comment-img">
            <img :src="img" alt="" v-for="img in item.imgs" @click="clickImg($event)">
          </p>
          <div class="type-block">
            <span class="type">型号: {{item.type}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ImgScale from '@/components/ImgScale.vue'
export default {
  data () {
    return {
      imgSrc: '',
      showImg: false
    }
  },
  created () {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
  },
  computed: {
    comments () {
      return this.$store.state.productInfo.comments
    }
  },
  mounted () {
    this.$nextTick(() => {
       this.commentScroll = new BScroll(this.$refs.commentWrapper, {
        click: true
      })
    })
  },
  components: {
    'img-scale': ImgScale
  },
  methods: {
    clickImg (e) {
      this.showImg = true
      this.imgSrc = e.currentTarget.src
    },
    viewImg () {
      this.showImg = false
    },
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.comments
  display flex
  overflow hidden
  position absolute
  left 0
  right 0rem
  bottom 1.45rem
  top 1.27rem
  .comment-wrapper
    padding 0rem .58375rem 0rem .59375rem
    flex 1
    .comment-item
      border-1px(100%)
      padding-bottom  .5rem
      padding-top .4375rem
      padding .4275rem 0px .42875rem 0px
      .customer-info
        height 1rem
        padding-bottom .2825rem
        position relative
        img
          height 1rem
          width 1rem
          border-radius 50%
          vertical-align top
        .detail
          display inline-block
          padding .1rem
          .name
            font-size mainFont
          .block
            display inline-block
            margin-top .1rem
            color fontTint
            smallFont()
        .buyTime
          display inline-block
          color fontTint
          smallFont()
          position absolute
          right -.3rem
          top 0
      .comment-detail
        line-height .45rem
        -webkit-line-clamp 5
        text-overflow ellipsis
        display -webkit-box
        overflow hidden
        -webkit-box-orient vertical
      .comment-img
        padding-top .40625rem
        overflow hidden
        img
          display inline-block
          width 2.87625rem
          height 2.87625rem
          padding-bottom .0625rem
          &:nth-child(1), &:nth-child(2)
            margin-right .09rem
      .type-block
        padding-top .2825rem
        color fontTint
        smallFont(.9)
</style>
