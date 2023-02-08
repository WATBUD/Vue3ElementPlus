import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CatchAllRouter from '../components/CatchAllRouter.vue';
import ScriptSetup from '../components/ScriptSetup.vue';
import AboutView from '../views/AboutView.vue';
import GuideView from '../views/GuideView.vue';
import LoginView from '../views/LoginView.vue';

import PageCode404 from '../views/PageCode404.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    //redirect: '../views/GuideView.vue',
    component: PageCode404  
  },
  {
    path: '/',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/',
    name: 'AboutView',
    component: AboutView,
  },
  {
    path: '/GuidePage',
    component: GuideView,
  },
  {
    path: '/GuidePage/ScriptSetupVue',
    component: GuideView,
    children: [{ path: '', name: 'ScriptSetupVue', component: ScriptSetup }],
  },
  {
    path: '/GuidePage/CatchAllRouter',
    component: GuideView,
    children: [{ path: '', name: 'CatchAllRouter', component: CatchAllRouter }],
  },



  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
