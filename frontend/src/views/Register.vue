<template>
  <div>
    <h1>Registration</h1>
    <form @submit="registration">
      <label>Login Name:</label><input v-model="register_username" placeholder="Login (case sensitive)" />
      <br />
      <br />
      <label>Login Password:</label><input v-model="register_password" placeholder="Password (case sensitive)" type="password" />
      <br />
      <br />
      <label>Your Name:</label><input v-model="register_name" placeholder="Your Name" type="String" />
      <br />
      <br />
      <label>Email:</label><input v-model="register_email" placeholder="email" type="email" />
      <br />
      <br />
      <button type="submit">Register</button>
      <br />
      <br />
      <p>{{register_status}}</p>

    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => {
    return {
      register_username: "",
      register_password: "",
      register_name: "",
      register_email: "",
      register_status: "",
    };
  },
  methods: {
    async registration(e) {
      e.preventDefault();
      console.log("go to register")
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          register_username: this.register_username,
          register_password: this.register_password,
          register_name: this.register_name,
          register_email: this.register_email,      
        }),
      });
      console.log("send request to register")
      const { register_result } = await response.json();
      console.log("receive:" + register_result)
      if (register_result == "Create Success:" + this.register_username) {
          this.register_status = "User Name: " + this.register_username + " has been sucessfully created! Please input verification code which has been sent to " + this.register_email + " in the next login to compelete your registration."
      } else if (register_result == "Exist:" + this.register_username) {
          this.register_status = "A user name: " + this.register_username + " exists in our records. Please enter another one."
      } else if (register_result == "Insert Failed:" + this.register_username) {
          this.register_status = "Your user name: " + this.register_username + " is failed to create. Please enter another one or try later."
      } 
    },
  },
};
</script>