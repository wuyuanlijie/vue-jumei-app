<template lang="html">
  <section class="detail_main">
    <div class="header border-1px">
      <div class="left">
        <router-link to="/">
          <img src="../../assets/icon/arrow_left.png" alt="">
        </router-link>
      </div>
      <navbar :navs="navs" class="nav" :chooseItem="chooseItem"></navbar>
      <div class="right">
        <div class="love right-icon" @click="clickLove">
          <img :src="loveSrc" alt="">
        </div>
        <div class="share right-icon">
          <img src="../../assets/icon/share.png" alt="">
        </div>
      </div>
    </div>
    <v-touch @swipeleft="onSwipeleft" @swiperight="onSwipeRight" :priority="1">
      <transition :name="transitionName">
        <keep-alive>
          <router-view class="Router"></router-view>
        </keep-alive>
       </transition>
    </v-touch>
    
    <div class="ball-container">
      <transition name="drop"  @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
        <div class="ball" v-show="ballShow">
          <img :src="product.cartImg" class="ball-img" alt="">
        </div>
      </transition>
    </div>
    <buybox @ballShowClick="ballshowup"></buybox>

  </section>
</template>

<script>
import { Toast } from 'mint-ui'
import navbar from '@/components/NavBar'
import buybox from '@/components/BuyBox'

export default {
  data () {
    return {
      productId: '',
      navs: ['商品','详情','评价'],
      loveSrc: 'static/icon/star.png',
      isCollected: false,
      transitionName: 'scroll-left',
      chooseItem: 1,
      ballShow: false
    }
  },
  computed: {
    getNavState () {
      return this.$store.state.navState
    },
    product () {
      return this.$store.state.productInfo
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    // this.productId = this.$route.params.id
  },
  watch: {
    getNavState (value) {
      switch(value){
        case 0:
          this.$router.push('/product/info')
          break;
        case 1:
          this.$router.push('/product/detail')
          break;
        case 2:
          this.$router.push('/product/comment')
          break;
        default:
          this.$router.push('/product/info')
      }
    },
    "$route" (to ,from) {
      // info 4 detail 6 comment 7
      if(this.$store.state.tabHidden) {
       this.$store.dispatch('tabHidden')
      }
      let toPath = to.path.split('/')[2].length
      let fromPath = from.path.split('/')[2].length
      toPath > fromPath ? this.transitionName="scroll-left":this.transitionName="scroll-right"
    }
  },
  components: {
    navbar,
    buybox
  },
  methods: {
    beforeDrop (el) {
      if (this.ballShow) {
        let x = '6'
        let y = '-10'
        el.style.display = '';
        el.style.webkitTransform = `translate3d(0,${y}rem,0)`;
        el.style.transform = `translate3d(0,${y}rem,0)`;
        let inner = el.getElementsByClassName('ball-img')[0];
        inner.style.webkitTransform = `translate3d(${x}rem,0,0)`;
        inner.style.transform = `translate3d(${x}rem,0,0)`;
      }
    },
    dropping (el, done) {
      let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('ball-img')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
    },
    afterDrop (el ) {
      this.ballShow = false
      el.style.display = 'none'
    },
    ballshowup () {
      this.ballShow = true
    },
    clickLove () {
      if(!this.isCollected) {
        this.loveSrc = "static/icon/starChoose.png"
        Toast({
          message: '收藏成功',
          position: 'middle',
          duration: 1000
        })
      } else {
        this.loveSrc = "static/icon/star.png"
        Toast({
          message: '取消收藏',
          position: 'middle',
          duration: 1000
        })
      }
      this.isCollected = !this.isCollected
    },
    onSwipeleft () {
      if(this.$store.state.tabHidden) {
       this.$store.dispatch('tabHidden')
      }
      let index = ''
      if(this.$route.name != null) {
      //   index =  +this.$route.name[4]
      //   index < 8  ?  (next = "page" + (index + 1)) &&(this.pageState = index + 1) && (this.pageState = +index + 1)
      //  : (next="page8") && (this.pageState = 7)
      //  this.$router.push('/index/' + next)
      index = this.$route.name.slice(7)
      switch(index) {
        case 'Info':
          this.$router.push('/product/detail')
          this.chooseItem = 2
          break;
        case 'Detail':
          this.$router.push('/product/comment')
          this.chooseItem = 3
          break;
        default: break;
       }
      } 
     
    },
    onSwipeRight () {
      // this.$router.back(-1)
      if(this.$store.state.tabHidden) {
       this.$store.dispatch('tabHidden')
      }
      let index = 1
     if(this.$route.name != null) {
      index = this.$route.name.slice(7)
      switch(index) {
        case 'Comment':
          this.$router.push('/product/detail')
          this.chooseItem = 2
          break;
        case 'Detail':
          this.$router.push('/product/info')
          this.chooseItem = 1
          break;
        default: break;
       }
      } 
      
    }
    

  }

}
</script>

<style lang="stylus" type="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.detail_main
  .header
    position fixed
    top 0
    left 0
    right 0
    height 1.066667rem
    display flex
    align-items center
    border-1px()
    padding .1rem 0rem .05rem
    .left
      width .8rem
      height .8rem
      flex 2
      img
        height 100%
    .nav
      flex 3
      display inline-block
    .right
      flex 2.2
      .right-icon
        width .8rem
        height .8rem
        display inline-block
        &:first-child
          padding-right .3rem
        img
          width 100%
  .Router
    transition all .4s ease
    &.scroll-left-enter, &.scroll-right-leave-active
      opacity 0
      transform translateX(100%)
    &.scroll-left-leave-active, &.scroll-right-enter
      opacity 0
      transform translate(-100%, 0)
  .ball-container
    position absolute
    left 19%
    bottom 2%   
    z-index 10
    .ball   
      transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      height 1rem
      width 1rem
      .ball-img 
        width 100%
        transition: all 0.4s linear
</style>
