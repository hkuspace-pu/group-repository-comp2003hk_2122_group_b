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


</script>