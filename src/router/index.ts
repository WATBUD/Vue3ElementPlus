import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CatchAllRouter from '../components/CatchAllRouter.vue';
import LifeCycle from '../components/LifeCycle.vue';
import ScriptSetup from '../components/ScriptSetup.vue';

import AboutView from '../views/AboutView.vue';
import GuideView from '../views/GuideView.vue';
import LoginView from '../views/LoginView.vue';
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/:catchAll(.*)',
  //   //redirect: '../views/GuideView.vue',
  //   component: PageCode404  
  // },
  {
    path: '/LoginView',
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
    path: '/LifeCycle',
    component: LifeCycle,
    children: [{ path: '', name: 'LifeCycle', component: LifeCycle }],
  },
  {
    path: '/CSS_Flex',
    name: 'CSS_Flex',
    component: () => import(/* webpackChunkName: "about" */'../components/CSS_Flex.vue')
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

router.beforeEach((to, from) => {
  console.log('%c enter beforeEach:', 'color: red', to);
  //window.sessionStorage.setItem('login', "55555");
  const token = window.sessionStorage.getItem('login');


  // if (to.name !== 'LoginView') 
  // return { name: 'LoginView' }

  console.log('%c token:', 'color: red', token);

  if (token == null) {
    console.log('%c EnterToken:', 'color: red');
    window.sessionStorage.setItem('login', "55555");
  }
  else{
    if (to.name !== 'LoginView')
    return { name: 'LoginView' }
  }
  
  //else next({ path: "/LoginView" }) 
  // const token = window.sessionStorage.getItem('login');
  //  if(token==null){
  //    window.sessionStorage.setItem('login', "55555");
  //  }
  //  else{
  //    console.log('%c _login:', 'color: red', token, to);
  //    if (to.name !== 'LoginView') next({ name: 'AboutView' })
  //    else next({ path: "/LoginView" }) 
  //  }
  //--let isAuthenticated = Cookie.get('login');

})
export default router
