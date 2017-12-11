# vue-jumei-app
> 好的生活，聚集美丽，成人之美！从现在做起！
![](https://github.com/wuyuanlijie/ImageFile/blob/master/JmBg/allBg.PNG)<br>

## 效果预览
>### 👉预览地址：[请点我！在线预览，手机浏览或切换浏览器移动调试](http://www.jerrylee520.cn:8080/index.html#/index/page1)
>### PS：google浏览器在切换不同的手机测试，需要重新刷新页面；安卓手机可能不适应
>### 👉源码地址：[Github在这里](https://github.com/wuyuanlijie/vue-jumei-app)
![](https://github.com/wuyuanlijie/ImageFile/blob/master/JmBg/jm1.gif)
![](https://github.com/wuyuanlijie/ImageFile/blob/master/JmBg/jm2.gif)<br>
![](https://github.com/wuyuanlijie/ImageFile/blob/master/JmBg/jm3.gif)<br>

## 项目描述
### 技术栈
Vue2.0全家桶 + axios +　Vuex +  Mint-Ui + Mock.js + Stylus

### 前端部分
> * Vue2.0 前端页面的展示
> * SPA单页应用，前端后分离
> * Stylus css预编译
> * Axios 异步数据的请求
> * localStorage 个人信息以及购物车信息的存储
> * ES6 Js语言的标准
> * Mint_UI 实现图片轮播，图片懒加载等等
> * Better-Scroll 实现移动端滚动，让滚动更加协调
> * flexible.js和rem，解决移动端设备兼容

### 后端部分
> * Mock.js 实现后端数据的托管

### 待更新的功能
> * 后端平台搭建，利用新一代的Koa服务器框架
> * 订单页面的展示
> * 商家页面的请求
> * 下拉，加载更多的商品数据


## 实现功能
### 首页
* 1、tabbar切换
* 2、优惠商品倒计时
* 3、活动的商品的推荐
* 4、swiper滑动，切换页面
* 5、搜索框
* 6、首页不同页面的展示
### 商品详情
* 1、商品图片放大显示
* 2、商品具体的显示、评论、图片展示
* 3、加入购车车页面弹窗，选择商品的种类，以及数量
* 4、商品加入购物车，动画
### 购物车
* 1、登录状态判断
* 2、全选，以及非全选的切换
* 3、添加商品、以及减少与删除 

### 个人
* 1、账户的登录
* 2、注册账户
* 3、设置页面

## 总结
* 1、熟悉使用Vue2.0
* 2、在项目中，将组件进行分离，编写可以复用的组件，提高效率
* 3、Vuex的状态管理模块，统一的状态的管理，让我们更好的去对数据操作
* 4、util的工具，倒计时js
* 5、对axios有更进一步的理解，利用cros进行跨域处理
* 6、进行路由的懒加载，优化页面加载

## 具体功能实现
#### 路由结构
``` javascript
export default new Router({
  routes: [
    { //这里要设置一个默认的主页面 后面才起作用 /代表根目录
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/index/index'], resolve),
      redirect: '/index/page1'
    },
    { 
      path: '/index',
      component: resolve => require(['@/pages/index/index'], resolve),
      meta: {keepAlive: true},
      children: [
        {
          path: '',
          component: resolve => require(['@/pages/index/index'], resolve)
        },
        {
          path: 'page1', 
          name: 'page1',
          component: resolve => require(['@/pages/index/page1'], resolve)
        },
        {
          path: 'page2',
          name: 'page2',
          component: resolve => require(['@/pages/index/page2'], resolve)
        },
        {
          path: 'page3',
          name: 'page3',
          component: resolve => require(['@/pages/index/page3'], resolve)
        },
        {
          path: 'page4',
          name: 'page4',
          component: resolve => require(['@/pages/index/page4'], resolve)
        },
        {
          path: 'page5',
          name: 'page5',
          component: resolve => require(['@/pages/index/page5'], resolve)
        },
        {
          path: 'page6',
          name: 'page6',
          component: resolve => require(['@/pages/index/page6'], resolve)
        },
        {
          path: 'page7',
          component: resolve => require(['@/pages/index/page7'], resolve)
        },
      ]
    },
    {
      path: '/brandsale',
      name: 'brandSale', 
      component: resolve => require(['@/pages/brandsale/index'], resolve)
    },
    {
      path: '/livecommunity',
      name: 'liveCommunity',
      component:  resolve => require(['@/pages/livecommunity/index'], resolve)
    },
    {
      path: '/shopcart',
      name: 'shopCart',
      component:  resolve => require(['@/pages/shopCart/index'], resolve)
    },
    {
      path: '/myself',
      name: 'mySelf',
      component: resolve => require(['@/pages/mySelf/index'], resolve)
    },
    {
      path: "/setter",
      name: 'setter',
      component:  resolve => require(['@/pages/mySelf/setter'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component:  resolve => require(['@/pages/mySelf/login'], resolve)
    },
    {
      path: '/product',
      name: 'product',
      component:  resolve => require(['@/pages/product/index'], resolve),
      redirect: '/product/info', 
      children: [
        {
          path: 'info',
          name: 'productInfo',
          component: resolve => require(['@/pages/product/info'], resolve)
        },
        {
          path: 'detail',
          name: 'productDetail',
          component: resolve => require(['@/pages/product/detail'], resolve)
        },
        {
          path: 'comment',
          name: 'productComment',
          component: resolve => require(['@/pages/product/comment'], resolve)
        }
      ]
    },

  ]
})

```
#### Vuex状态管理
> 这里我贴出购物车模块。它的使用场景：添加商品到购物车，更新商品的信息、进行增删，并且在操作过程中，将数据保存到
localStorage，持久存储，由于后台服务器尚未搭建，利用这样来保持数据的存储。

```javascript
import * as types from '../mutation-types.js'
const storage = window.localStorage
const state = {
  added: [],
  checkoutStatus: null
}
const getters = {
  checkoutStatus: state => state.checkoutStatus,
  cartLists: state => state.added
}
const mutations = {
  [types.ADD_TO_CART] (state, product) {
    let id = product.id
    const record = state.added.find(p => p.id === id && p.type === product.type)
    // 解决方法一 找到数据遍历一次
    // 方法二 是获取到父级的数据
    if (!record) {
      state.added.push(product)
    } else {
      record.quantity += product.quantity
    }
    storage.setItem('cart', JSON.stringify(state.added))
  },
  //传入商品的信息 product  id和类型判断当前存储的商品       要修改的数量
  // 更新产品的数据
  [types.UPDATE_THIS_PRODUCT] (state, product) {
    let {id,type,quantity} = product //对象的解构
    const record = state.added.find(p => p.id===id &&p.type===type)
    if (quantity>0) {
      record?record.quantity = quantity : ''
    } else {
      // 传入的商品数量为0 就删除这个商品 删除指定的序号的商品
      let index = state.added.indexOf(record)
      state.added.splice(index,1)
    }
    storage.setItem('cart', JSON.stringify(state.added))   
  },  
}
export default {
  state,
  getters,
  mutations
}

```



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
