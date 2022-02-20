<template>
  <div class="hello">
    
    <h1 v-if="isLoggedIn">Hi {{CurrentUser}}, {{ msg }}</h1><h1 v-else-if="!isLoggedIn">Hi, {{ msg }}</h1>

    <p>
      Hong Kong Tree Survey and Record Systems<br>      
      <a href="https://www.plymouth.ac.uk/" target="_blank" rel="noopener">Plymouth of University</a>.
    </p>
    <h3>Hong Kong Tree Project - HK Govenment</h3>
    <ul>
      <li><a href="https://www.greening.gov.hk/en/community_outreach/tree_register.html" target="_blank" rel="noopener">Greeing Project - Hong Kong Govenment</a></li>
      <li><a href="https://www.housingauthority.gov.hk/en/about-us/community-engagement/green-living/tree-information/index.html" target="_blank" rel="noopener">Tree Species in Hong Kong Estates</a></li>   
    </ul>
    <h3>Hong Kong Tree Database</h3>
    <ul>
      <li><a href="https://urbantreesoftheworld.com/urban-trees-of-hong-kong/hong-kong-tree-database/" target="_blank" rel="noopener">HK Tree Database</a></li>      
      <li><a href="https://www.herbarium.gov.hk/en/publications/books/book5/index.html">HK Plant Database</a></li>
    </ul>
    <h3>Other Information</h3>
    <ul>
      <li><a href="https://www.afcd.gov.hk/english/conservation/con_end/con_end_reg/con_end_reg_some/con_end_reg_some_new.html" target="_blank" rel="noopener">HK Scheduled Species</a></li>
      <li><a href="https://www.legco.gov.hk/database/english/data_plw/plw-tree-management.htm">HK Tree Management</a></li> 
      <li><a href="https://www.hk-rfid.com/tree-health-record-system">HK Health Tree e-Record Systems</a></li> 
    </ul>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters(["CurrentUser"]),
    ...mapGetters(["isLoggedIn"]),
  }, 
  
}





</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
