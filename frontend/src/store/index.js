import Vue from "vue";
import Vuex from "vuex";
import VueSimpleAlert from "vue-simple-alert";
import SortedTablePlugin from "vue-sorted-table";
Vue.use(VueSimpleAlert);
Vue.use(Vuex);
Vue.use(SortedTablePlugin);

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
	
  },
 

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    CurrentUser(state) {
      return state.user['name'];
    } ,
   

  },
});



