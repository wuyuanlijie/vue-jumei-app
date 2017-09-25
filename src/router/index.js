import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import liveCommunity from '@/pages/livecommunity/index'
import mySelf from '@/pages/myself/index'
import login from '@/pages/mySelf/login'
import setter from '@/pages/mySelf/setter'
import brandSale from '@/pages/brandsale/index'
import shopCart from '@/pages/shopcart/index'
import indexPage1 from '@/pages/index/page1'
import indexPage2 from '@/pages/index/page2'
import indexPage3 from '@/pages/index/page3'
import indexPage4 from '@/pages/index/page4'
import indexPage5 from '@/pages/index/page5'
import indexPage6 from '@/pages/index/page6'
import indexPage7 from '@/pages/index/page7'
import product from '@/pages/product/index'
import info from '@/pages/product/info'
import detail from '@/pages/product/detail'
import comment from '@/pages/product/comment'

//可以使用路由懒加载
Vue.use(Router)

export default new Router({
  routes: [
    { //这里要设置一个默认的主页面 后面才起作用 /代表根目录
      path: '/',
      name: 'index',
      component: index,
      redirect: '/index/page1'
    },
    {
      path: '/index',
      component: index,
      meta: {keepAlive: true},
      children: [
        {
          path: '',
          component: indexPage1
        },
        {
          path: 'page1', 
          name: 'page1',
          component: indexPage1
        },
        {
          path: 'page2',
          name: 'page2',
          component: indexPage2
        },
        {
          path: 'page3',
          name: 'page3',
          component: indexPage3
        },
        {
          path: 'page4',
          name: 'page4',
          component: indexPage4
        },
        {
          path: 'page5',
          name: 'page5',
          component: indexPage5
        },
        {
          path: 'page6',
          name: 'page6',
          component: indexPage6
        },
        {
          path: 'page7',
          component: indexPage7
        },
      ]
    },
    {
      path: '/brandsale',
      name: 'brandSale',
      component: brandSale
    },
    {
      path: '/livecommunity',
      name: 'liveCommunity',
      component: liveCommunity
    },
    {
      path: '/shopcart',
      name: 'shopCart',
      component: shopCart
    },
    {
      path: '/myself',
      name: 'mySelf',
      component: mySelf,
    },
    {
      path: "/setter",
      name: 'setter',
      component: setter
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/product',
      name: 'product',
      component: product,
      redirect: '/product/info',
      children: [
        {
          path: 'info',
          name: 'productInfo',
          component: info
        },
        {
          path: 'detail',
          name: 'productDetail',
          component: detail
        },
        {
          path: 'comment',
          name: 'productComment',
          component: comment
        }
      ]
    },

  ]
})
