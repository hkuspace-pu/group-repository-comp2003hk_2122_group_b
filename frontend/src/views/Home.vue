

<template>
	<div class="home">
		<br>
        <table border='0' width='100%' style='border-collapse: collapse;'>
			<tr>
				<td style= "vertical-align: bottom;"><H1>Tree Of The Month</H1></td>
				<td>
					<H4>
					<form class="card card-sm" style="text-align:right" >
						<div class="card-body row no-gutters align-items-right">
							<div class="col-auto">
								<i class="fa-solid fa-magnifying-glass"></i>
								<!-- <i class="fa-solid fa-magnifying-glass h4 text-body"></i> -->
							</div>
							<div class="col">
										<!-- <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search Tree Name">-->
								<v-select  multiple v-model="SearchTreeNameModel" :options="ListOfTreeName"  @change="select_treename" placeholder="Search Tree Name" />
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
		<H4><v-select multiple v-model="selectedoption" :options="searchmonthoptions"  @change="select_value" placeholder="Choose a Month ..."/></H4>
		<b-container class="bv-example-row">
			<b-row v-for="row in rows">
				<b-col v-for="objitem in row" >
					<!-- you card -->
					<div v-for="(item, key, index) in objitem" v-bind:key="objitem.treeId">
						<div v-if="key === 'treeName'">
							<b-card  style="max-width: 120rem;" class="mb-3">
								<b-card-title>{{objitem.treeName}}</b-card-title>
								<b-card-text>{{objitem.treeDesc}}</b-card-text>
								<b-button variant="primary" @click='select_individual_tree_index(objitem.treeId);'>Details</b-button> 
								<b-card-footer>Tree Id: {{objitem.treeId}}</b-card-footer>
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
			searchmonthoptions: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			],
			selectedoption : [],
			SearchTreeNameModel : [],
			loadeddata: '',
			individualtreeinfo: null,
			
	    }
	},	
	
	created() {
	    console.log('Component has been created!');
		axios.get("https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/trees")
		    .then(response => this.loadeddata = response.data)
		    .catch(error => {
		      this.errorMessage = error.message;
		      console.error("There was an error!", error);
		    });
	},
	  
	methods: {
	   select_value(e) {
			//console.log(e)
			this.selectedoption = e
	   },
	   select_treename(e) {
			//console.log(e)
			this.SearchTreeNameModel = e
	   },
	   select_individual_tree_index(tree_index) {
			//console.log('Tree Index:' + tree_index)
			var ListofTreeInfo = this.loadeddata
			var Select_Individual_Tree_Info = [];
			for(var j = 0; j < ListofTreeInfo.length; j++ ) {
				//console.log('Tree Individual details:' +ListofTreeInfo[j].treeId)
			    if (ListofTreeInfo[j].treeId === tree_index ) {
					Select_Individual_Tree_Info.push(ListofTreeInfo[j])
					break
				}
			}
		//	console.log('Tree Info:' + Select_Individual_Tree_Info[0])
			this.$router.push({name:'SearchTreePage', params: {Select_Individual_Tree_Info : Select_Individual_Tree_Info}});
			
	   },
	   select_individual_tree_name(tree_name_array) {
		   //this.$router.push({name:'SearchTreePage', params: {Select_Individual_Tree_Info : Select_Individual_Tree_Info}});
			//console.log('Tree Name Array:' + tree_name_array);
			var ListofTreeInfo = this.loadeddata;
			var Select_Individual_Tree_Info = [];
			var Select_Individual_Tree_Id = [];
			for(var j = 0; j < ListofTreeInfo.length; j++ ) {
				//console.log('Tree Individual deatails:' +ListofTreeInfo[j].treeId)
				for(var k = 0; k < tree_name_array.length; k++ ) {
					if (ListofTreeInfo[j].treeName === tree_name_array[k] || ListofTreeInfo[j].scientificName === tree_name_array[k] || ListofTreeInfo[j].treeAlias === tree_name_array[k]) {
						if (Select_Individual_Tree_Id.includes(ListofTreeInfo[j].treeId) === false) {
							Select_Individual_Tree_Info.push(ListofTreeInfo[j])
							Select_Individual_Tree_Id.push(ListofTreeInfo[j].treeId)
							console.log('Tree Individual details:' +ListofTreeInfo[j].treeId)
						}
					}
				}
			}
	   		this.$router.push({name:'SearchTreePage', params: {Select_Individual_Tree_Info : Select_Individual_Tree_Info}});
	   },
	},
	
	computed: {
	    rows() {
	        var rows = []
			var itemsPerRow = 3
	        // assuming passer is an array of items..
	        var arr = this.loadeddata
			
	        for (var i = 0; i<arr.length; i+=itemsPerRow){
	            var row = []
	                for (var z = 0; z<itemsPerRow; z++) {
	                    row.push(arr[i + z])
	            }
				rows.push(row)
			}
			return rows
		},
		ListOfTreeName(){
		    var ListofTreeInfo = this.loadeddata
		    var ListOfTreeName = [];
			
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

