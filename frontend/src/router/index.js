import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import SearchTreePage from "../views/SearchTreePage.vue";
import IndividualSurveyPage from "../views/IndividualSurveyPage.vue";
import { mapGetters } from "vuex";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  {
    path: "/login",
    name: "Login",
    component: Login,
  }, 
  
  {
    path: '/register',
    name: 'Register',
    component: Register,
  }, 
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
   },
   
   { 
    path: '/surveyrecordlist',
    name: 'SurveyRecordList',
    component: () => import(/* webpackChunkName: "surveyrecordlist" */ '../views/SurveyRecordList.vue')
   },
   
   {  
    path: '/individualsurveypage',
    name: 'IndividualSurveyPage',
    component: IndividualSurveyPage,
   },
   
  {
   path: '/searchtreepage',
   name: 'SearchTreePage',
   component: SearchTreePage,
  },
   
  
   {
    path: '/yourprofile',
    name: 'YourProfile',
    component: () => import(/* webpackChunkName: "yourprofile" */ '../views/YourProfile.vue')
   },
   
   {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "logout" */ '../views/Logout.vue')
   },
   
   { 
    path: '/enduserlist',
    name: 'EndUserList',
    component: () => import(/* webpackChunkName: "enduserlist" */ '../views/EndUserList.vue')
   }, 

  
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});



		
export default router


