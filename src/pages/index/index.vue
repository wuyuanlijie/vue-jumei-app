<template lang="html">
  <div class="page">
    <div class="header">
      <div class="left" @click="leftVisible=true">
        <img class="iconImg" src="../../assets/icon/magic.png" alt="">
      </div>
      <div class="search" @click="searchVisible=true">
        <img src="../../assets/icon/search_icon.png" alt="搜索">
        <span class="text">搜索商品 分类 功效 用户</span>
      </div>
      <div class="right">
        <img class="iconImg" src="../../assets/icon/message.png" alt="">
      </div>
    </div>
   
    <mt-popup v-model="searchVisible" 
      position="right" class="search-content">
      <ul class="searchType">
        <li class="item search-active">商品</li>
        <li class="item">口碑</li>
        <li class="item">用户</li>
        <li class="item">店铺</li>
      </ul>
      <div class="input-block">
        <input type="text" class="search-input" placeholder="搜索 商品 分类 功效">
        <span @click="searchVisible=false" class="cancel">取消</span>
      </div>
      <ul class="hot-block">
        <li class="hot-item">热搜</li>
        <li class="hot-item" v-for="item in hots">
          {{item}}
        </li>
      </ul>
    </mt-popup>
    <mt-popup v-model="leftVisible" position="left" class="left-block" modal="true">
      <ul class="left-content">
        <li class="left-item" v-for="item in lefts">{{item}}</li>
      </ul>
    </mt-popup>
    <navbar :navs="navs" :chooseItem="chooseItem"></navbar>
    <v-touch @swipeleft="onSwipeleft" @swiperight="onSwipeRight" :priority="1">
      <transition :name="transitionName">
        <keep-alive>
          <router-view class="Router" @click="start($event)"></router-view>  
        </keep-alive>
      </transition>
    </v-touch>

  </div>

</template>

<script>
import navbar from '@/components/NavBar.vue'
export default {
  data () {
    return {
      navs: ['特卖','极速免税店','母婴','轻奢','服饰','鞋包','食品'],
      transitionName: 'slide-right',
      chooseItem: 0,
      searchVisible: false,
      leftVisible: false,
      lefts: ["我的订单","现金券","二维码","宝箱"],
      hots: ["颜值贷","口红","面膜","洗面奶","防晒喷雾","香水","眼影","眉笔","遮瑕","粉饼","精华","补水"]
    }
  },
  components: {
    navbar
  },
  computed: {
    getNavState () {
      return this.$store.state.navState
    }
  },
  watch: {
    // 监听计算属性 并且它来自vuex中状态
    getNavState(state){
      var index = state + 1
      // 跳转子页面 this.$router.push()
      this.$router.push('/index/page' + index)
    },
    '$route' (to, from) {
      let toNum = to.path.split('/')[2][4]
      let fromNum = from.path.split('/')[2][4]
      if (toNum > fromNum) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  },
  created () {
    // 初始化
    this.$router.push('/index/page1')
  },
  methods: {
    onSwipeleft () {
      let index = 1
      let next = ""
      if(this.$route.name != null) {
        index =  +this.$route.name[4]
        index < 8  ?  (next = "page" + (index + 1)) &&(this.chooseItem = index + 1) && (this.chooseItem = +index + 1)
       : (next="page8") && (this.chooseItem = 7)
       this.$router.push('/index/' + next)
      } 
    },
    onSwipeRight () {
      // this.$router.back(-1)
      let index = 1
      let back = ""
      if(this.$route.name != null) {
        index =  +this.$route.name[4]
        index > 1  ?  (back = "page" + (index - 1)) &&(this.chooseItem = index - 1) && (this.chooseItem = +index - 1)
       : (back="page1") && (this.chooseItem = 1)
       this.$router.push('/index/' + back)
      } else {
        this.$router.push('/index/' + "page6")
      }
      
    } 

  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.header
  width 10rem
  .left
    margin .3rem .2rem 0rem .2rem
    display inline-block
    vertical-align middle
    .iconImg
      height .9875rem
      width .9875rem
  .search
    display inline-block
    height .96875rem
    width 6.9375rem
    background mainTint
    border-radius .475rem
    border .001rem solid mainTint
    text-align center
    font-size .446667rem
    color rgba(7, 17, 27, .6)
    line-height .96875rem
    vertical-align middle
    margin-top .1rem
    img
      width .7rem
      height .7rem
      vertical-align middle
    .text
    // 文字图片设置同样的高度即可 在来来个
      height .7rem
      display inline-block
      line-height .7rem
  .right
    vertical-align middle
    display inline-block
    margin 0rem .1rem 0rem .3rem
    .iconImg
      height .7875rem
      width .7875rem
.search-content
  height 100%
  width 100%
  .searchType
    margin .5rem 1.71875rem 0.46875rem 0.4125rem
    display flex
    .item 
      flex 1
      text-align center
      color fontTint
      font-size .4rem
      &.search-active
        color mainColor  
  .input-block
    margin-left 0.4125rem
    .search-input
      width 7.0125rem
      height 1rem
      border-radius .12rem
      border 1px solid mainColor
      display inline-block
      font-size .44rem
      padding-left .8rem
    .cancel
      display inline-block
      height 1rem
      width 1.6rem
      text-align center
      font-size .44rem
      color fontTint
  .hot-block
    margin 0.625rem .7rem 0rem 0.4125rem
    font-size 0.4rem
    .hot-item
      float left
      height 0.6375rem
      line-height 0.6375rem
      min-width 1rem
      padding 0.14rem 0.15rem
      border-radius .15rem
      text-align center
      border .02rem solid borderColor
      margin 0rem 0.3125rem 0.3125rem 0rem
      &:first-child
        border none 
        width 1.4rem
        font-weight 600
        text-align right
.left-block
  position absolute
  left 0.3125rem
  top 4rem
  width 3.59375rem
  height 5.6rem 
  display flex
  flex-direction column
  box-shadow 0rem 0rem .3rem fontColor
  .left-item
    text-align center
    height 1.4rem
    line-height 1.4rem
    font-size .47rem
    color fontColor
    border-1px(60%,20%)
    &:last-child
      border-1px(0)

.Router
  width 100%;
  transition: all .4s ease
  // slide-right-leave-active 右滑动 左路由 
  //在过渡的结束状态 跳向下一个的页面的透明度要设置为0  过渡结束的时候都是不显示的
  // slide-right-enter中的透明度为0 代表过渡刚进入也是不显示的
  &.slide-left-enter, &.slide-right-leave-active 
    opacity 0
    // 向左滑动 其实路由向右走 然后
    transform translateX(100%)
  &.slide-left-leave-active, &.slide-right-enter
    opacity 0
    transform translateX(-100%)

</style>
