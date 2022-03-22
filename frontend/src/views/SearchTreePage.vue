

<template>
	<div class="searchtreepage">
        <table border='0' width='95%' style='border-collapse: collapse;'>
			<tr>
				<td width='30%'style="text-align:center" ><button class="btn btn-default"><img src="../assets/icons8-search-64.png"><h3>Advanced Search</h3></button></td>
				<td width='65%'style="text-align:center">

					<form class="card card-sm" style="text-align:right" >
						<div class="card-body row no-gutters align-items-right">
							<div class="col-auto">
								<i class="fa-solid fa-magnifying-glass"></i>
								<!-- <i class="fa-solid fa-magnifying-glass h4 text-body"></i> -->
							</div>
							<div class="col">
										<!-- <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search Tree Name">-->
								<v-select  multiple v-model="SearchTreeNameModel" :options="ListOfTreeName"  placeholder="Search Tree Name"/>
							</div>
							<div class="col-auto">
									<button type="button" class="btn btn-lg btn-success"  @click="select_individual_tree_name(SearchTreeNameModel)">Search</button>
								
							</div>
						</div>
					</form>
					</H4>
				</td>
			</tr>
	   </table>	
	   <br>
		<H4>Search Result</H4>
		<br>
		<b-container class="bv-example-row">
			<b-row v-for="row in rows">
				<b-col v-for="objitem in row" >
					<!-- you card -->
					<div v-for="(item, key, index) in objitem" v-bind:key="objitem.treeId">
						<div v-if="key === 'treeName'">
							<b-card  style="max-width: 120rem;" class="mb-3">
								<b-card
								    no-body
								    style="max-width: 110rem;"
								    img-src="objitem.treeImage"
								    img-alt="Image"
								    img-top
								  >
								  <!--
								    <template #header>
								        <h4 class="mb-0">Hello World</h4>
								    </template>
									-->
								    <b-card-body>
								      <b-card-title>{{objitem.treeName}}</b-card-title>
								      <b-card-sub-title class="mb-3">{{objitem.scientificName}}</b-card-sub-title>
								      <b-card-text>
								        {{objitem.treeDesc}}
								      </b-card-text>
								    </b-card-body>
								
								    <b-list-group flush>
								      <b-list-group-item>Ecologic: {{objitem.ecologic}}</b-list-group-item>
								      <b-list-group-item>Flower Start: {{objitem.floweringStart}}</b-list-group-item>
								      <b-list-group-item>Flower End: {{objitem.floweringEnd}}</b-list-group-item>
								      <b-list-group-item>Fruit Start: {{objitem.fruitStart}}</b-list-group-item>
								      <b-list-group-item>Fruit End: {{objitem.fruitEnd}}</b-list-group-item>
									  <b-list-group-item>Alias Name: {{objitem.treeAlias}}</b-list-group-item>
									</b-list-group>
								    <!--
									<b-card-body>
								      <a href="#" class="card-link">Card link</a>
								      <a href="#" class="card-link">Another link</a>
								    </b-card-body>
								    -->
								    <b-card-footer>Tree Id: {{objitem.treeId}}</b-card-footer>
								    <!--
								    <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom></b-card-img>
									-->
								  </b-card>
							</b-card>
						</div>
					</div>
				</b-col>
				<br>
			</b-row>
		</b-container>
	</div>
	
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Vue from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', VueSelect.VueSelect)
export default {
	
	props:['data'],
	components: {
	            vSelect,
	},
	data() {
	    return {
			SearchTreeNameModel : [],
			loadeddata: '',
			individualtreeinfo: null,
			Select_Individual_Tree_Info: '',
	    }
	},	
	
	created() {
		 
	    axios.get("https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/trees")
	        .then(response => this.loadeddata = response.data)
	        .catch(error => {
	          this.errorMessage = error.message;
	          console.error("There was an error!", error);
	        });
			console.log('loaded data:' + this.loadeddata );
			
	},
	
	mounted: function () {
		if (this.$route.params.Select_Individual_Tree_Info !== []) {
		      this.Select_Individual_Tree_Info = this.$route.params.Select_Individual_Tree_Info
			  console.log('Inside Search Tree Page1:' + this.Select_Individual_Tree_Info)
		} else {
			this.Select_Individual_Tree_Info = []
			console.log('Inside Search Tree Page2:' + this.Select_Individual_Tree_Info)
		}
		
	},
	

	
	methods: {


	   select_individual_tree_name(tree_name_array) {
	   		//this.$router.push({name:'SearchTreePage', params: {Select_Individual_Tree_Info : Select_Individual_Tree_Info}});
			if (tree_name_array.length > 0 ) {
				console.log('Tree Name Array selected:' + tree_name_array);
				var ListofTreeInfo = this.loadeddata;
				this.Select_Individual_Tree_Info = [];
				var Select_Individual_Tree_Id = [];
				for(var j = 0; j < ListofTreeInfo.length; j++ ) {
					//console.log('Tree Individual deatails:' +ListofTreeInfo[j].treeId)
					for(var k = 0; k < tree_name_array.length; k++ ) {
						if (ListofTreeInfo[j].treeName === tree_name_array[k] || ListofTreeInfo[j].scientificName === tree_name_array[k] || ListofTreeInfo[j].treeAlias === tree_name_array[k]) {
							if (Select_Individual_Tree_Id.includes(ListofTreeInfo[j].treeId) === false) {
								this.Select_Individual_Tree_Info.push(ListofTreeInfo[j])
								Select_Individual_Tree_Id.push(ListofTreeInfo[j].treeId)
								console.log('Tree Individual details:' +ListofTreeInfo[j].treeId)
							}
						}
					}
				}
			}
		},
	},
	
	computed: {
	    rows() {
	        var rows = []
			var itemsPerRow = 2
	        // assuming passer is an array of items..this.Select_Individual_Tree_Infoif
			console.log('Tree Individual details to be displayed if any' + this.Select_Individual_Tree_Info)
			if (typeof(this.Select_Individual_Tree_Infoif) !== 'undefined' || this.Select_Individual_Tree_Infoif !== null)  {
				try {
					var arr = this.Select_Individual_Tree_Info
					console.log('Tree Individual details to be displayed not empty:' + this.Select_Individual_Tree_Info)
					for (var i = 0; i<arr.length; i+=itemsPerRow){
						var row = []
							for (var z = 0; z<itemsPerRow; z++) {
								row.push(arr[i + z])
							}
						rows.push(row)
					}
				} catch (e) {
					console.error('Error at SearchPage Rows Function: ' + e)
				}
				
			}	
			return rows
		},
		ListOfTreeName(){
		    var ListofTreeInfo = this.loadeddata
		    var ListOfTreeName = [];
			console.log('List Of Tree Name to be searched:' + ListofTreeInfo[0])
		    for(var j = 0; j < ListofTreeInfo.length; j++ ) {
	            if (ListofTreeInfo[j].treeName !== '' && ListOfTreeName.includes(ListofTreeInfo[j].treeName) === false) {
					ListOfTreeName.push(ListofTreeInfo[j].treeName)
				}
				if (ListofTreeInfo[j].treeAlias !== '' && ListOfTreeName.includes(ListofTreeInfo[j].treeAlias) === false) {
					ListOfTreeName.push(ListofTreeInfo[j].treeAlias)
				}
				if (ListofTreeInfo[j].scientificName !== '' && ListOfTreeName.includes(ListofTreeInfo[j].scientificName) === false ) {
					ListOfTreeName.push(ListofTreeInfo[j].scientificName)
				}
		    }
		    return ListOfTreeName
			console.log('Final List Of Tree Name:' + ListofTreeInfo[0])
		}
		
	}
}
</script>
<style>
.form-control-borderless {
    border: none;
}

.form-control-borderless:hover, .form-control-borderless:active, .form-control-borderless:focus {
    border: none;
    outline: none;
    box-shadow: none;
}

</style>

