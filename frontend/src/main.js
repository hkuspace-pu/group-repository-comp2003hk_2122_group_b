
import App from "./App/App.vue";
import Vue from 'vue';
import VueRouter from "vue-router";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import VueSimpleAlert from "vue-simple-alert";
import SortedTablePlugin from "vue-sorted-table";
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';
import Dropdown from 'vue-simple-search-dropdown'

Vue.use(Dropdown);
Vue.use(VueSimpleAlert);
Vue.use(SortedTablePlugin);
Vue.use(VueRouter);
Vue.use(VueSidebarMenu);


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [

  {
    path: '/home',
    name: 'Home',
    component: () => import( './views/Home.vue')
   },

  {
    path: '/register',
    name: 'Register',
    component: () => import( './views/Register.vue')
   },

 	{
    path: "/login",
    name: "Login",
    component: () => import( './views/Login.vue')
   },
    

  {
   path: '/searchtreepage',
   name: 'SearchTreePage',
    component: () => import( './views/SearchTreePage.vue')
   },

  { 
    path: '/surveyrecordlist',
    name: 'SurveyRecordList',
    component: () => import( './views/SurveyRecordList.vue')
   },

   {  
    path: '/individualsurveypage',
    name: 'IndividualSurveyPage',
    component: () => import( './views/IndividualSurveyPage.vue')
   },
   

    
   {
    path: '/yourprofile',
    name: 'YourProfile',
    component: () => import( './views/YourProfile.vue')
   },
   
   
 {
    path: '/logout',
    name: 'Logout',
    component: () => import( './views/Logout.vue')
   },

{
    path: '/about',
    name: 'About',
    component: () => import( './views/About.vue')
   },

  ]
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



/*
new Vue({

  router,
  store,
  render: h => h(App)
}).$mount("#app");
*/

