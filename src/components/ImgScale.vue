<template lang="html">
   <transition name="fade">
      <div class="img-view" @click="bigImg">
          <!-- 遮罩层 -->
          <div class="img-layer"></div>
          <div class="img-scale">
              <img :src="imgSrc">
          </div>
      </div>
    </transition>
</template>

<script>
export default {
  props: ['imgSrc'],
  methods: {
    bigImg () {
      this.$emit('clickIt')
    }
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus" >
@import '../common/stylus/mixin.styl'
.fade-enter-active,.fade-leave-active 
  transition: transform .2s linear
  transform: translate3d(0, 0, 0)
  opacity 0
.fade-enter,.fade-leave-active 
  transform: translateY(-30%)
  opacity 0
.img-view
  position absolute
  width 100%  
  height 100%
  .img-layer  
    position fixed
    z-index 999
    top 0
    left 0
    background rgba(0,0,0,.9)
    width 100%
    height 100%
    overflow hidden
  .img-scale
    img 
      width 10rem
      display block
      position absolute
      height 60%
      left 0
      top 20%
      right 0
      margin auto
      z-index 1000
</style>
