<template>
	<div class="home">
        <table border='0' width='100%' style='border-collapse: collapse;'>
			<tr>
				<td style= "vertical-align: bottom;"><H5>Tree Of The Month</H5></td>
				<td>
					<H5>
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
								<button type="button" class="btn btn-lg btn-success"  @click="select_individual_tree_name(SearchTreeNameModel)"><H5>Search</H5></button>	
							</div>
						</div>
					</form>
					</H5>
				</td>
			</tr>
	   </table>	
		<H5><v-select multiple  :value="selected" :options="searchmonthoptions" @input="setSelected"  placeholder="Choose a Month ..."/></H5>
		<b-container>
			<div id="example">
			  <carousel-3d :controls-visible="true" :clickable="false" :width="620" :height="500" :count="sliderows.length" :autoplay= "true" :loop="true"
			               :controls-prev-html="'&#10092; '" :controls-next-html="'&#10093;'" :controls-width="30" :controls-height="60">
			    <slide v-for="(slide,  i) in sliderows" :key="i" :index="i">
			      <figure>
			        <img :src="slide.treeImage">
					 <figcaption >
					  <table border='0' width='100%' style='border-collapse: collapse; '>
						<tr>
							<td style= "vertical-align: bottom;  top:40px">
							<tr>
								<H5>{{slide.treeName}}</H5>
							</tr>
							<tr>
								<H6>Flowering: {{periodRange(slide.flowering)}}</H6>
							</tr>
							</td>
							<td style= "vertical-align: bottom;">
								<b-button :pressed="false" pill variant="primary" @click="ShowTreeDetails(slide.treeId,slide.treeName,slide.alias,slide.scientificName,slide.ecologic,slide.flowering,slide.fruit,slide.cnRare,slide.hkRare,slide.cap96,slide.cap586,slide.treeImage,slide.treeDesc)"><H5>Details</H5></b-button>
							</td>
					    </tr>
						</table>
					</figcaption>
			      </figure>
				</slide>
			  </carousel-3d>
			</div>
		</b-container>
		<!--
		<b-container fluid="sm">
		<div class = "slidepart">
			<b-carousel
				class ="slidetree"
				id="carousel"
				v-model="slide"
				:interval="4000"
				controls
				indicators
				background="#ababab"
				img-width="256"
				img-height="120"
				style="text-shadow: 1px 1px 2px #333;"
				@sliding-start="onSlideStart"
				@sliding-end="onSlideEnd">
				 <b-carousel-slide  class="slideshow" v-for="(item,key,index) in sliderows" img-width="256" img-height="120" v-bind:key="index" :img-src="item.treeImage" :caption = "item.treeName"></b-carousel-slide>
			</b-carousel>
			</div>
			</b-container>
		<b-container class="bv-example-row">
			<b-row v-for="row in rows">
				<b-col v-for="objitem in row" >
					<div v-for="(item, key, index) in objitem" v-bind:key="objitem.treeId">
						<div v-if="key === 'treeName'">
							<b-card :img-src="objitem.treeImage" img-alt="Image" img-top tag="article" style="max-width: 120rem;" class="mb-3">
								<b-card-title>{{objitem.treeName}}</b-card-title> 
								<b-card-sub-title class="mb-3">{{objitem.scientificName}}</b-card-sub-title>
								<b-card-text>Alias : {{objitem.alias}}</b-card-text>
								<b-button @click="ShowTreeDetails(objitem.treeId)">Details</b-button> 
								<b-button :pressed="false" pill variant="primary" @click="ShowTreeDetails(objitem.treeId,objitem.treeName,objitem.alias,objitem.scientificName,objitem.ecologic,objitem.flowering,objitem.fruit,objitem.cnRare,objitem.hkRare,objitem.cap96,objitem.cap586,objitem.treeImage,objitem.treeDesc)">Details</b-button> 		
								<b-card-footer>Reference ID : {{objitem.treeId}}</b-card-footer> 
							</b-card>
						</div>
					</div>
				</b-col>
				<br> 
			</b-row>
		</b-container>
		-->

	</div>
</template>

<script>

import axios from 'axios';
import Vue from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { Carousel3d, Slide } from 'vue-carousel-3d';
  
	Vue.use(Carousel3d);
Vue.component('v-select', VueSelect.VueSelect)
export default {
	
	props:['data'],
	components: {
	            vSelect,

	    Carousel3d,
	    Slide
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
			yes_no_convert: ['No', 'Yes', '-'],
			Tree_Name  : "",
			Tree_Alias : "",
			Tree_Reference_ID : "",
			slide : 0,
			sliding: null,
			slides : this.sliderows
			
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
		
		//onSlideStart(slide) {
		//        this.sliding = true
		//},
		
		//onSlideEnd(slide) {
		//        this.sliding = false
		//},
		
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
		
		ShowTreeDetails(tree_id,tree_name,tree_alias,tree_scientific_name,tree_ecologic,tree_flowering,tree_fruit,rare_China,rare_HK,cap_96,cap_586,tree_image,tree_desc) {
			var tree_fruit_period = this.periodRange(tree_fruit);
			var tree_flowering_period = this.periodRange(tree_flowering);
			var rare_China_yesno = this.yes_no_convert[rare_China];
			var rare_HK_yesno = this.yes_no_convert[rare_HK];
			var cap_96_yesno = this.yes_no_convert[cap_96];
			var cap_586_yesno = this.yes_no_convert[cap_586]   ;
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
				h('b-card-title', [h('H2',['Sci. Name :    ',tree_scientific_name])]),
				h('b-card-sub-title' , { class: ['mb-3'] }, [h('H4'),['Alias Name :    ',tree_alias]]),
				h('b-card-text' ,{ class: ['mb-3'] }, [h('H3', [tree_desc])]),
				h('b-list-group-item' , [h('H4',['Ecologic : ',tree_ecologic])]),
				h('b-list-group-item' , [h('H4',['Flowering Period :    ',tree_flowering_period])]),
				h('b-list-group-item' , [h('H4',['Fruiting Period :    ',tree_fruit_period])]),
				h('b-list-group-item' , [h('H4',['Rare in China :    ',rare_China_yesno])]),
				h('b-list-group-item' , [h('H4',['Rare in Hong Kong :    ',rare_HK_yesno])]),
				h('b-list-group-item' , [h('H4',['Subject to Forests and Countryside Oridance :    ',cap_96_yesno])]),
				h('b-list-group-item' , [h('H4',['Subject Protection of Species Ordiance :    ',cap_586_yesno])])
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
	   /** rows() {
	        var rows = []
			var itemsPerRow = 3 // How many b-card per row
	        console.log("rows() function called. New TargetMonthNumber:" + this.targetmonthnumber_list)
			//This is to filter b-card according to preferable month filtered
	        var arr = this.loadeddata
			var filtered_loaddata = []
			var floweringperiod = ''
			for (var i = 0; i<arr.length; i++){
				floweringperiod = arr[i].flowering
				for (var j = 0; j<floweringperiod.length; j++){
					if (floweringperiod.charAt(j) === "1" ) {
						if (this.targetmonthnumber_list.includes(j+1)) {
							filtered_loaddata.push(arr[i]);
							break;
						}
					}	
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
		**/
		sliderows(){
			var arr = this.loadeddata
			var sliderows = []
			var floweringperiod = ''
			for (var i = 0; i<arr.length; i++){
				floweringperiod = arr[i].flowering
				for (var j = 0; j<floweringperiod.length; j++){
					if (floweringperiod.charAt(j) === "1" ) {
						if (this.targetmonthnumber_list.includes(j+1)) {
							console.log("+++" + arr[i].treeName + "+++")
							sliderows.push(arr[i]);
							break;
						}
					}	
				}
			}
			return sliderows
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
.carousel-3d-container figure {
  margin:0;
}

.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  bottom: 0;
  position: absolute;
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}
</style>

