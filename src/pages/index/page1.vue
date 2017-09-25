<template lang="html">
<div class="goods">
  <div class="content-wrapper" ref="contentWrapper">
    <div>
      <ul class="types">
        <li class="type-item " v-for="(item, index) in types" :key="index" >
          <img :src="item.src" alt="">
          <p class="text">
            {{item.name}}
          </p>
        </li>
      </ul>
      <div class="activity">
        <span class="title">好物低价-限时购</span>
        <span class="time">20:00</span>
            <span class="detail">{{hour}}</span>
          : <span class="detail">{{min}}</span>
          : <span class="detail">{{sec}}</span>
        <span class="more arrow-right">
          更多
        </span>
        <ActivityList></ActivityList>
      </div>
      <section class="mixcart-list">
        <div class="tab-title">
          <span class="title-item" v-for="(item, index) in tabs"
          @click="tabClick(index)" :class="index===tabIndex?'tab-click':''">
            {{item}}
          </span>
        </div>
        <GoodsList></GoodsList>
      </section>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
// 需要引入
import data from '../../common/util/mock.js'
import ActivityList from '../../components/ActivityList.vue'
import GoodsList from '../../components/GoodsList.vue'
export default {
  data () {
    return {
      types: [
        {name: '分类', src: 'static/icon/type.jpg'},
        {name: '签到', src: 'static/icon/sign.jpg'},
        {name: '凑团', src: 'static/icon/tuan.jpg'},
        {name: '宝箱', src: 'static/icon/box.jpg'},
        {name: '颜值贷', src: 'static/icon/money.jpg'},
      ],
      tabs: ["今日10点上线", "明日10点预告"],
      tabIndex: 0,
      hour: 9,
      min: 13,
      sec: 13
    }
  },
  created () {
    // created是数据初始化的过程 axios会自动解析json格式
    this.$store.dispatch('selectTab', '首页')
    axios.get("/api/data").then(res => {
      this.$store.dispatch('addActivity', res.data.activityLists)
      this.$store.dispatch('addGoods', res.data.goodsList)
      // 异步的 属于放在这里面 等待他们只想完
      this.$nextTick( () => {
        this._initScroll()
      })
      // console.log(res.data.goodsList) //获取到里面的数据
    }).catch(err => {
      console.log(err)
    })
    this.interval = setInterval(() => {
      if(this.sec > 0) {
        this.sec--
      } else {
        this.sec = 60
        if(this.min > 0) {
            this.min--
        } else {
          this.min = 60
          this.hour--
        }
      }
      if(this.hour == 0 && this.min == 0 && this.sec == 0)
      clearInterval(this.interval)
    }, 1000)
  },
  components: {
    ActivityList,
    GoodsList
  },
  methods: {
    tabClick (index) {
      this.tabIndex = index
    },
    _initScroll () {
      this.typeScroll = new BScroll(this.$refs.contentWrapper, {
        click: true,
        probeType: 3
      })
    }
  },

}
</script>

<style lang="stylus" type="stylesheet/stylus"  scoped>
@import '../../common/stylus/mixin.styl'
.goods
  overflow hidden
  position absolute
  width 100%
  top 2.4rem
  bottom 1.5rem
  display flex
  .content-wrapper
    flex 1
    .types
      // 合理利用弹性布局
      margin-left 0.4rem
      margin-top .4275rem
      height 2rem
      .type-item
        float left
        margin-right .5rem
        text-align center
        img
          height 1.42rem
          width 1.42rem
        .text
          margin-top 0.2rem
    .activity
      padding .6875rem .375rem .15625rem .446667rem
      font-size .346667rem
      color mainColor
      position relative
      border-line()
      .title
        font-size .446667rem
      .time
        font-size .346667rem
        color fontColor
        vertical-align top
        display inline-block
        padding 0rem .45875rem 0rem 1.125rem
      .detail
        border .01rem solid #E4E4E4
        width .88125rem
        height .5625rem
        padding 0rem .09rem
        border-radius 20%
      .more
        position relative
        color fontColor
        arrow-right(.2rem)
    .mixcart-list
      margin-top .5rem
      .tab-title
        padding 0px .8375rem .12rem
        font-size .46875rem
        .title-item
          color fontColor
          &:first-child
            margin-right 1.8375rem
          &.tab-click
            color mainColor

</style>
