<template>
  <div>
    <h1>LOGIN</h1>
    <form @submit="login">
      <template v-if="!isLoggedIn">
      <input v-model="username" placeholder="username (case sensitive)" />
      <br />
      <br />
      <input v-model="password" placeholder="password (case sensitive)" type="password" />
      <br />
      <br />
      <button type="submit">Login</button>
      <br />
      <br />
	  <label>{{ login_status }}</label>
	  <br />
	  <br />
	  <input v-model="newpassword" placeholder="newpassword" type="password"/>
	  <br />
	  <br />
	  <input v-model="newpassword_confirmed" placeholder="newpassword_reconfirmed" type="password" />
	  <br />
	  <br />
	  <button type="submit">Reset Password</button>
	  <br />
	  <br />
	  <button type="submit">Forget Password</button>
      </template>     
      
    </form>
  </div>
</template>

<script>
import { mapMutations,mapGetters  } from "vuex";

export default {
  data: () => {
    return {
      username: "",
      password: "",
      login_status: ""
    };
  },
  methods: {
    computed: {
    ...mapGetters(["isLoggedIn"])   
    },
    ...mapMutations(["setUser", "setToken"]),
    async login(e) {
      e.preventDefault();
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });
      const { user, token } = await response.json();
      console.log("Verifying user name:" + this.username);
      if (user.username == this.username) {
          
           this.setUser(user);
           this.setToken(token);
           this.login_status ="Successfully Login!";
      } else {
           this.login_status ="Incorrect Login Name or Password! Please try again.";
      }
    },
  },
};
</script>