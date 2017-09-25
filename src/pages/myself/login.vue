<template lang="html">
  <transition name="fade">
    <div class="wrapper" v-show="show">
      <mt-header title="登录" class="header">
        <router-link to="/myself" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button  slot="right">注册</mt-button>
      </mt-header>
      <div class="login-wrapper" ref="loginWrapper">
        <div>
          <ul class="login-types">
            <li class="login-item">
              <span class="logo"><img src="../../assets/logintype/qq.png" alt=""></span>
              <p class="title">QQ</p>
            </li>
            <li class="login-item">
              <span class="logo"><img src="../../assets/logintype/wechat.png" alt=""></span>
              <p class="title">微信</p>
            </li>
            <li class="login-item">
              <span class="logo"><img src="../../assets/logintype/alipay.png" alt=""></span>
              <p class="title">支付宝</p>
            </li>
            <li class="login-item">
              <span class="logo"><img src="../../assets/logintype/blog.png" alt=""></span>
              <p class="title">新浪微博</p>
            </li>
          </ul>
          <form class="login-form">
            <div class="other-login">
              或使用是手机登录
            </div>
            <div class="input_phone">
              <input type="text" maxlength="11" placeholder="请输入正确手机号" v-model="phoneInput">
              <div class="register_yzm" 
                @click="yzphone"
                :class="isYzActive?'yzActive':''">
                验证
              </div>
            </div>
            <div class="input_yzm">
              <input type="text" maxlength="6" name="" placeholder="请输入6位验证码" v-model="yzmInput">
            </div>
            <div class="register_jm_account">
              使用聚美账号登录
            </div>
            <span
              class="register_button"
              @click="loginJM"
              :class="isSubmit?'submitActive':''" >登录</span>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {MessageBox} from 'mint-ui'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      loginVisible: false,
      show: true,
      phoneInput: '',
      yzmInput: '',
      isYzActive: false,
      isSubmit: false,
    }
  },
  props: {
    isLogin: Boolean
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    this.$nextTick(() => {
      this._initScroll()
    })

    // this.productId = this.$route.params.id
  },
  watch: {
    isLogin () {
      this.loginVisible = this.isLogin
    },
  　'$route' (to, from) {
      alert(this.$route.path)
      console.log(to.path)
      console.log(from.path)
    },
    "phoneInput" () {
      if(this.phoneInput.length == 11) {
        this.isYzActive = true
      } else {
        this.isYzActive = false
      }
    },
    "yzmInput" () {
      if (this.phoneInput.length==11 && this.yzmInput.length == 6) {
        this.isSubmit = true
      } else {
        this.isSubmit = false
      }
    }
  },
  methods: {
    _initScroll () {
      this.mineScroll = new BScroll(this.$refs.loginWrapper, {
        click: true,
        probeType: 3
      })
    },
    testPhone (phone) {
      return (/^1[1|3|4|5|7|8][0-9]{9}$/).test(phone)
    },
    yzphone () {
      // 通过test来检测字符串 是正则表达式的方法
      if(!this.testPhone(this.phoneInput)) {
        this.phoneInput = " "
        this.yzmInput = " "
        alert('输入手机号错误！')
      } else {
        console.log("输入的号码正确！")
      }
    },
    loginJM () {
      if(this.phoneInput.length==11 && this.yzmInput.length == 6 && this.testPhone(this.phoneInput) && this.testPhone(this.phoneInput)) {
        MessageBox.alert('登录成功!').then(action => {
          this.$router.push('/myself')
          var user = "user"
          var storage = window.localStorage
          storage.setItem("user", this.phoneInput)
          console.log(storage.getItem('user'))
        })
      
      } else {
        MessageBox.alert('手机号或验证输入错误！').then(action => {
          this.phoneInput = " "
          this.yzmInput = " "
        })
      }

    }
  },
  
}
</script>

<style lang="stylus" type="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.wrapper
  height 100%
  width 100%
  overflow hidden
  // 1、fade-enter-active 进入过渡的结束状态，元素被插入时就生效，过渡过程完成之后移除
  // 2、fade-leave-active 离开过渡的结束状态 元素删除时生效，离开过渡完成后删除
  // 他们在整个进入离开的过程都有效 贯穿与整个过渡过程 这里就可以设置transition 总时间
  &.fade-enter-active, &.fade-leave-active
    transition transform .5s
    opacity 1
  // 3、fade-enter 进入过渡的开始状态，元素被插入的生效，只应用一帧后失效
  // 4、fade-leave
  // 这里就是从过渡开始到结束的 过渡状态声明最佳时间 
  // opacity 在过渡的开始离开的时候透明度都为0 即不显示  
  // y 100%就是以左上角的为坐标点 最下面的位置开始 过渡 代表的是进入的位置
  &.fade-enter, &.fade-leave-active
    transform translate3d(0, 100%,0)
    opacity 1
  .header
    padding 0rem .5rem
    height 1.3rem
    background #fff
    z-index 1000
    font-size .5rem
    color #000
    border-1px()
    .mint-header-title
      font-size 2rem
    .is-right
      vertical-align middle
  .login-wrapper
    height 14rem
    .login-types
      display flex
      padding .7rem .05rem .933333rem
      .login-item
        flex 1
        text-align center
        font-size .3rem
        color fontTint
        .logo
          height 1.2rem
          width 1.2rem
          display inline-block
          padding-bottom .266667rem
          img
            height 100%
    .login-form
      padding 0rem .54rem 0rem
      height 11rem
      color fontTint
      box-sizing border-box
      .other-login
        padding-bottom .666667rem
        width inherit
        text-align center
      .input_phone
        width inherit
        font-size .4rem
        // height .933333rem
        input
          width 4.853333rem
          height .7rem
          background #F6F6F6
          border-radius 10rem
          padding .2rem .5rem
        .register_yzm
          display inline-block
          margin-left .266667rem
          width 2.5rem
          height 1rem
          margin-top -.12rem
          line-height 1.06rem
          border 1px solid #feb2c5
          text-align center
          color #feb2c5
          vertical-align middle
          border-radius 1rem
          &.yzActive
            color mainColor
            border 1px solid mainColor
      .input_yzm
        margin-top .533333rem
        font-size .4rem
        input
          width 87.8%
          height .7rem
          background #F6F6F6
          border-radius 10rem
          padding .2rem .5rem
      .register_jm_account
        padding .4rem 0rem .5rem
        color mainColor
        font-size .3rem
      .register_button
        width 99%
        height 1.1rem
        font-size .44rem
        background #feb2c5
        color #fff
        border-radius 1rem
        line-height 1.1rem
        text-align center
        display inline-block
        &.submitActive
          background mainColor
          color #fff
</style>
