<template>
	<div class="individualsurveypage">
	<b-container>		
		<b-container>
			<b-row>
				<b-row >
					<b-col cols="12" align-self="left">
						 <h2>Survey Form</h2>
						 <br>
						 <h4>Note: You are in a {{ this.mode_state }} mode. (or Please press 'Create New' button to enter a new survey record.)</h4>
						 <br>
					</b-col>
				</b-row>
				<h4>
				<b-row >
					<b-col cols="2" align-self="left">
						<label>Survey ID: {{ this.survey_id }}</label>
					</b-col>
					<b-col cols="3" align-self="left">
						<label>Survey State: {{ this.survey_state }}</label>
					</b-col>
					<b-col cols="3" align-self="left">
						<label>Created Time: {{ this.last_created_time }}</label>
					</b-col>
					<b-col cols="2" align-self="left">
						<b-button :disabled="this.disablecreatebutton" :pressed="false" variant="primary" @click='alert_create_new()'>Create New</b-button>
					</b-col cols="2" align-self="left">
					<b-col>
						<b-form>
							<b-form-radio-group :disabled="this.survey_state !=='Draft'"
								v-model="mode_as_selected" 
								:options="mode_as_options" 
								:aria-describedby="ariaDescribedby" 
								name="mode_selection_as_radio"
								plain
								@change="mode_change">
							</b-form-group>
						</b-form>
					</b-col>
				</b-row >
				</h4>
		</b-container>
		<h4>
		<b-row class="text-center" class="border border-primary">
			<b-col cols="10" align-self="center">					
					<b-form   @submit.prevent="confirm_alert_box()"  @reset.prevent="confirm_clearall"> 			
					<b-form-group id="input_client_reference_group" label="Your reference code (Max 50 Characters):" label-for="input_client_reference">
						<b-form-input size="lg" id="input_client_reference" v-autowidth="{maxWidth: '960px', minWidth: '900px', comfortZone: 20}" v-model="client_reference" type="text" placeholder="For your internal reference only (optional)" type="text"></b-form-input>
					</b-form-group>
					<br>
					<b-row>
						<b-col cols="8" align-self="left">
							<b-form-group id="input_GPS_location_group" label="GPS Location (Max 100 Characters, Required Field):" label-for="input_GPS_location">
								<b-form-input size="lg" type="text" size="lg"  v-autowidth="{maxWidth: '800px', minWidth: '600px', comfortZone: 20}" id="input_GPS_location" v-model="location" placeholder="Latitude, Longitude i.e. 23,2141254142557 , 114.18230964011866" required> </b-form-input>
							</b-form-group>
						</b-col>
					<!--	<b-col cols="4" align-self="left">
							<b-form-group id="input_GPS_location_latitude_group" label="GPS Location Latitude (Required Field):" label-for="input_GPS_location_latitude">
								<b-form-input size="lg"  type="number" v-autowidth="{maxWidth: '300px', minWidth: '250px', comfortZone: 20}" id="input_GPS_location_latitude" v-model="location_latitude" placeholder="e.g. 22.256344094919317" required> </b-form-input>
							</b-form-group>
						</b-col>	-->						
						<b-col cols="4" align-self="center">
							<b-button :pressed="false" variant="primary" @click='opengooglemap()'>Google Map</b-button>
						</b-col>
					</b-row>	
					<br>
					<b-form-group id="tree_name_group" label="Tree Name:" label-for="tree_name_option_input">
						<select id="tree_name_option_input" v-model="tree_name_option_selected" >
					    	<option v-for="option in selectable_tree_name_options" :value="option.value"> {{option.text }}</option>
					    </select>
					</b-form-group>
					<br>
					<b-form-group id="input_tree_observation_group" label="State your observation about this tree:" label-for="input_tree_observation" description="Body, Colour, Surrounding Environment, Pest, etc.">
						<b-form-input  size="lg" type="text" v-autowidth="{maxWidth: '960px', minWidth: '900px', comfortZone: 20}" id="input_tree_observation" v-model="observation"></b-form-input>
					</b-form-group>
					<br>
					<b-form-group id="input_tree_measurement_group" label="Measurement about the tree (Max 100 Characters):" label-for="input_tree_measurement" description="Height, Width or Radius">
						<b-form-input  size="lg" type="text" v-autowidth="{maxWidth: '960px', minWidth: '900px', comfortZone: 20}" id="input_tree_measurement" v-model="measurement" placeholder="Height:8m, Radius:9m" ></b-form-input>
					</b-form-group>
					<br>
					<b-form-group id="tree_condition_option_id_group" label="Tree Condition:" label-for="tree_condition_option_id">
						<select v-model="tree_condition_option_selected" id = "tree_condition_option_id">
							<option v-for="option in selectable_tree_condition_options" :value="option.value"> {{option.text }}</option>
						</select>
					</b-form-group>
					<br>
					<b-form-group id="input_Score_group" label="Score:" label-for="input_score">
						<label id="input_score" v-model="score" ></label>
					</b-form-group>
					<b-form-group id="moderator_comment_group" label="Moderator Comment:" label-for="input_moderator_comment_id">
						<b-form-input size="lg" type="text" v-autowidth="{maxWidth: '960px', minWidth: '900px', comfortZone: 20}" id="input_moderator_comment_id" v-model="moderatorcomment"></b-form-input>
					</b-form-group>
					<br>
					
					
					<b-row>
						<b-col cols="5" align-self="left"><label>Files</label></b-col>
						<b-col cols="4" align-self="left">Choose Your Files</b-col>
						<b-col cols="3" align-self="left">File Preview</b-col>
					</b-row>
					<br>
					<b-row>
						<b-col cols="5" align-self="left"><label>Image 1 (png only, size <= 500K)</label></b-col>
						<b-col cols="4" align-self="left"><input type="file" ref="image1" v-model="image1_path"></b-col>
						<b-col cols="3" v-if ="survey_id != '' "><b-img thumbnail src="https://firebasestorage.googleapis.com/v0/b/tree-app-c9daf.appspot.com/o/default%2FChinese%20Albizia.jpeg?alt=media&token=4db961fa-0770-4ff4-8e0a-825345816b1c" :alt="image1"></b-col>
					</b-row>
					<br>
					<b-row>
						<b-col cols="5" align-self="left"><label>Image 2 (png only, size <= 500K)</label></b-col>
						<b-col cols="4" align-self="left"><input type="file" ref="image2"  v-model="image2_path"></b-col>
						<b-col cols="3" v-if ="survey_id != '' "><b-img thumbnail  src="https://firebasestorage.googleapis.com/v0/b/tree-app-c9daf.appspot.com/o/default%2FBatavia%20Cinnamon.jpeg?alt=media&token=e5a41f62-845c-4cad-9682-24d0bfb18e31" :alt="image2"></b-col>
					</b-row>
					<br>
					<b-row>
						<b-col cols="5" align-self="left"><label>Image 3 (png only, size <= 500K)</label></b-col>
						<b-col cols="4" align-self="left"><input type="file" ref="image3"  v-model="image3_path"></b-col>
						<b-col cols="3" v-if ="survey_id != '' "><b-img thumbnail  src="https://firebasestorage.googleapis.com/v0/b/tree-app-c9daf.appspot.com/o/default%2FBald%20Cypress.jpeg?alt=media&token=04ae1a0a-5143-47c3-a0ba-d09e3e790094" :alt="image3"></b-col>
					</b-row>
					<br>
					<b-row>
						<b-col cols="5" align-self="left"><label>Image 4 (png only, size <= 500K)</label></b-col>
						<b-col cols="4" align-self="left"><input type="file" ref="image4"  v-model="image4_path"></b-col>
						<b-col cols="3" v-if ="survey_id != '' "><b-img thumbnail  src="https://firebasestorage.googleapis.com/v0/b/tree-app-c9daf.appspot.com/o/default%2FAfrican%20Tulip%20Tree.jpeg?alt=media&token=b0548a37-4f85-4124-b712-85d363c99894" :alt="image4"></b-col>
					</b-row>
					<br>
					<b-row>
						<b-col cols="5" align-self="left"><label>Image 5 (png only, size <= 500K)</label></b-col>
						<b-col cols="4" align-self="left"><input type="file" ref="image5"  v-model="image5_path"></b-col>
						<b-col cols="3" v-if ="survey_id != '' "><b-img thumbnail  src="https://firebasestorage.googleapis.com/v0/b/tree-app-c9daf.appspot.com/o/default%2FKusamaki.jpeg?alt=media&token=58306bb7-d67a-49e8-8368-60ed8e92546f" :alt="image5"></b-col>

					</b-row>
					<br>
					<b-row>
						<b-col cols="5" align-self="left"><label>Video (MP4 only, size <= 50M)</label></b-col>
						<b-col cols="4" align-self="left"><input type="file" ref="video"  v-model="video"></b-col>
						<b-col cols="3" v-if ="survey_id != '' "> <b-button :pressed="false" variant="primary" >Download (uploaded file if any)</b-button></b-col>
					</b-row>
					<br>
					<b-form-group v-if ="mode_as_selected ==='Edit' || mode_state ==='New'" label="Submit as:" v-slot="{ ariaDescribedby }">
						<b-form-radio-group 
							v-model="submit_as_selected" 
							:options="submit_as_options" 
							:aria-describedby="ariaDescribedby" 
							 name="submit_as_radio"
							plain>
						</b-form-radio-group>
					</b-form-group>
					<br>
					<b-row  > 
						<b-col v-if ="mode_as_selected ==='Edit' || mode_state ==='New'" cols="4" align-self="left">
							<b-button   type="submit" variant="primary">Submit</b-button>
						</b-col>
						<b-col v-if ="mode_as_selected ==='Edit' || mode_state ==='New'" cols="4" align-self="left">
							<b-button  type="reset" variant="danger">Clear All</b-button>
						</b-col>
						<b-col cols="4" align-self="left">
						</b-col> 
						
					</b-row>
					<br>
				</b-form>
			</b-col>
		</b-row>	
		</h4>
	</b-container>	
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
	
	data() {
	    return {
			
			location_longitude:'',
			location_latitude:'',
			tree_id:'',
			last_created_time: '',
			survey_state: '',
			updatestatus: '',
			observation: '',
			measurement:'',
			condition:'',
			moderatorcomment:'',
			tree_family_option_selected: '-',
			survey_id:'',
			mode_state:'View',
			client_reference:'',
			creator_name:'',
			location:'',
			tree_data:'',
			selectable_tree_name_id:'',
			score:'',
			image1_path : '',
			image2_path : '',
			image3_path : '',
			image4_path : '',
			image5_path : '',
			video_path: ',',
		    
		        /** selectable_tree_family_options: [
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
			**/
			tree_name_option_selected: '',
			selectable_tree_name_options: [],
			/**	{ text: '-', value: '-' },  
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
				{ text: 'Camels Foot Tree', value: 'Camels Foot Tree' }
				**/
			
			
			tree_condition_option_selected: '-',
			selectable_tree_condition_options: [
				{ text: '-', value: '-' },  
				{ text: 'Excellent', value: 'Excellent' },
				{ text: 'Normal', value: 'Normal' },
				{ text: 'Deteriorate', value: 'Deteriorate'},
				{ text: 'Poor', value:  'Poor' },
				{ text: 'Danger', value: 'Danger' },
			],
			
				
			submit_as_selected: 'Draft',
			submit_as_options: [
			    { value: 'Draft', text: 'Draft' },
			    { value: 'Final', text: 'Final' },
			],
			mode_as_selected: 'View',
			mode_as_options: [
			    { value: 'View', text: 'View' },
			    { value: 'Edit', text: 'Edit' },
			],
        }
	},
	
	
	mounted: function () {
		
		this.mode_state = this.mode_as_selected
		if(typeof(this.$route.params.individual_survey_data.SurveyID) != 'undefined' && this.$route.params.individual_survey_data.SurveyID != null && this.$route.params.individual_survey_data.SurveyID != '') {
		this.survey_id = this.$route.params.individual_survey_data.SurveyID
		this.location_longitude = this.$route.params.individual_survey_data.Longitude
		this.location_latitude = this.$route.params.individual_survey_data.Latitude
		this.location = this.location_latitude + " , " + this.location_longitude
		this.last_created_time = this.$route.params.individual_survey_data.Last_Amended_Time
		this.tree_name_option_selected = this.$route.params.individual_survey_data.Species_Name
		this.survey_state = this.$route.params.individual_survey_data.SurveyState
		this.moderatorcomment = this.$route.params.individual_survey_data.Moderator_Comment
		this.measurement = this.$route.params.individual_survey_data.Measurement
		this.observation = this.$route.params.individual_survey_data.Observation
		this.tree_condition_option_selected = this.$route.params.individual_survey_data.Condition	
		this.client_reference = this.$route.params.individual_survey_data.Client_Reference
		this.score = this.$route.params.individual_survey_data.Score
		this.video_path =  this.$route.params.individual_survey_data.Video
		}
	},
	computed: {
		getNow: function() {
		    const today = new Date();
		    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		    const dateTime = date +' '+ time;
		    return dateTime;	
		},
		mode_change(){
			this.mode_state = this.mode_as_selected;
		}

	},
	methods:{
	
		clearall() {
			
					this.location_longitude= "",
					this.location_latitude= "",
					this.location = "",
					this.tree_id= "",
					this.observation= "",
					this.measurement="",
					this.condition="",
					this.moderatorcomment="",
					this.tree_family_option_selected = "ALL",
					this.tree_species_option_selected = "ALL",
					this.tree_condition_option_selected = "-",
					this.tree_name_option_selected = "-",
					this.mode_as_selected = "Draft",
					this.survey_state = "",
					this.client_reference = "",
					this.last_created_time = "",
					this.score = 0,
					this.survey_id ="",
					this.image1_path = '',
					this.image2_path = '',
					this.image3_path = '',
					this.image4_path = '',
					this.image5_path = ''
	
		},
		submit_survey(new_survey_state){
			//if (survey_id = ''){
			//	survey_id = 0
			//	console.log( 'create new survey in ' +'new survey_state:' + new_survey_state)
			//} else {
			//	console.log('survey id: ' + survey_id + ' new survey_state:' + new_survey_state)
			//}
			

			console.log('location:' + this.location)
	
			let location_array = this.location.split(",")
			this.location_latitude =location_array[0].trim()
			this.location_longitude =location_array[1].trim()

			console.log('longitude:' + this.location_longitude)
			console.log('latitude:' + this.location_latitude)
			console.log('survey_created_time:' + this.getNow)
			console.log('survey_state:' + new_survey_state)
			console.log('tree_name:' + this.tree_name_option_selected)
			console.log('observation:' + this.observation)
			console.log('measurement:' + this.measurement)
			console.log('condition:' + this.condition)
			console.log('moderator_comment:' + this.moderatorcomment)
			
			axios.post('ajaxfile_post_individualsurveyrecord.php', {
				survey_id:this.survey_id,
				location_longitude: this.location_longitude ,
				location_latitude: this.location_latitude,
				survey_created_time: this.getNow,
				survey_state: this.submit_as_selected,
				observation: this.observation,
				measurement: this.measurement,
				condition: this.tree_condition_option_selected,
				moderatorcomment: this.moderatorcomment,
				client_reference: this.client_reference,
				species_name : this.tree_name_option_selected
						
			}).then((response) => {
				this.updatestatus = response.data;
				let feedback_message = ''
				if (this.updatestatus = "Update Successfully!") {
					
					if (this.mode_state = "New") {
	                    feedback_message = "The " + this.submit_as_selected + " version of Survey ID:" + this.survey_id + " has been created Successfullly!\nThank you","success","Success !";
					} else {
						feedback_message = "The " + this.submit_as_selected + " version of Survey ID:" + this.survey_id + " has been submitted Successfullly!\nThank you","success","Success !";	
					}
					this.$swal.fire({
						position: 'center',
						icon: 'success',
						title: feedback_message,
						showCloseButton: true
					})
							
					this.clearall();
					this.mode_state="View";
					console.log('response:' + this.updatestatus);
				} else {
					this.$swal.fire({
						position: 'center',
						icon: 'error',
						title: "The " +  this.submit_as_selected + " version of Survey ID:" + this.survey_id + " has been failed to submitted !\nPlease try again.",
						showCloseButton: true
					})
					console.log('error:' + error);
				}
				console.log('Response:' + response.data);
					   
			}).catch((error) => {
				this.$swal.fire({
					position: 'center',
					icon: 'error',
					title: this.submit_as_selected + " version of survey id: " + this.survey_id + " Submitted Failed:" + error,
					showCloseButton: true
				})
						//this.alert_submitted(this.submit_as_selected + " version of " + survey_id + " Submitted Failure:" + error)
				console.log(this.submit_as_selected + " version of survey id:" + this.survey_id + " Submitted Failed:" + error);
			});
		},
			
		confirm_alert_box() {
			
			//let new_survey_state = this.submit_as_selected;
			//let survey_id = this.survey_id;

			
			let confirm_message = "";
			if (this.submit_as_selected === "Draft") {
				confirm_message = "Confirm to submit this survey (Survey ID: " + this.survey_id + " ) as a DRAFT? You can edit it many times until it is submitted as a final version for moderator approval."
			} else {
				confirm_message = "Confirm to submit this survey (Survey ID: " + this.survey_id + " ) as a FINAL version? After submitting, you are NOT ALLOWED to edit it prior to moderator approval"
			}
				  
			console.log(confirm_message +  " " + this.mode_as_selected + " "  + this.survey_id);
			
		    this.$swal.fire({
		      title: confirm_message,
		      text: "Data Submitted as " + this.submit_as_selected,
		      icon: 'warning',
		      showCancelButton: true,
		      confirmButtonColor: '#3085d6',
		      cancelButtonColor: '#d33',
		      confirmButtonText: 'Yes, please submit it as ' + this.submit_as_selected,
		    }).then((result) => {
		    	 console.log('submit action confirmed by user?:' + result);
		    	if (result.isConfirmed) {
					console.log("good to go for survey id: " + this.survey_id);
					this.submit_survey( this.submit_as_selected );
				} else {
					console.log("user cancelled to submit!");
				}
		    }).catch((e) => {
		        console.log('submit action failed:' + e);
		    });
		},
		
		confirm_clearall() {
			console.log("confirm to clear all?");
		    this.$confirm("All Existing Input will be removed!", 'Clear form', 'Confirm?', 'warning'
			).then((r) => {
				console.log("User Confirm to clear all");
				this.clearall();
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
			 this.$confirm("Confirm to create new one? All unsaved data will be cleared on this form.","Create New Survey Record", 'Confirm?', 'warning'
			).then((r) => {
				console.log("User Confirm to create new one");
				this.clearall();	
                this.mode_state = "New";
                this.survey_id = "";
				this.survey_state = "Draft";
				this.mode_as_selected = "Edit";
			});
			
		},
		opengooglemap(){
			window.open("https://www.google.com.hk/maps/@22.352734,114.1277,11z?hl=zh-TW");
		},
		
		tree_name_download(){
			
			axios.get("https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/trees")
			.then(response => {
				 
				Vue.prototype.$Tree_Data = response.data;	
				
							
			}).catch(error => {
				this.$swal.fire({
					position: 'center',
					icon: error,
					title:'Tree Name Cannot be Downloaded. Pleaser refresh later.',
					showCloseButton: true
				})
				console.error("There was an error in tree name download!", error);
			});			
		},
	},
	created(){
		if(typeof(Vue.prototype.$Tree_Data) === 'undefined' || Vue.prototype.$Tree_Data === null || Vue.prototype.$Tree_Data === '') {
			this.tree_name_download();
		} 
		this.tree_data = Vue.prototype.$Tree_Data
		this.selectable_tree_name_id = []
		this.selectable_tree_name_options = []							
		for(var j = 0; j < this.tree_data.length; j++ ) {
			
			this.selectable_tree_name_options.push({text: this.tree_data[j]['treeNameEn'] , value: this.tree_data[j]['treeNameEn']  })
			console.log("tree name:" + this.selectable_tree_name_options[j]['text'])
		}
		
	
		
	}
}

</script>
<style>
	
	.input-lg {
		 font-size: 25px;
	}
</style>
