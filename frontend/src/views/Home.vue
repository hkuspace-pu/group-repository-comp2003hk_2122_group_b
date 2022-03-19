

<template>
  <div class="home">
    <center><HelloWorld msg="Tree of the Month"/></center>
	<Dropdown
	    :options="[{ id: 1, name: 'Option 1'}, { id: 2, name: 'Option 2'}]"
	    v-on:selected="validateSelection"
	    v-on:filter="getDropdownValues"
	    :disabled="false"
	    name="zipcode"
	    :maxItem="10"
	    placeholder="Please select an option">
	</Dropdown>
	<div class="dropdown">
	  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
	    Month
	  </button>
	  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
	    <li><a class="dropdown-item" href="#">January</a></li>
	    <li><a class="dropdown-item" href="#">Feburary</a></li>
	    <li><a class="dropdown-item" href="#">March</a></li>
		<li><a class="dropdown-item" href="#">May</a></li>
		<li><a class="dropdown-item" href="#">June</a></li>
		<li><a class="dropdown-item" href="#">July</a></li>
		<li><a class="dropdown-item" href="#">August</a></li>
		<li><a class="dropdown-item" href="#">September</a></li>
		<li><a class="dropdown-item" href="#">October</a></li>
		<li><a class="dropdown-item" href="#">November</a></li>
		<li><a class="dropdown-item" href="#">December</a></li>
	  </ul>
	</div>
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
<script type="text/javascript" src="node_modules/vuejs/dist/vue.min.js"></script>
<script type="text/javascript" src="node_modules/vue-simple-search-dropdown/dist/vue-simple-search-dropdown.min.js"></script>

<script type="text/javascript">

</script>

