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

</script>