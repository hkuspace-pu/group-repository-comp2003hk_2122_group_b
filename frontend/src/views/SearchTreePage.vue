

<template>
	<div class="searchtreepage">
		<br>
        <table border='0' width='95%' style='border-collapse: collapse;'>
			<tr>
				<!--<td width='30%'style="text-align:center" ><button class="btn btn-default"><img src="../assets/icons8-search-64.png"><h3>Advanced Search</h3></button></td> -->
				<td width='30%'style="text-align:center" >
					<b-button :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'" aria-controls="advancesearch_page" @click="visible = !visible" img src="../assets/icons8-search-64.png" pill variant="info" :pressed="false" variant="success">
						<h5>Advance Search</h5>
					</b-button>
				</td>
				<td width='65%'style="text-align:center">
					<form class="card card-sm" style="text-align:right" >
						<div class="card-body row no-gutters align-items-right">
							<div class="col-auto">
								<i class="fa-solid fa-magnifying-glass"></i>
								<!-- <i class="fa-solid fa-magnifying-glass h4 text-body"></i> -->
							</div>
							<div class="col">
										<!-- <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search Tree Name"> -->
								<h4><v-select  multiple v-model="SearchTreeNameModel" :options="ListOfTreeName"  placeholder="Search Tree Name"/></h4>
							</div>
							<div class="col-auto">
									<button type="button" class="btn btn-lg btn-success"  @click="select_individual_tree_name(SearchTreeNameModel)">Search Name</button>
							</div>
						</div>
					</form>
					</H4>
				</td>
			</tr>
		</table>	
		<div>
			<b-collapse width='95%' id="advancesearch_page" v-model="visible" class="mt-2">
				<b-card>
					<p class="card-text"><h2>Advanced Search Filter</h2></p>
					<h3>
					<b-list-group flush>
				    <b-list-group-item>
					<div>
						<b-row class="my-1">
						    <b-col sm="6">
						      <label for="input-large">A tree name contains a string (blank to ignore):</label>
						    </b-col>
						    <b-col sm="4">
						      <b-form-input id="input-large" size="lg" placeholder="input 'amb' when tree name(s) contains 'amb' (i.e. Carambola)"></b-form-input>
						    </b-col>
						</b-row>
					</div>
					<br>	
					<div>
						<b-form-group label="Species:" v-slot="{ ariaDescribedby }">
							<b-form-radio-group 
								v-model="Exotic_Radio_Button_selected" 
								:options="Exotic_Radio_Button_options" 
								:aria-describedby="ariaDescribedby" 
								 name="Exotic_Radio"
								plain>
							</b-form-radio-group>
						</b-form-group>
					</div>
					<br>
					<div>
					    <b-form-group label="Flower Starting Period (1 - 12 /Jan - Dec, Uncheck all boxes to ignore)" v-slot="{ ariaDescribedby }">
							<b-form-checkbox-group
							:options="Flower_Starting_Period_Checked_Box_Group_Options"
							v-model="Flower_Starting_Period_Checked_Box_Group_Selected"
							:aria-describedby="ariaDescribedby"
							value-field="monthtext"
							text-field="monthvalue"
							name="Flower_Starting_Period_Checked_Box_Group"
							plain>
							</b-form-checkbox-group>
					    </b-form-group>
					</div>
					<br>
					<div>
					    <b-form-group label="Fruit Starting Period (1 - 12 /Jan - Dec, Uncheck all boxes to ignore)" v-slot="{ ariaDescribedby }">
							<b-form-checkbox-group
							:options="Fruit_Starting_Period_Checked_Box_Group_Options"
							v-model="Fruit_Starting_Period_Checked_Box_Group_Selected"
							:aria-describedby="ariaDescribedby"
							value-field="fruit_month_value"
							text-field="fruit_month_text"
							name="Fruit_Starting_Period_Checked_Box_Group"
							plain>
							</b-form-checkbox-group>
					    </b-form-group>
					</div>
					<br>
					<div>
						<b-form-group label="Subject to Forests and Countryside (Cap. 95)" v-slot="{ ariaDescribedby }">
							<b-form-radio-group 
								v-model="Cap95_selected" 
								:options="Cap95_options" 
								:aria-describedby="ariaDescribedby" 
								 name="Cap95_Radio"
								plain>
							</b-form-radio-group>
						</b-form-group>
					</div>
					<br>
					<div>
						<b-form-group label="Subject to Protection of Endangered Species of Animals and Plant Ordiance (Cap. 586)" v-slot="{ ariaDescribedby }">
							<b-form-radio-group 
								v-model="Cap586_selected" 
								:options="Cap586_options" 
								:aria-describedby="ariaDescribedby" 
								 name="Cap586_Radio"
								plain>
							</b-form-radio-group>
						</b-form-group>
					</div>
					<br>
					<div>
						<b-form-group label="Rare Species in Hong Kong" v-slot="{ ariaDescribedby }">
							<b-form-radio-group 
								v-model="RareHK_selected" 
								:options="RareHK_options" 
								:aria-describedby="ariaDescribedby" 
								 name="RareHK_Radio"
								plain>
							</b-form-radio-group>
						</b-form-group>
					</div>
					<br>
					<div>
						<b-form-group label="Rare Species in China" v-slot="{ ariaDescribedby }">
							<b-form-radio-group 
								v-model="RareChina_selected" 
								:options="RareChina_options" 
								:aria-describedby="ariaDescribedby" 
								 name="RareChina_Radio"
								plain>
							</b-form-radio-group>
						</b-form-group>
					</div>
					<br>
					</b-list-group-item>
					<b-list-group-item>
					</h3>
					<h2>Filter Summary</h2>
					<h3>
					<br>
					<div class="ecologic mt-3">Ecologic: <strong>{{ Exotic_Radio_Button_selected }}</strong></div>
					<div class="flower_starting_period mt-3">Flowering Starting Period / Month: <strong>{{ Flower_Starting_Period_Checked_Box_Group_Selected }}</strong></div>
					<div class="fruit_starting_period mt-3">Fruit Starting Period / Month: <strong>{{ Fruit_Starting_Period_Checked_Box_Group_Selected }}</strong></div>
					<div class="Cap95 mt-3">Subject to Forests and Countryside (Cap. 95): <strong>{{ Cap95_selected }}</strong></div>
					<div class="Cap586 mt-3">Subject to Protection of Endangered Species of Animals and Plant Ordiance (Cap. 586): <strong>{{ Cap586_selected }}</strong></div>
					<div class="RareHK mt-3">Rare in Hong Kong: <strong>{{ RareHK_selected }}</strong></div>
					<div class="RareChina mt-3">Rare in China: <strong>{{ RareChina_selected }}</strong></div>
					</h3>
					<br>
					</b-list-group-item>
					</b-list-group>
					<br>
					<b-button pill variant="info"><h5>Confirm</h5></b-button>
				</b-card>
			</b-collapse>
	    </div>
	   
	   <br>
		<H2>Search Result</H2>
		<br>
		<H3>
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
		</H3>
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
			visible: false,
			Exotic_Radio_Button_selected: 'Exotic and Native',
			Exotic_Radio_Button_options: [
			    { value: 'Exotic', text: 'Exotic' },
			    { value: 'Native', text: 'Native' },
			    { value: 'Exotic and Native', text: 'Exotic and Native' }
			],
			Cap95_selected: 'Ignore',
			Cap95_options: [
			    { value: 'Yes', text: 'Yes' },
			    { value: 'No', text: 'No' },
				{ value: 'Ignore', text: 'Ignore' },
			],
			Cap586_selected: 'Ignore',
			Cap586_options: [
			    { value: 'Yes', text: 'Yes' },
			    { value: 'No', text: 'No' },
				{ value: 'Ignore', text: 'Ignore' },
			],
			RareHK_selected: 'Ignore',
			RareHK_options: [
			    { value: 'Yes', text: 'Yes' },
			    { value: 'No', text: 'No' },
				{ value: 'Ignore', text: 'Ignore' },
			],
			RareChina_selected: 'Ignore',
			RareChina_options: [
			    { value: 'Yes', text: 'Yes' },
			    { value: 'No', text: 'No' },
				{ value: 'Ignore', text: 'Ignore' },
			],
			Flower_Starting_Period_Checked_Box_Group_Selected: [],
			Flower_Starting_Period_Checked_Box_Group_Options: [
			    { monthtext: 1, monthvalue: "1		"},
			    { monthtext: 2, monthvalue: "2		"},
			    { monthtext: 3, monthvalue: 3},
				{ monthtext: 4, monthvalue: 4 },
				{ monthtext: 5, monthvalue: 5},
				{ monthtext: 6, monthvalue: 6 },
				{ monthtext: 7, monthvalue: 7},
				{ monthtext: 8, monthvalue: 8 },
				{ monthtext: 9, monthvalue: 9 },
				{ monthtext: 10, monthvalue: 10},
				{ monthtext: 11, monthvalue: 11 },
				{ monthtext: 12, monthvalue: 12 }
				
			],
			Fruit_Starting_Period_Checked_Box_Group_Selected: [],
			Fruit_Starting_Period_Checked_Box_Group_Options: [
			    { fruit_month_value: 1, fruit_month_text:  1 },
			    { fruit_month_value: 2, fruit_month_text: 2 },
			    { fruit_month_value: 3, fruit_month_text: 3 },
				{ fruit_month_value: 4, fruit_month_text: 4},
				{ fruit_month_value: 5, fruit_month_text: 5},
				{ fruit_month_value: 6, fruit_month_text: 6 },
				{ fruit_month_value: 7, fruit_month_text: 7},
				{ fruit_month_value: 8, fruit_month_text: 8 },
				{ fruit_month_value: 9, fruit_month_text: 9},
				{ fruit_month_value: 10, fruit_month_text: 10 },
				{ fruit_month_value: 11, fruit_month_text: 11 },
				{ fruit_month_value: 12, fruit_month_text: 12 }
				
			],
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

