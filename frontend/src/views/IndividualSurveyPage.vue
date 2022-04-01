<template>
  <div class="individualsurveypage" :style="myStyle">
	<h1><label>Survey ID: {{ this.survey_id }}</label></h1>  
	<h1><label>Mode: {{ this.mode_state }}<label></h1>	
	<input type='button' value='Create New Record' @click='alert_create_new()'>
	<br />
	<br />
	<label>Your reference code</label><input v-model="client_reference" placeholder="any code you like (optional)" type="String"/>
	<br />
	<br />
	<label>Please specific tree longitude and latitude using google map</label><input type='button' value='Open Google Map' @click='opengooglemap()'>
	<br />
	<br />
	<label>Tree Location Longitude:</label><input v-model="location_longitude" placeholder="e.g. 22.256344094919317" type="String"/>
	<br />
	<br />
	<label>Tree Location Latitude:</label><input v-model="location_latitude" placeholder="e.g. 114.18230964011866" type="String" />
	<br />
	<br />
	<label>Survey Created Time:</label><label v-if ="mode_state ==='Edit'"><datetime type="datetime" v-model="datetime"></datetime></label><label v-else ="mode_state ==='View'">{{this.survey_created_time}}</label>
	<br />
	<br />
	<label>Survey State (For Moderator Only):</label>
	<span v-if ="mode_state ==='View'">
		<label>{{ this.survey_state }}</label>
	</span>
	<span v-else >
		<select v-model="survey_state_option_selected" id = survey_state_option_id > 
			<option v-for="option in selectable_survey_state_options" :value="option.value"> {{ option.text }}</option>
		</select>
	</span>	
	<br />
	<br />
	<label>You may filter Tree Family -> Tree Species to narrow down the list of selectable Tree Name</label>
	<br >
	<br />
	<label for="tree_family_option_id">Tree Family : </label>
	<select v-model="tree_family_option_selected" id = tree_family_option_id > 
		<option v-for="option in selectable_tree_family_options" :value="option.value"> {{ option.text }}</option>
	</select>
	<label for="tree_species_option_id">Tree Genus : </label>
	<select v-model="tree_species_option_selected" id = tree_species_option_id> 
		<option v-for="option in selectable_tree_species_options" :value="option.value"> {{ option.text }}</option>
	</select>
	<br >
	<br />
	<label for="tree_name_option_id">Tree Name : </label>
	<select v-model="tree_name_option_selected" id = tree_name_option_id>
		<option v-for="option in selectable_tree_name_options" :value="option.value"> {{option.text }}</option>
	</select>
	<br />
	<br />	
	<label>Tree Observation:</label><input type="text" v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 20}" v-model="treeobservation" placeholder="There are many birds living on this tree" />
	<br />
	<br />
	<label>Tree Measurement:</label><input v-model="measurement" placeholder="Tall:15m Width:8m" type="String" />
	<br />
	<br />
	<label for="tree_condition_option_id">Tree Condition: </label>	
		<select v-model="tree_condition_option_selected" id = tree_condition_option_id>
			<option v-for="option in selectable_tree_condition_options" :value="option.value"> {{option.text }}</option>
		</select>
	<br />
	<br />
	<label>Moderator Comment</label><input v-model="moderatorcomment" placeholder="Expert is Reviewing" type="String" />
	<br />
	<br />
	<table border='1' width='70%' style="border-collapse: collapse;border:1px solid black;margin-left:auto;margin-right:auto">
	<tr style="height:30px">
		<td width="25%"><label>Image 1 (png only, size <= 500K)</label></td>
		<td v-if ="mode_state ==='Edit' || mode_state ==='New' || mode_state ==='' " width="45%" style="text-align:left"><input type="file" ref="image1"  > </td>
		<td v-else-if ="mode_state ==='View'"><img src="../assets/image_files/1/1.png" :alt="image1"></td>
	</tr>
	<tr style="height:30px">
		<td width="25%"><label>Image 2 (png only, size <= 500K)</label></td>
		<td v-if ="mode_state ==='Edit' || mode_state ==='New' || mode_state ==='' " width="45%" style="text-align:left"><input type="file" ref="image2"  > </td>
		<td v-else-if ="mode_state ==='View'"><img src="../assets/image_files/1/2.png" :alt="image2"></td>
	</tr>
	<tr style="height:30px">
		<td width="25%"><label>Image 3 (png only, size <= 500K)</label></td>
		<td v-if ="mode_state ==='Edit' || mode_state ==='New' || mode_state ==='' " width="45%" style="text-align:left"><input type="file" ref="image3"  > </td>
		<td v-else-if ="mode_state ==='View'"><img src="../assets/image_files/1/3.png" :alt="image3"></td>
	</tr>
	<tr style="height:30px">
		<td width="25%"><label>Image 4 (png only, size <= 500K)</label></td>
		<td v-if ="mode_state ==='Edit' || mode_state ==='New' || mode_state ==='' " width="45%" style="text-align:left"><input type="file" ref="image4"  > </td>
		<td v-else-if ="mode_state ==='View'"><img src="../assets/image_files/1/4.png" :alt="image4"></td>
	</tr>
	<tr style="height:30px">
		<td width="25%"><label>Image 5 (png only, size <= 500K)</label></td>
		<td v-if ="mode_state ==='Edit' || mode_state ==='New' || mode_state ==='' " width="45%" style="text-align:left"><input type="file" ref="image5"  > </td>
		<td v-else-if ="mode_state ==='View'"><img src="../assets/image_files/2/5.png" :alt="image5"></td>
	</tr>
	<tr style="height:30px">
		<td width="25%"><label>Video (avi only, size <= 50M)</label></td>
		<td v-if ="mode_state ==='Edit' || mode_state ==='New' || mode_state ==='' " width="45%" style="text-align:left"><input type="file" ref="video"  > </td>
		<td v-else-if ="mode_state ==='View'"><a href="url">http://student.plymouth.ac.uk/timmok/treevideo.avi</a></td>
		</tr>
	</table >
	<br />
	<br />
		<h1 id="action_buttons" v-if ="mode_state ==='Edit' || mode_state ==='New' ">
			<input type='button' value='Clear All' @click='clearall()'>
			<br />
			<br />
			<input type='button' value='Save as Draft' @click='confirm_alert_box("Confirm to save your draft? You can edit it many times until it is submitted as a final version for moderator approval.","Draft",survey_id)'>
			<br />
			<br />
			<input type='button' value='Submit as Final' @click='confirm_alert_box("Confirm to submit it as a final version? After submitting, you are not allowed to edit it prior to moderator approval","Submitted", survey_id)'>
		</h1>  
	</div>
</template> 
	
<script>
import axios from 'axios';
import VueSimpleAlert from 'vue-simple-alert';
import { Vue, Component } from 'vue-property-decorator';
import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { version, description } from 'vue-simple-alert/package.json';
import VueInputAutowidth from 'vue-input-autowidth'
Vue.use(VueInputAutowidth)
export default {
    el: '#action_buttons',
	props: {
		//mode_state: String,
		//survey_id: String,
		survey_created_time: String,
	},
	inject: ['message'],
	created() {
	    console.log("message: " + this.message); // injected value
	},
	data() {
	    return {
			treesurveydata:this.treesurveydata,
			location_longitude:'',
			location_latitude:'',
			tree_id:'',
			survey_created_time: '',
			survey_state: '',
			updatestatus: '',
			observation: '',
			measurement:'',
			condition:'',
			moderatorcomment:'',
			tree_family_option_selected: 'Sapotaceae',
			survey_id:'',
			mode_state:'',
			selectable_tree_family_options: [
		  		{ text: 'All', value: 'All' },
				{ text: 'Aceraceae', value: 'Aceraceae' },
				{ text: 'Caesalpiniaceae', value: 'Caesalpiniaceae' },
				{ text: 'Elaeocarpaceae', value: 'Elaeocarpaceae' },
				{ text: 'Ericaceae', value: 'Ericaceae' },
				{ text: 'Euphorbiaceae', value: 'Euphorbiaceae' },
				{ text: 'Lauraceae', value: 'Lauraceae' },
				{ text: 'Moraceae', value: 'Moraceae' },
				{ text: 'Myrsinaceae', value: 'Myrsinaceae' },
				{ text: 'Rosaceae', value: 'Rosaceae' },
				{ text: 'Sapotaceae', value: 'Sapotaceae' },
				{ text: 'Ulmaceae', value: 'Ulmaceae' }
			],

			tree_species_option_selected: 'Elaeocarpus',
			selectable_tree_species_options: [
				{ text: 'All', value: 'All' },  
				{ text: 'Acer', value: 'Acer' },
				{ text: 'Ardisia', value: 'Ardisia' },
				{ text: 'Bauhinia', value: 'Bauhinia' },
				{ text: 'Celtis', value: 'Celtis' },
				{ text: 'Elaeocarpus', value: 'Elaeocarpus' },
				{ text: 'Eriobotrya', value: 'Eriobotrya' },
				{ text: 'Ficus', value: 'Ficus' },
				{ text: 'Litsea', value: 'Litsea' },
				{ text: 'Mallotus', value: 'Mallotus' },
				{ text: 'Manilkara', value: 'Manilkara' },
				{ text: 'Neolitsea', value: 'Neolitsea' },
				{ text: 'Persea', value: 'Persea' },
				{ text: 'Rhododendron', value: 'Rhododendron' },
				{ text: 'Sarcosperma', value: 'Sarcosperma' }
			],
			
			tree_name_option_selected: 'Big-leaved Fign',
			selectable_tree_name_options: [
				{ text: 'All', value: 'All' },  
				{ text: 'Big-leaved Fig', value: 'Big-leaved Fign' },
				{ text: 'Sapodilla', value: 'Sapodilla' },
				{ text: 'Oblong-leaved Mallotus', value: 'Oblong-leaved Mallotus' },
				{ text: 'Wild Loquat', value: 'Wild Loquat' },
				{ text: 'Hainan Elaeocarpus', value: 'Hainan Elaeocarpus' },
				{ text: 'Fragrant Litsea', value: 'Fragrant Litsea' },
				{ text: 'Hance_s Ardisia', value: 'Hance_s Ardisia' },
				{ text: 'Avocado', value: 'Avocado' },
				{ text: 'Hong Kong Neolitsea', value: 'Hong Kong Neolitsea' },
				{ text: 'India-rubber tree', value: 'India-rubber tree' },
				{ text: 'Chinese Hackberry', value: 'Chinese Hackberry' },
				{ text: 'Fleshy Nut Tree', value: 'Fleshy Nut Tree' },
				{ text: 'Long-leaved Maple', value: 'Long-leaved Maple' },
				{ text: 'Rhododendron', value: 'Rhododendron' },
				{ text: 'Camels Foot Tree', value: 'Camels Foot Tree' },
			],
			
			tree_condition_option_selected: '-',
			selectable_tree_condition_options: [
				{ text: '-', value: '-' },  
				{ text: 'Excellent', value: 'Excellent' },
				{ text: 'Normal', value: 'Normal' },
				{ text: 'Deteriorate', value: 'Deteriorate' },
				{ text: 'Poor', value: 'Poor' },
				{ text: 'Danger', value: 'Danger' },
			],
			
			survey_state_option_selected: '-',
			selectable_survey_state_options: [
				{ text: '-', values: '-'},
				{ text: 'Draft', values: 'Draft'},
				{ text: 'Submitted', values: 'Submitted'},
				{ text: 'Pending Approval', values: 'Pending Approval'},
				{ text: 'Approved', values: 'Approved'},
				{ text: 'Rejected', values: 'Rejected'},
				{ text: 'Published', values: 'Published'},
			],	
			myStyle:{
				backgroundColor:"rgb(225, 228, 184)" 
			},
        }
	},
	
	
	mounted: function () {
		this.mode_state = this.$route.params.mode_state
		this.survey_id = this.$route.params.survey_id
		this.survey_created_time = this.getNow;
	},
	computed: {
		getNow: function() {
		    const today = new Date();
		    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		    const dateTime = date +' '+ time;
		    return dateTime;	
		},

	},
	methods:{
	
		clearall() {
			this.location_longitude= "",
			this.location_latitude= "",
			this.tree_id= "",
			this.observation= "",
			this.measurement="",
			this.condition="",
			this.moderatorcomment="",
			this.tree_family_option_selected = "ALL",
			this.tree_species_option_selected = "ALL",
			this.tree_condition_option_selected = "-",
			this.tree_name_option_selected = "-",
			this.survey_state_selected = "-",
			this.survey_state = "",
			this.client_reference = ""
		},
		submit(survey_id,new_survey_state){
			console.log('survey id: ' + survey_id +' new survey_state:' + new_survey_state)
			console.log('longitude:' + this.location_longitude)
			console.log('latitude:' + this.location_latitude)
			console.log('survey_created_time:' + this.survey_created_time)
			console.log('survey_state:' + new_survey_state)
			console.log('tree_id:' + this.tree_id)
			console.log('observation:' + this.observation)
			console.log('measurement:' + this.measurement)
			console.log('condition:' + this.condition)
			console.log('moderator_comment:' + this.moderatorcomment)
			axios.post('ajaxfile_post_individualsurveyrecord.php', {			
				survey_id:survey_id,
				location_longitude: this.location_longitude ,
				location_latitude: this.location_latitude,
				survey_created_time: this.survey_created_time,
				survey_state: new_survey_state,
				tree_id: this.tree_id,
				observation: this.observation,
				measurement: this.measurement,
				condition: this.condition,
				moderatorcomment: this.moderatorcomment					    
			}).then((response) => {
				this.updatestatus = response.data;
				if (this.updatestatus = "Update Successfully!") {

					if (this.mode_state = "New") {
						this.alert_submitted("The " + new_survey_state + " version of Survey ID:" + survey_id + " has been created Successfullly!\nThanks you","success","Success !");
					} else {
						this.alert_submitted("The " + new_survey_state + " version of Survey ID:" + survey_id + " has been submitted Successfullly!\nThanks you","success","Success !");	
					}
					
					//this.clearall();
					this.mode_state="View";
					console.log('response:' + this.updatestatus);
				} else {
					this.alert_submitted("The " + new_survey_state + " version of Survey ID:" + survey_id + " has been failed to submitted !\nPlease try again","error","Error !");
					console.log('error:' + error);
				}
				console.log('Response:' + response.data);
			}).catch((error) => {
				this.alert_submitted(new_survey_state + " version of " + survey_id + " Submitted Failure:" + error)
				console.log(new_survey_state + " version of " + survey_id + " Submitted Failure:" + error);
			});

		},

	 
		confirm_alert_box(confirm_message, new_survey_state, survey_id) {
			console.log(confirm_message +  " " + new_survey_state + " "  + survey_id);
		    this.$confirm(confirm_message, 'Confirm?', 'warning'
			).then((r) => {
				console.log("good to go!");
				this.submit(survey_id, new_survey_state );
		    }).catch(() => {
		        console.log('User cancel to submit');
		    });
		},
		
		confirm_clearall() {
			console.log("confirm to clear all?");
		    this.$confirm("All Input will be removed!", 'Confirm?', 'warning'
			).then((r) => {
				console.log("User Confirm to clear all");
				clearall();
		    }).catch(() => {
		        console.log('User cancel to submit');
		    });
		},
		
		alert_submitted(message,alert_icon,alert_word) {
			this.$alert( message,alert_word,alert_icon
			).then(() => {
					//console.log("Closed");
			});
			
		},
		alert_create_new() {
			this.$alert( "Confirm to create new one? All unsaved data will be cleared on this form.","Create New Survey Record",'warning'
			).then((r) => {
				console.log("User Confirm to create new one");
				this.clearall();	
                this.mode_state = "New";
                this.survey_id = "";
				this.survey_state = "Draft"
			});
			
		},
		opengooglemap(){
			window.open("https://www.google.com.hk/maps/@22.352734,114.1277,11z?hl=zh-TW");
		},
		
		
		//revised_mode_state: function(){
			
		//	return "Edit";
		//}
	}	
}

</script>

