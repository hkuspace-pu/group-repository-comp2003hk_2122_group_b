

<template>
	<div class="searchtreepage" style="background-color:rgb(34, 40, 39)" >
		<br>
        <table border='0' width='95%' style='border-collapse: collapse;'>
			<tr>
				<!--<td width='30%'style="text-align:center" ><button class="btn btn-default"><img src="../assets/icons8-search-64.png"><h3>Advanced Search</h3></button></td> -->
				<td width='30%'style="text-align:center" >
					<b-button :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'" aria-controls="advancesearch_page" @click="visible = !visible" img src="../assets/icons8-search-64.png" pill variant="info" :pressed="false" variant="success">
						<h5>Advance Tree Search</h5>
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
		<div style="background-color:rgb(34, 40, 39)">
			<b-collapse width='95%' id="advancesearch_page" v-model="visible" class="mt-2">
				<b-card bg-variant="dark" text-variant="white">
					<p class="card-text"><h2>Advanced Search Filter</h2></p>
					<h5>
					<b-list-group flush  bg-variant="dark" text-variant="white">
				    <b-list-group-item >
					<div >
						<b-row  >
						    <b-col sm="5">
						      <label for="input-large">A tree name contains a string (blank to ignore):</label>
						    </b-col>
						    <b-col sm="6">
						      <b-form-input id="input-large" size="lg" v-model = "tree_string" placeholder="input 'tree' when tree name(s) contains 'tree' (i.e. African Tulip Tree)"></b-form-input>
						    </b-col>
						</b-row>
					</div>	
					<div>
						<b-form-group  label="Species:" v-slot="{ ariaDescribedby }">
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
					    <b-form-group label="Flowering Period (Jan - Dec, Uncheck all boxes to ignore)" v-slot="{ ariaDescribedby }">
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
					    <b-form-group label="Fruiting Period (Jan - Dec, Uncheck all boxes to ignore)" v-slot="{ ariaDescribedby }">
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
						<b-form-group label="Subject to Forests and Countryside (Cap. 96)" v-slot="{ ariaDescribedby }">
							<b-form-radio-group 
								v-model="Cap96_selected" 
								:options="Cap96_options" 
								:aria-describedby="ariaDescribedby" 
								 name="Cap96_Radio"
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
					<br>
					<div class="line-1" ></div> 
					<br>
					<h2>Advanced Filter Summary</h2>
					<h5>
					<br>
					<div class="tree_string mt-3">Tree Name Contains: <strong>*{{ tree_string }}*</strong></div>
					<div class="ecologic mt-3">Ecologic: <strong>{{ Exotic_Radio_Button_selected }}</strong></div>
					<div class="flowering_period mt-3">Flowering Period(s) / Month: <strong>{{ Flower_Starting_Period_Checked_Box_Group_Selected }}</strong></div>
					<div class="fruiting_period mt-3">Fruiting Period(s) / Month: <strong>{{ Fruit_Starting_Period_Checked_Box_Group_Selected }}</strong></div>
					<div class="Cap95 mt-3">Subject to Forests and Countryside Oridance(Cap. 96): <strong>{{ Cap96_selected }}</strong></div>
					<div class="Cap586 mt-3">Subject to Protection of Endangered Species of Animals and Plant Ordiance (Cap. 586): <strong>{{ Cap586_selected }}</strong></div>
					<div class="RareHK mt-3">Rare in Hong Kong: <strong>{{ RareHK_selected }}</strong></div>
					<div class="RareChina mt-3">Rare in China: <strong>{{ RareChina_selected }}</strong></div>
					</h5>
					<br>
					</b-list-group-item>
					</b-list-group>
					<br>
					<b-button pill variant="info" @click='filter_individual_tree_name' ><h5>Confirm</h5></b-button>
				</b-card>
			</b-collapse>
	    </div>
	   
		<br>
		<div class="line-1" ></div> 
		<br>
		<H2><p class="text-white" >Search Result</p></H2>
		<br>
		<H5>
		<b-container class="bv-example-row">
			<b-row v-for="row in rows">
				<b-col v-for="objitem in row" >
					<!-- you card -->
					<div v-for="(item, key, index) in objitem" v-bind:key="objitem.treeId">
						<div v-if="key === 'treeNameEn'">
							<b-card  style="max-width: 120rem;" class="mb-3">
								<b-card
								    no-body
								    style="max-width: 110rem;"
								    :img-src="objitem.treeImage"
								    img-alt="Image"
								    img-top
								  >
								  <!--
								    <template #header>
								        <h4 class="mb-0">Hello World</h4>
								    </template>
									-->
								    <b-card-body>
								      <b-card-title>{{objitem.treeNameEn}}</b-card-title>
								      <b-card-sub-title class="mb-3">Sci. Name:{{objitem.scientificName}}</b-card-sub-title>
								      <b-card-text v-if="objitem.treeDescEn.includes('http')">
								         <b-link :href="objitem.treeDescEn">{{objitem.treeDescEn}}</b-link> 
								      </b-card-text>
									  <b-card-text v-else>
									     {{objitem.treeDescEn}}
										 <br>
										 <br>
										 {{objitem.treeDescCn}}
									  </b-card-text>
								    </b-card-body>
								
								    <b-list-group flush>
										<b-list-group-item>Chinese Name : {{objitem.treeNameCn}}</b-list-group-item>
										<b-list-group-item>Alias Name : {{objitem.alias}}</b-list-group-item>
										<b-list-group-item>Ecologic : {{objitem.ecologic}}</b-list-group-item>
										<b-list-group-item>Flowering Period : {{ periodRange(objitem.flowering) }}</b-list-group-item>
										<b-list-group-item>Fruiting Period : {{ periodRange(objitem.fruit) }}</b-list-group-item>
										<b-list-group-item>Rare in China : {{ yes_no_convert[objitem.cnRare]}}</b-list-group-item>
										<b-list-group-item>Rare in Hong Kong : {{yes_no_convert[objitem.hkRare]}}</b-list-group-item>
										<b-list-group-item>Under Forests and Countryside Oridance : {{yes_no_convert[objitem.cap96]}}</b-list-group-item>
										<b-list-group-item>Under Protection of Species Ordiance : {{yes_no_convert[objitem.cap586]}}</b-list-group-item>																			
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
		</H5>
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
			Exotic_Radio_Button_selected: 'Exotic and Native',
			Exotic_Radio_Button_options: [
			    { value: 'Exotic', text: 'Exotic' },
			    { value: 'Native', text: 'Native' },
			    { value: 'Exotic and Native', text: 'Exotic and Native' }
			],
			Cap96_selected: 'Ignore',
			Cap96_options: [
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
			    { monthvalue: 'January', monthtext: "January"},
			    { monthvalue: 'February', monthtext: "February"},
			    { monthvalue: 'March', monthtext: 'March'},
				{ monthvalue: 'April', monthtext: 'April' },
				{ monthvalue: 'May', monthtext: 'May'},
				{ monthvalue: 'June', monthtext: 'June' },
				{ monthvalue: 'July', monthtext: 'July'},
				{ monthvalue: 'August', monthtext: 'August' },
				{ monthvalue: 'September', monthtext: 'September' },
				{ monthvalue: 'October', monthtext: 'October'},
				{ monthvalue: 'November', monthtext: 'November' },
				{ monthvalue: 'December', monthtext: 'December' }
			],
			Fruit_Starting_Period_Checked_Box_Group_Selected: [],
			Fruit_Starting_Period_Checked_Box_Group_Options: [
			    { fruit_month_value: 'January', fruit_month_text:  'January' },
			    { fruit_month_value: 'February', fruit_month_text: 'February' },
			    { fruit_month_value: 'March', fruit_month_text: 'March' },
				{ fruit_month_value: 'April', fruit_month_text: 'April'},
				{ fruit_month_value: 'May', fruit_month_text: 'May'},
				{ fruit_month_value: 'June', fruit_month_text: 'June' },
				{ fruit_month_value: 'July', fruit_month_text: 'July'},
				{ fruit_month_value: 'August', fruit_month_text: 'August' },
				{ fruit_month_value: 'September', fruit_month_text: 'September'},
				{ fruit_month_value: 'October', fruit_month_text: 'October' },
				{ fruit_month_value: 'November', fruit_month_text: 'November' },
				{ fruit_month_value: 'December', fruit_month_text: 'December' }	
			],
			monthnumber : [1,2,3,4,5,6,7,8,9,10,11,12],	
			yes_no_convert: ['No', 'Yes', '-']
	    }
	},	
	
	created() {		 
	    axios.get("https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/trees")
	        .then(response => {
				this.loadeddata = response.data
	        }).catch(error => {
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

		periodRange(period_indicator){
			var startMonth = "";
			var endMonth = "";
			for (var i = 0; i < period_indicator.length; i++) {
				if (period_indicator.charAt(i) === "1" ) {
					if (startMonth === ""){
						startMonth = this.searchmonthoptions[i];
					}
				   endMonth = this.searchmonthoptions[i];
				}
			}
			//period_Range = startMonth + " - " + endMonth;
			//console.log (periodRange);
			return startMonth + " - " + endMonth;
		},
		
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
						if (ListofTreeInfo[j].treeNameEn === tree_name_array[k] || ListofTreeInfo[j].scientificName === tree_name_array[k] || ListofTreeInfo[j].treeAlias === tree_name_array[k]) {
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
		filter_individual_tree_name() {
				//this.$router.push({name:'SearchTreePage', params: {Select_Individual_Tree_Info : Select_Individual_Tree_Info}});
						var ListofTreeInfo = this.loadeddata;
						var Select_Individual_Tree_Info = [];
						var treeNameEN = ""
						var treescientificName = ""
						var treeNameEN = ""
						console.log("Tree Name Survey Name-->:+" + this.tree_string + "")
						if(typeof(this.tree_string) === 'undefined' || this.tree_string === null || this.tree_string === '') {
							
							Select_Individual_Tree_Info = ListofTreeInfo
							console.log("Tree Name Survey Name-->:" + Select_Individual_Tree_Info[0].treeNameEn)
						} else if (this.tree_string.length > 0) {
							for(var j = 0; j < ListofTreeInfo.length; j++ ) {
							//console.log('Tree Individual deatails:' +ListofTreeInfo[j].treeId)
								if (ListofTreeInfo[j].treeNameEn.toLowerCase().includes(this.tree_string.toLowerCase()) || ListofTreeInfo[j].scientificName.toLowerCase().includes(this.tree_string.toLowerCase()) || ListofTreeInfo[j].alias.toLowerCase().includes(this.tree_string.toLowerCase())) {
										Select_Individual_Tree_Info.push(ListofTreeInfo[j])
								}
							}
					    } else {
								Select_Individual_Tree_Info = ListofTreeInfo
								console.log("Tree Name Survey Name-->:" + Select_Individual_Tree_Info[0].treeNameEn)
						}
						
						var Select_Individual_Tree_Info0 = [];
						if (this.Exotic_Radio_Button_selected !=  'Exotic and Native') {
							for(var j = 0; j < Select_Individual_Tree_Info.length; j++ ) {
							//console.log('Tree Individual deatails:' +ListofTreeInfo[j].treeId)
								if (Select_Individual_Tree_Info[j].ecologic === this.Exotic_Radio_Button_selected ) {
										Select_Individual_Tree_Info0.push(Select_Individual_Tree_Info[j])
								}
							}
						} else {
							Select_Individual_Tree_Info0 = Select_Individual_Tree_Info
						}
						
						var Select_Individual_Tree_Info1 = []
						if (this.Flower_Starting_Period_Checked_Box_Group_Selected.length > 0) {
							for(var j = 0; j < this.Flower_Starting_Period_Checked_Box_Group_Selected.length; j++ ) {
								for(var k = 0; k < Select_Individual_Tree_Info.length; k++ ) {
									if (Select_Individual_Tree_Info0[k].flowering.IndexOf(this.monthnumber[this.searchmonthoptions.IndexOf(this.Flower_Starting_Period_Checked_Box_Group_Selected[j])]-1) == 1) {
										Select_Individual_Tree_Info1.push(Select_Individual_Tree_Info0[k])
									}
								}
						    }
						} else {
							Select_Individual_Tree_Info1 = Select_Individual_Tree_Info0
						}
							
						var Select_Individual_Tree_Info2 = []
						if (this.Fruit_Starting_Period_Checked_Box_Group_Selected.length > 0) {
							for(var j = 0; j < this.Fruit_Starting_Period_Checked_Box_Group_Selected.length; j++ ) {
								for(var k = 0; k < Select_Individual_Tree_Info1.length; k++ ) {
									if (Select_Individual_Tree_Info1[k].fruit.IndexOf(this.monthnumber[this.searchmonthoptions.IndexOf(this.Fruit_Starting_Period_Checked_Box_Group_Selected[j])]-1) == 1) {
										Select_Individual_Tree_Info2.push(Select_Individual_Tree_Info1[k])
									}
								}
						    }
						} else {
							Select_Individual_Tree_Info2 = Select_Individual_Tree_Info1
						}
						
			            var Select_Individual_Tree_Info3 = []
						var yes_no_value = -1;
						if (this.Cap96_selected != 'Ignore') {
							if (this.Cap96_selected === "Yes") {
								yes_no_value = 1
							} else if (this.Cap96_selected === "No") {
								yes_no_value = 0
							}
							for(var j = 0; j < Select_Individual_Tree_Info2.length; j++ ) {
								//console.log('Tree Individual deatails:' +ListofTreeInfo[j].treeId)
								if (Select_Individual_Tree_Info2[j].cap96 == yes_no_value ) {
										Select_Individual_Tree_Info3.push(Select_Individual_Tree_Info2[j])
								}
						    }
						} else {
							Select_Individual_Tree_Info3 = Select_Individual_Tree_Info2
						}
						
			            var Select_Individual_Tree_Info4 = []
						var yes_no_value = -1;
						if (this.Cap586_selected != 'Ignore') {
							if (this.Cap586_selected === "Yes") {
								yes_no_value = 1
							} else if (this.Cap586_selected === "No") {
								yes_no_value = 0
							}
							for(var j = 0; j < Select_Individual_Tree_Info3.length; j++ ) {
								//console.log('Tree Individual deatails:' +ListofTreeInfo[j].treeId)
								if (Select_Individual_Tree_Info3[j].cap586 == yes_no_value ) {
										Select_Individual_Tree_Info4.push(Select_Individual_Tree_Info3[j])
								}
						    }
						} else {
							Select_Individual_Tree_Info4 = Select_Individual_Tree_Info3
						}						
						
			            var Select_Individual_Tree_Info5 = []
						var yes_no_value = -1;
						if (this.RareHK_selected != 'Ignore') {
							if (this.RareHK_selected === "Yes") {
								yes_no_value = 1
							} else if (this.RareHK_selected === "No") {
								yes_no_value = 0
							}
							for(var j = 0; j < Select_Individual_Tree_Info4.length; j++ ) {
								//console.log('Tree Individual deatails:' +ListofTreeInfo[j].treeId)
								if (Select_Individual_Tree_Info4[j].hkRare == yes_no_value ) {
										Select_Individual_Tree_Info5.push(Select_Individual_Tree_Info4[j])
								}
						    }
						} else {
							Select_Individual_Tree_Info5 = Select_Individual_Tree_Info4
						}							
		
						var Select_Individual_Tree_Info6 = []
						var yes_no_value = -1;
						if (this.RareChina_selected != 'Ignore') {
							if (this.RareChina_selected === "Yes") {
								yes_no_value = 1
							} else if (this.RareChina_selected === "No") {
								yes_no_value = 0
							}
							for(var j = 0; j < Select_Individual_Tree_Info5.length; j++ ) {
								//console.log('Tree Individual deatails:' +ListofTreeInfo[j].treeId)
								if (Select_Individual_Tree_Info5[j].cnRare == yes_no_value ) {
										Select_Individual_Tree_Info6.push(Select_Individual_Tree_Info5[j])
								}
						    }
						} else {
							Select_Individual_Tree_Info6 = Select_Individual_Tree_Info5
						}	
				
						this.Select_Individual_Tree_Info = Select_Individual_Tree_Info6	;	

						
					
		},
	},
	
	computed: {
		

	    rows() {
	        var rows = []
			var itemsPerRow = 2
	        // assuming passer is an array of items..this.Select_Individual_Tree_Infoif
			console.log('Tree Individual details to be displayed if any' + this.Select_Individual_Tree_Info)
			if (typeof(this.Select_Individual_Tree_Info) !== 'undefined' && this.Select_Individual_Tree_Info !== null)  {
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
	            if (ListofTreeInfo[j].treeNameEn !== '' && ListOfTreeName.includes(ListofTreeInfo[j].treeNameEn) === false) {
					ListOfTreeName.push(ListofTreeInfo[j].treeNameEn)
				}
				if (ListofTreeInfo[j].treeAlias !== '' && ListOfTreeName.includes(ListofTreeInfo[j].treeAlias) === false) {
					ListOfTreeName.push(ListofTreeInfo[j].treeAlias)
				}
				if (ListofTreeInfo[j].scientificName !== '' && ListOfTreeName.includes(ListofTreeInfo[j].scientificName) === false ) {
					ListOfTreeName.push(ListofTreeInfo[j].scientificName)
				}
		    }
			console.log('Final List Of Tree Name:' + ListofTreeInfo[0])
		    return ListOfTreeName
			
		},
		
		
		
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
 .line-1{
width: 100%;
height: 2px;
border-bottom: 2px solid white;
position: absolute;
}
</style>

