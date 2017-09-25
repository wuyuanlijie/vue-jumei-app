<template >
  <div class="page">
    <mt-header fixed title="未登录" class="header">
      <mt-button icon="" slot="right" class="icon" @click="setterClick">
        <img src="static/mine/setwhite.png" alt="">
      </mt-button>
      <mt-button icon="" slot="right" class="icon" >
        <img src="static/mine/msgwhite.png" alt="">
      </mt-button>
    </mt-header>
    <div class="wrapper" ref="mineWrapper">
      <div>
        <div class="user-block">
          <div class="user-login">
            <div class="user-logo">
              <img src="../../assets/bg/jumeibg2.jpg" alt="">
            </div>
            <div class="operation" @click="loginClick" v-if="!userLogin">
              <span class="signup">注册</span>
              <span class="separator"></span>
              <span class="login">登录</span>
            </div>
            <div class="login-success" v-if="userLogin">
              <div class="username">{{userLogin}}</div>
              <div class="autograph">我需要一个长势旺盛的个性签名</div>
            </div>
          </div>
          <ul class="user-info">
            <li class="item"><span>0</span><p>粉丝</p></li>
            <li class="item"><span>0</span><p>关注</p></li>
            <li class="item"><span>0</span><p>帖子</p></li>
            <li class="item"><span></span><p>个人资料</p></li>
          </ul>
          <div class="user-mask">
            <img src="../../assets/bg/jumeibg2.jpg" alt="">
          </div>
          <div class="fint-mask"></div>
        </div>
        <div class="order-fund-block">
          <div class="block-title">
            <span>买买买</span>
            <span class="block-title-nav">查看全部订单</span>
          </div>
          <ul class="order-content content">
            <li class="item" v-for="(item, index) in orderContent" :key="index">
              <span class="order-logo">
                <img :src="item.src" alt="">
              </span>
              <p>{{item.title}}</p>
            </li>
          </ul>
          <ul class="fund-content content">
            <li class="item" v-for="(item, index) in fundContent" :key="index">
              <span class="value">{{item.number}}</span>
              <p>{{item.title}}</p>
            </li>
          </ul>
        </div>
        <div class="jumei-block">
          <ul class="jumei-content">
            <li class="jumei-item" v-for="(item, index) in jumeiContent1" :key="index">
              <span class="jumei-icon">
                <img :src="item.src" alt="">
              </span>
              <p class="jumei-title">{{item.title}}</p>
            </li>
          </ul>
          <ul class="jumei-content">
            <li class="jumei-item" v-for="(item, index) in jumeiContent2" :key="index">
              <span class="jumei-icon">
                <img :src="item.src" alt="">
              </span>
              <p class="jumei-title">{{item.title}}</p>
            </li>
          </ul>
          <ul class="jumei-content">
            <li class="jumei-item" v-for="(item, index) in jumeiContent3" :key="index">
              <span class="jumei-icon">
                <img :src="item.src" alt="">
              </span>
              <p class="jumei-title">{{item.title}}</p>
            </li>
          </ul>
        </div>
        <div class="contact-block">
          <span class="contact-img">
            <img src="../../assets/bg/valueLoad.jpg" alt="">
          </span>
          <div class="contact-text">
            <span style="color:red">Looking for internships</span> By: Jerrylee <br>
            Contact: <span style="color:#FE4070">wuyuanlijie@qq.com || 15279106115</span> <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      orderContent: [
        {src: 'static/mine/priceIcon1.png', title: '代付款'},
        {src: 'static/mine/priceIcon2.png', title: '代发货'},
        {src: 'static/mine/priceIcon2.png', title: '待收货'},
        {src: 'static/mine/priceIcon3.png', title: '待评价'},
        {src: 'static/mine/priceIcon5.png', title: '退款/收货'},
      ],
      fundContent: [
        {number:'0个', title: '红包'},
        {number:'0张', title: '现金券'},
        {number:'0元', title: '聚美余额'},
        {number:'0元', title: '粉丝红包'},
        {number:'0元',title: '礼品卡'},
      ],
      jumeiContent1: [
        {title:'收藏商品', src: 'static/mine/colorIcon/icon1.png'},
        {title:'收藏品牌', src: 'static/mine/colorIcon/icon2.png'},
        {title:'浏览记录', src: 'static/mine/colorIcon/icon3.png'},
        {title:'开售提醒', src: 'static/mine/colorIcon/icon4.png'}
      ],
      jumeiContent2: [
        {title:'心愿单', src: 'static/mine/colorIcon/icon5.png'},
        {title:'签到领钱', src: 'static/mine/colorIcon/icon6.png'},
        {title:'大姨妈', src: 'static/mine/colorIcon/icon7.png'},
        {title:'意见反馈', src: 'static/mine/colorIcon/icon8.png'},
      ],
      jumeiContent3: [
        {title:'客服中心', src: 'static/mine/colorIcon/icon9.png'},
        {title:'售后服务', src: 'static/mine/colorIcon/icon10.png'},
        {title:'我的评价', src: 'static/mine/colorIcon/icon11.png'},
        {title:'我的影票', src: 'static/mine/colorIcon/icon12.png'},
      ],
      scrollY: 0,
      userLogin: "",
    }
  },
  created () {
    this.$nextTick(() => {
      this._initScroll()
    })
    this.$store.state.selectTab = "我的"
    var storage = window.localStorage
    let username = storage["user"]
    username ? this.userLogin=username : this.userLogin=""
  },
  methods: {
    _initScroll () {
      this.mineScroll = new BScroll(this.$refs.mineWrapper, {
        click: true,
        probeType: 3
      })
      // 监听滚动高度变化
      this.mineScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    loginClick () {
      // 登录页面的跳转
      this.$router.push('/login')
    },
    setterClick () {
      this.$router.push('/setter')
    }
  },
  watch: {
    "scrollY" () {
      if(this.scrollY > 135) {
        // console.log("成功")
      }
    }
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.page
  overflow hidden
  height 100%
  .header
    // border-1px()
    position fixed
    background rgba(1,1,1,0)
    font-size .52rem
    padding .65rem 0
    color rgba(1,1,1,0)
    .icon
      height 0.75rem
      width 0.75rem
      margin-right 0.3625rem
      img
        width 100%
  .wrapper
    height 17rem
    .user-block
      height 5.8rem
      width 10rem
      position relative
      color #fff
      border-line(.4rem)
      .fint-mask
        position absolute
        left 0
        right 0
        top 0
        z-index -1
        height 5.8rem
        background rgba(1,1,1,.2)
      .user-mask
        position absolute
        left 0
        right 0
        top 0
        height 5.8rem
        z-index -3
        background-size 100% 100%
        filter blur(.3rem)
      .user-login
        z-index 999
        font-size .45rem
        color #fff
        z-index 1000
        padding-top .5rem
        position relative
        arrow-right(.3rem, 1.9rem, 8.8rem, rgba(255,255,255,.9))
        .user-logo
          display inline-block
          height 1.733333rem
          width 1.733333rem
          border-radius 50%
          border .08rem solid rgba(255,255,255,.4)
          margin .666667rem .4rem 0px .4rem
          vertical-align top
          img
            height 100%
            width 100%
            border-radius 70%
        .operation
          display inline-block
          margin-top 1.5rem
          position relative
          height 1rem
          line-height 1rem
          .signup
            margin-right 1.4rem
          .separator
            width 1px
            height .5rem
            background #fff
            display inline-block
            position absolute
            left 50%
            top 22%
        .login-success
          display inline-block
          margin-top .8rem
          position relative
          height 1rem
          line-height .8rem
          font-size 12px
          .username
            font-size .4rem
      .user-info
        position absolute
        left 0
        right 0
        bottom .4rem
        height 1.5rem
        background rgba(1,1,1,.2)
        display flex
        font-size .38rem
        .item
          flex 1
          text-align center
          position relative
          &.item:last-child
            span
              display inline-block
              height .325rem
              width .59rem
              background url('../../assets/icon/personal.png') no-repeat
              background-size 100%
              margin-top .15625rem
          span
            font-size .5rem
            display inline-block
            padding .2rem 0px .2rem
            right-line()
    .order-fund-block
      background #fff
      height 5.75rem
      color #666666
      border-line(.2rem)
      .block-title
        height 1.09375rem
        line-height  1.09375rem
        padding-left .53125rem
        border-1px()
        font-size .43srem
        color #000
        .block-title-nav
          position absolute
          color fontTint
          right 1.2rem
          font-size .3rem
          arrow-right(.17rem, .457rem, 2.6rem)
      .content
        display flex
        height 2.2125rem
        font-size 0.38rem
        &.order-content
          border-1px()
        .item
          flex 1
          padding-top .3875rem
          text-align center
          .order-logo
            display inline-block
            height 1rem
            width 1rem
            img
              height 80%
          .value
            padding-bottom .5rem
            display inline-block
            color #333333
            font-size .45rem
    .jumei-block
      border-line(.2rem)
      .jumei-content
        height 2.328125rem
        display flex
        border-1px()
        color #666666
        font-size 0.38rem
        &:last-child
          padding-bottom .3rem
          border-1px(0rem)
        .jumei-item
          flex 1
          text-align center
          padding-top .3225rem
          .jumei-icon
            display inline-block
            height .84375rem
            img
             width 80%
          .jumei-title
            padding-top .25625rem
    .contact-block
      padding-bottom 1rem
      width 100%
      .contact-img
        height 2.6875rem
        width 10rem
        display block
        img
          width 100%
      .contact-text
        height 2.34375rem
        width 100%
        text-align center
        line-height .5rem
        font-size .45rem
        padding-top .2rem

</style>
