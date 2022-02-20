<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About Us</router-link> |
	  <router-link to="/register">Register</router-link>|
	  <router-link v-if="!isLoggedIn" to="/login">Log In</router-link><router-link v-else-if="isLoggedIn" to="/logout">Log Out</router-link> |
	  <router-link to="/searchtreepage">Search Tree</router-link> |
	  <router-link :to="{ path: '/individualsurveypage', params: { mode_state: mode, survey_id: survey_id }}">Survey Details</router-link> |
      <router-link to="/surveyrecordlist">Survey Record List</router-link> |
 	  <router-link to="/yourprofile">Your Profile</router-link> |
      <router-link to="/enduserlist">User Management</router-link>       
    </div>
    <router-view/>
  </div>
</template>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
};
</script>
