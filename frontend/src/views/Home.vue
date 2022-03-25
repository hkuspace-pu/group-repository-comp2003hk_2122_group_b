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
		<H4><v-select multiple  :value="selected" :options="searchmonthoptions" @input="setSelected"  placeholder="Choose a Month ..."/></H4>
		<b-container class="bv-example-row">
			<b-row v-for="row in rows">
				<b-col v-for="objitem in row" >
					<div v-for="(item, key, index) in objitem" v-bind:key="objitem.treeId">
						<div v-if="key === 'treeName'">
							<b-card :img-src="objitem.treeImage" img-alt="Image" img-top tag="article" style="max-width: 120rem;" class="mb-3">
								<b-card-title>{{objitem.treeName}}</b-card-title> 
								<b-card-sub-title class="mb-3">{{objitem.scientificName}}</b-card-sub-title>
								<b-card-text>Alias:{{objitem.treeAlias}}</b-card-text>
								<!--<b-button @click="ShowTreeDetails(objitem.treeId)">Details</b-button> -->
								<b-button @click="ShowTreeDetails(objitem.treeId,objitem.treeName,objitem.treeAlias,objitem.scientificName,objitem.ecologic,objitem.floweringStart,objitem.floweringEnd,objitem.fruitStart,objitem.fruitEnd,objitem.cnRare,objitem.hkRare,objitem.cap96,objitem.cap586,objitem.treeImage,objitem.treeDesc)">Details</b-button> 		
								<b-card-footer>Reference Id: {{objitem.treeId}}</b-card-footer> 
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
			SearchTreeNameModel : [],
			loadeddata: '',
			individualtreeinfo: null,
			monthnumber : [1,2,3,4,5,6,7,8,9,10,11,12],
			selected :[],
			targetmonthnumber_list : [],
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
		let d = new Date().getMonth()+1
		console.log("month current:" + d);
		this.targetmonthnumber_list.push(d);
		this.selected = this.searchmonthoptions[new Date().getMonth()];
	},
	  
	methods: {
	   setSelected(value) {
		   this.selected = value
		   this.targetmonthnumber_list = []
			for(var j = 0; j < value.length; j++ ) {
		    	//console.log('Tree Individual details:' +ListofTreeInfo[j].treeId)
		    	this.targetmonthnumber_list.push(this.monthnumber[this.searchmonthoptions.indexOf(value[j])]);
		    }
			console.log("selected month(s):" + this.targetmonthnumber_list)
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
	   
	
	   ShowTreeDetails(tree_id,tree_name,tree_alias,tree_scientific_name,tree_ecologic,tree_flowering_start,tree_flowering_end,tree_fruit_start,tree_fruit_end,rare_China,rare_HK,cap_96,cap_586,tree_image,tree_desc) {
	           tree_fruit_start = this.searchmonthoptions[tree_fruit_start-1]
			   tree_fruit_end = this.searchmonthoptions[tree_fruit_end-1]
			   tree_flowering_start = this.searchmonthoptions[tree_flowering_start-1]
			   tree_flowering_end = this.searchmonthoptions[tree_flowering_end-1]
			   
			   const h = this.$createElement
	           // Using HTML string
	           //const titleVNode = h('div', { domProps: { innerHTML:  tree_name } }  )
			   const titleVNode = h('H2', [tree_name] )
	           // More complex structure
	           const messageVNode = h('div', { class: ['foobar'] }, [
	             h('b-card' , {
					 props : {
					 'img-src': tree_image,
					 'img-alt':'Image',
					 'img-top' : true,
					 tag: 'article',
					 style:'max-width: 50rem',
					 class:'mb-3'
					} 
				 }),
				 
				 h('b-card-body'),
	
				 h('b-card-title', [h('H2',['Sci. Name:    ',tree_scientific_name])]),
				 h('b-card-sub-title' , { class: ['mb-3'] }, [h('H4'),['Alias Name:    ',tree_alias]]),
				 h('b-card-text' ,{ class: ['mb-3'] }, [h('H3', [tree_desc])]),
				 h('b-list-group-item' , [h('H4',['Ecologic: ',tree_ecologic])]),
				 h('b-list-group-item' , [h('H4',['Flowering Start Month:    ',tree_flowering_start])]),
				 h('b-list-group-item' , [h('H4',['Flowering End Month:    ',tree_flowering_end])]),
				 h('b-list-group-item' , [h('H4',['Fruit Start Month:    ',tree_fruit_start])]),
				 h('b-list-group-item' , [h('H4',['Fruit End Month:    ',tree_fruit_end])]),
				 h('b-list-group-item' , [h('H4',['Rare in China:    ',rare_China])]),
				 h('b-list-group-item' , [h('H4',['Rare in Hong Kong:    ',rare_HK])]),
				 h('b-list-group-item' , [h('H4',['Subject to Forests and Countryside Oridance:    ',cap_96])]),
				 h('b-list-group-item' , [h('H4',['Subject Protection of Species Ordiance:    ',cap_586])])

				])
	           // We must pass the generated VNodes as arrays
	           this.$bvModal.msgBoxOk([messageVNode], {
	             title: [titleVNode],
	             buttonSize: 'xl',
	             centered: true, size: 'xl'
	           })
			   
			  																	
			   
	         }
	},
	
	computed: {
	    rows() {
	        var rows = []
			var itemsPerRow = 3 // How many b-card per row
	        console.log("rows() function called. New TargetMonthNumber:" + this.targetmonthnumber_list)
			//This is to filter b-card according to preferable month filtered
	        var arr = this.loadeddata
			var filtered_loaddata = []
			for (var i = 0; i<arr.length; i++){
				if (this.targetmonthnumber_list.includes(arr[i].floweringStart)) {
					console.log("tree id:" + arr[i].treeId + "->Flowering Start Month:" + arr[i].floweringStart);
					filtered_loaddata.push(arr[i]);
				}
			}
			
	        for (var i = 0; i<filtered_loaddata.length; i+=itemsPerRow){
	            var row = []
	                for (var z = 0; z<itemsPerRow; z++) {
	                    row.push(filtered_loaddata[i + z])
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

