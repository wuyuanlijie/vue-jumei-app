<template lang="html">
  <div class="nav">
    <div class="nav-wrapper" ref="navWrapper">
      <ul>
        <li class="nav-item" v-for="(item,index) in navs" 
          :style="{marginRight: marginPx + 'rem'}"
          @click="isActive(index)" :class="chooseId==index?'is-selected':''">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      chooseId: '0',
    }
  },
  props: {
    navs: Array,
    chooseItem: Number,
    marginPx: {
      type: String,
      default: '.555625'
    }
  },
  methods: {
    isActive (index) {
      this.chooseId = index
      // 利用vuex 来进行状态管理 不适用emit
      // this.$emit('selectNav', index)
      this.$store.state.navState = this.chooseId
    }
  },
  created () {
    this.$nextTick(() => {
      this.navScroll = new BScroll(this.$refs.navWrapper, {
        click: true,
        scrollX: true,
        eventPassthrough: 'vertical'
      })
    })
  },
  watch: {
    "chooseItem" () {
      this.chooseId = this.chooseItem-1
    }
  },


}
</script>

<style lang="stylus" type="stylesheet/stylus">
@import '../common/stylus/mixin.styl'

.nav-wrapper
  overflow hidden
  width 100%
  // position fixed
  // top 6%
  ul
  // 不换行
    min-width 118%
    white-space nowrap
    margin .3875rem .265625rem 0rem 0.341rem
    .nav-item
      display inline-block
      font-size .446667rem
      min-width .9rem
      color fontColor
      height .5rem
      &.is-selected
        color #FE4070
        padding-bottom .25rem
        border-bottom .05rem solid #FE4070

</style>
