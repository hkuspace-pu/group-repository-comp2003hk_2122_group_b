
import App from "./App/App.vue";
import Vue from 'vue';
import VueRouter from "vue-router";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import VueSimpleAlert from "vue-simple-alert";
import SortedTablePlugin from "vue-sorted-table";
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';
import Dropdown from 'vue-simple-search-dropdown';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueExcelXlsx from "vue-excel-xlsx";

import { Carousel3d, Slide } from 'vue-carousel-3d';
    Vue.use(VueExcelXlsx);
	Vue.use(Carousel3d);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component('v-select', vSelect)
Vue.use(Dropdown);
Vue.use(VueSimpleAlert);
Vue.use(SortedTablePlugin);
Vue.use(VueRouter);
Vue.use(VueSidebarMenu);
Vue.use(VueSweetalert2);
Vue.prototype.$Login_Name = 'User';

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
    path: '/surveycsvimportpage',
    name: 'SurveyCSVImportPage',
    component: () => import( './views/SurveyCSVImportPage.vue')
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
   // data: {
   //   slides: 7
   // },
   // components: {
   //   'carousel-3d': window['carousel-3d'].Carousel3d,
    //  'slide': window['carousel-3d'].Slide
   // },
  render: h => h(App)
}).$mount('#app')




/*
new Vue({

  router,
  store,
  render: h => h(App)
}).$mount("#app");
*/

