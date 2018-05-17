import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

/*---- add myself  ----*/
import IndexPage from '../pages/index.vue' ;
import DetailPage from  '../pages/detail.vue'
  import DetailAnalysis from '../pages/detail/analysis.vue'
  import DetailCount from '../pages/detail/count.vue'
  import DetailForecast from '../pages/detail/forecast.vue'
  import DetailPublish from '../pages/detail/publish.vue'
import OrderList from '../pages/orderList.vue'

/*---- add myself  ----*/

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/detail',
      name: 'DetailPage',
      component: DetailPage,
      redirect:'/detail/analysis',
      children:[
        {
          path: 'analysis',       //  ====> 由于是子路由， 该 path 属性值，不能带有 '/' 符号 ！
          name: 'DetailAnalysis',
          component: DetailAnalysis
        },
        {
          path: 'count',            //  ====> 由于是子路由， 该 path 属性值，不能带有 '/' 符号 ！
          name: 'DetailCount',
          component: DetailCount
        },
        {
          path: 'forecast',        //  ====> 由于是子路由， 该 path 属性值，不能带有 '/' 符号 ！
          name: 'DetailForecast',
          component: DetailForecast
        },
        {
          path: 'publish',         //  ====> 由于是子路由， 该 path 属性值，不能带有 '/' 符号 ！
          name: 'DetailPublish',
          component: DetailPublish
        }
      ]
    },
    {
      path: '/orderList',
      name: 'OrderList',
      component: OrderList
    },
  ]
})
