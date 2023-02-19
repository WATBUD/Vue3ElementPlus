import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CatchAllRouter from '../components/CatchAllRouter.vue';
import LifeCycle from '../components/LifeCycle.vue';
import ScriptSetup from '../components/ScriptSetup.vue';

import AboutView from '../views/AboutView.vue';
import GuideView from '../views/GuideView.vue';
import LoginView from '../views/LoginView.vue';

import VueCookies from 'vue-cookies';

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

const Cookies:any = VueCookies;


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  console.log('%c enter beforeEach:', 'color: red', to);
  //window.sessionStorage.setItem('login', "55555");
  //const token = window.sessionStorage.getItem('login');
  const Cookies_login = Cookies.get('login');
  
  //const token2 = window.$cookies.get('token')
  console.log('%c Cookies_login:', 'color: red', Cookies_login);
  //console.log('%c token:', 'color: red', token);

  if (Cookies_login == null) {
    console.log('%c EnterToken:', 'color: red');
    if (to.name !== 'LoginView')
      return { name: 'LoginView' }
  }
  // else{

  // }
  // window.sessionStorage.setItem('login', "55555");

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
