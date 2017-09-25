<template lang="html">
  <transition name="fade">
    <div class="set-wrapper" ref="setWrapper">
      <div>
        <mt-header title="设置" class="header">
          <router-link to="/myself" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
      </mt-header>
      <div class="block b1">
        <mt-cell title="个人资料" class="underline"></mt-cell>
        <mt-cell title="账号绑定"></mt-cell>
      </div>
      <div class="block b2">
        <mt-cell title="收货地址管理" class="underline"></mt-cell>
        <mt-cell title="实名认证管理" class="underline"></mt-cell>
        <mt-cell title="快递黑名单" class="underline"></mt-cell>
        <mt-cell title="所在地区" ></mt-cell>
      </div>
      <div class="block b3">
        <mt-cell title="新消息设置"></mt-cell>
      </div>
      <div class="block b4">
        <mt-cell title="清理缓存"  class="underline"></mt-cell>
        <mt-cell title="关于聚美" class="underline"></mt-cell>
        <mt-cell title="日志上传"></mt-cell>
      </div>
      <div class="signout">
        <button @click="loginout">登出账号</button>
      </div>
      </div>
    </div>

  </transition>
  
</template>

<script>
import BScroll from 'better-scroll'
import { MessageBox } from 'mint-ui'

export default {
  created () {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    // 异步的 让数据渲染完 才执行！ 这样就保证了所有数据存在
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll () {
      this.setWrapper = new BScroll(this.$refs.setWrapper, {
        click: true,
        probeType: 3
      })
    },
    loginout () {
      MessageBox.alert('退出登录成功!').then(action => {
        storage.setItem('user', '')
        this.$router.push('/myself')
      })
    }
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.mint-cell
  .mint-cell-wrapper
    font-size 13px
.set-wrapper
  &.fade-enter-active, &.fade-leave-active
    transition transform .5s
    opacity 1
  &.fade-enter, &.fade-leave-active
    transform translate3d(100%, 0,0)
    opacity 1
  position absolute
  left 0
  right 0 
  bottom 0
  top 0
  background bgColor
  overflow hidden
  .header
    padding 0.64rem
    color #000000
    background #ffffff
    font-size 0.51375rem
    border-1px()
  .b1,.b2,.b3,.b4
    padding-top .26rem
  .block
    .mint-cell
      padding 0rem 0.4rem
      .mint-cell-wrapper
        arrow-right(.2rem, .7rem, 9.2rem)
    .underline
      border-1px(90%, 5%)
  .signout
    height 3rem
    width 10rem
    background bgColor
    text-align center
    button
      display inline-block
      background #ffffff
      height 1.1rem
      width 7.5rem
      margin-top 0.625rem
      border none
      border-radius 10rem
      color fontColor
      font-size 16px
</style>
