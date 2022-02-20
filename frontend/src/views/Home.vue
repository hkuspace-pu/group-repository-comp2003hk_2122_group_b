<template>
  <div class="home">
    <img alt="Tree Project logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to our Tree Survey Records System"/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  
}


import HelloWorld from '@/components/HelloWorld.vue'

</script>
