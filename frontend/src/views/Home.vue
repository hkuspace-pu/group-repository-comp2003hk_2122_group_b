<template>
	<div class="home">
        <table border='0' width='100%' style='border-collapse: collapse;'>
			<tr>
				<td style= "vertical-align: bottom;"><H3>Tree Of The Month</H3></td>
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
								<H5>{{slide.treeNameEn}}</H5>
							</tr>
							<tr>
								<H6>Flowering: {{periodRange(slide.flowering)}}</H6>
							</tr>
							</td>
							<td style= "vertical-align: bottom;">
								<b-button :pressed="false" pill variant="primary" @click="ShowTreeDetails(slide.treeId,slide.treeNameEn,slide.alias,slide.scientificName,slide.ecologic,slide.flowering,slide.fruit,slide.cnRare,slide.hkRare,slide.cap96,slide.cap586,slide.treeImage,slide.treeDescEn,slide.treeNameCn,slide.treeDescCn)"><H5>Details</H5></b-button>
							</td>
					    </tr>
						</table>
					</figcaption>
			      </figure>
				</slide>
			  </carousel-3d>
			</div>
		</b-container>
		 <div class="line-1"></div>
		<div>
			<b-container>
				 <div class="mt-4">
				    <h3>Recent News</h3>
				    <b-card class="img-responsive img-thumbnail"  img-src="https://firebasestorage.googleapis.com/v0/b/tree-app-c9daf.appspot.com/o/default%2FWhite%20Azalea.jpeg?alt=media&token=9f84a4d0-7382-4d27-9eae-1b315d810022" img-alt="Card image" img-right class="mb-3">
				      
						<b-card-text class = "justify-content-center" >
							<h4>2022 May 01</h4>
							<H6> 
							<ul>
								Zentangle in Nature ‧ Online Workshop (Group Application)
								<li><a href="https://www.kfbg.org/en/events/zentangle-in-nature-online-workshop-group-application">Click Here</a></li>
							</ul>
							</H6>
							<h4>2022 Apr 22</h4>
							<H6> 
							<ul>
								Certificate in Green Finance Essentials: Registration Open Now! (Click here to learn HOW to REGISTER)
								<li><a href="https://foe.org.hk/FileUpload/Editor/ECE%20Course/Certificate%20Flyer_Apr%202022.pdf">Click Here</a></li>
							</ul>
							</H6>
							<h4>2022 April 15</h4>
							<H6> 
							<ul>
								Green Earth Companion Scheme
								<li><a href="https://greenearth.org.hk/en/greenearthcompanion/">Click Here</a></li>
							</ul>
							</H6> 
							<h4>2022 February 20</h4>
							<H6> 
							<ul>
								Webinars on Tree Care before Wet Season 
								<li><a href="https://www.greening.gov.hk/filemanager/greening/en/content_48/Webinars-on-Tree-Care-before-Wet-Season2022.pdf">Click Here</a></li>
							</ul>
							</H6> 
				      </b-card-text>
				    </b-card>
				</div>				
			<b-container>
		</div>
		<div class="line-1"></div>
		<b-container>
			 <div class="mt-4">
			    <h3>Prized Q & A</h3>
			    <b-card class="img-responsive img-thumbnail"  img-src="https://firebasestorage.googleapis.com/v0/b/tree-app-c9daf.appspot.com/o/default%2FChinese%20Albizia.jpeg?alt=media&token=4db961fa-0770-4ff4-8e0a-825345816b1c" img-alt="Card image" img-right class="mb-3">
			       <h5>
					<b-card-text class = "justify-content-center" >
						<b-form-group label="What is the family of Albizia chinensis?" v-slot="{ ariaDescribedby }">
							<b-form-radio-group 
								v-model="Q1_Radio_Button_selected" 
								:options="Q1_Radio_Button_options" 
								:aria-describedby="ariaDescribedby" 
								 name="Q1_Radio"
								plain>
							</b-form-radio-group>
						
						</b-form-group>
						<br>
						<b-form-group label="Which of the below seasons that a fruit of Brisbane Box normally grows" v-slot="{ ariaDescribedby }">
							<b-form-radio-group 
								v-model="Q2_Radio_Button_selected" 
								:options="Q2_Radio_Button_options" 
								:aria-describedby="ariaDescribedby" 
								 name="Q2_Radio"
								plain>
							</b-form-radio-group>
							
						</b-form-group>
						<br>
						<b-form-group label="Which category that Camptotheca is under in our country?" v-slot="{ ariaDescribedby }">
							<b-form-radio-group 
								v-model="Q3_Radio_Button_selected" 
								:options="Q3_Radio_Button_options" 
								:aria-describedby="ariaDescribedby" 
								name="Q3_Radio"
								plain>
							</b-form-radio-group>
							
						</b-form-group>
						<br>
						<b-button :pressed="false" variant="primary" @click='submit_answer()'>Submit</b-button>
			      </b-card-text>
				  </h5>
			    </b-card>
			<b-container>
			<div class="line-1"></div>
			
			
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
			slides : this.sliderows,
			Q1_Radio_Button_selected : 'Mimosaceae',
			Q1_Radio_Button_options :  [
			    { value: 'Mimosaceae', text: 'Mimosaceae' },
			    { value: 'Araucariaceae', text: 'Araucariaceae' },
			    { value: 'Cupressaceae', text: 'Cupressaceae' },
				{ value: 'Betulaceae', text: 'Betulaceae' }
			],
			Q2_Radio_Button_selected : 'Spring',
			Q2_Radio_Button_options : [
			    { value: 'Spring', text: 'Spring' },
			    { value: 'Summer', text: 'Summer' },
			    { value: 'Autumn', text: 'Autumn' },
				{ value: 'Winter', text: 'Winter' }
			],
			Q3_Radio_Button_selected : 'Category I',
			Q3_Radio_Button_options : [
			    { value: 'Category I', text: 'Category I' },
			    { value: 'Category II', text: 'Category II' },
			    { value: 'Category III', text: 'Category III' },
				{ value: 'Category IV', text: 'Category IV' }
			],

			
			
			
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
					if (ListofTreeInfo[j].treeNameEn === tree_name_array[k] || ListofTreeInfo[j].scientificName === tree_name_array[k] || ListofTreeInfo[j].treeAlias === tree_name_array[k]) {
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
		
		ShowTreeDetails(tree_id,tree_name,tree_alias,tree_scientific_name,tree_ecologic,tree_flowering,tree_fruit,rare_China,rare_HK,cap_96,cap_586,tree_image,tree_desc,tree_name_cn,tree_desc_cn) {
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
				
				h('b-card-title', [h('H2',['Scientific. Name :    ',tree_scientific_name])]),
				h('b-card-sub-title' , { class: ['mb-3'] }, [h('H4'),['Alias Name :    ',tree_alias]]),
				h('b-card-text' ,{ class: ['mb-3'] }, [h('H3', 'English Description'  )]),
				h('b-card-text' ,{ class: ['mb-3'] }, [h('H3', [tree_desc]   )]),
				h('b-card-text' ,{ class: ['mb-3'] }, [h('H3', 'Chinese Description'  )]),
				h('b-card-text' ,{ class: ['mb-3'] }, [h('H3', [tree_desc_cn])]),
				h('b-list-group-item',  [h('H4',['Chinese Name :    ',tree_name_cn])]),
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
							console.log("+++" + arr[i].treeNameEn + "+++")
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
		    return ListOfTreeName
		},
		
		submit_answer() {
			 this.$confirm("Confirm to submit your answer?", "Submit Prized Q & A", 'Confirm?', 'warning'
			).then((r) => {
				console.log("User Confirm to submit qa answer");
			    this.$swal.fire({
			    	position: 'center',
			    	icon: 'Info',
			    	title:'Your answer is submitted for Question ',
			    	showCloseButton: true
			    })
			});
			
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
.card-img-right {
    width: 40%;
    height: 20vw;
    object-fit: cover;
}
</style>

