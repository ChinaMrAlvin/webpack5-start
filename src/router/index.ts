import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

// dynamic import 路由切分
const HelloWorld = () => import('@/components/HelloWorld.vue');
const Charts = () => import('@/components/Charts.vue');

Vue.use(Router)
const routes: RouteConfig[] = [
  {
    path: '/',
    component: HelloWorld
  },
  {
    path: '/charts',
    component:Charts
  }
]
export default new Router({
  routes
})
