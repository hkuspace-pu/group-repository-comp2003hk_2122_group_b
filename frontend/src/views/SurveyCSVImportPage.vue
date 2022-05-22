
<template >
   
   <div id="surveycsvimportpage" >
		<div>  
		<br>
			<b-form-group label="CSV/Tab File(s)" label-cols-sm="2" label-size="lg">
				<b-form-file  v-model="browserfile" :state="Boolean(file)" size="lg" @change="fileinput"></b-form-file>
	        </b-form-group>
	   	<br>
	    </div>
		<div>
			<b-row>
				<b-col lg="4" class="pb-2"><b-button :disabled="this.disablepreviewfile" :pressed="false" :variant="this.filepreviewbutton_variant" @click="allRecords()">Preview File(s)</b-button></b-col>
				<b-col lg="4" class="pb-2"><b-button :disabled="this.disableuploadfile"  :pressed="false" :variant="this.fileuploadbutton_variant"  @click="submitUpdates()">Upload File(s)</b-button></b-col>
				<b-col lg="4" class="pb-2"><b-button :disabled="this.disableclearpreviewtable"  :pressed="false" :variant="this.clearpreviewtableebutton_variant"  @click="clearpreviewtable()">Clear All(s)</b-button></b-col>
			</b-row>
		</div>	
		<br>
				<b-row>
					<b-col lg="4" class="pb-2"><H4 class="mb-3">File Name:</h4><h4 v-if="this.parsed">{{this.file.name}}</h4></b-col>
					<b-col lg="4" class="pb-2"><H4><Label class="fw-bold-mb-3" >{{ file_success_upload }}</Label></H4></b-col>
				</b-row>
				<table v-if="this.parsed" style="width: 100%;">
					<thead>
						<tr>
							<th v-for="(header, key) in content.meta.fields" v-bind:key="'header-'+key">{{ header }}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(row, rowKey) in content.data" v-bind:key="'row-'+rowKey">
							<td v-for="(column, columnKey) in content.meta.fields" v-bind:key="'row-'+rowKey+'-column-'+columnKey">
								<input v-model="content.data[rowKey][column]"/>
							</td>
						</tr>
					</tbody>
				</table>
				<br>
				<br>

	</div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-undef 
import axios from 'axios';
import VueSimpleAlert from 'vue-simple-alert';
import { Vue, Component } from 'vue-property-decorator';
import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { version, description } from 'vue-simple-alert';
import SortedTablePlugin from "vue-sorted-table";
import { SortedTable, SortLink } from "vue-sorted-table";
import Papa from 'papaparse';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default  { 
	    name: "App",
		props:['data'],

        data: function () {
            return {
				//surveycases:this.surveycases,
				surveycases:[],
				Survey_Case_No: 0,
				Creator_Name: '',
				Created_Time:'',
				Created_Venue: '',
                Species_Name: '',
                Survey_Status: '',
                Administrator_Comment: '',
                Survey_Case_No_To: 0,
                Survey_Case_No_From: 0,
				mode:'',
				bulkselectsurveycase:[],
				file: '',
				disablepreviewfile: true,
				filepreviewbutton_variant : "",
				disableuploadfile: true,
				fileuploadbutton_variant : "",
				content: [],
				parsed: false,
				browserfile : '',
				disableclearpreviewtable : true, 
				clearpreviewtableebutton_variant : "",
				file_success_upload : "",
				importerrorlist:[]
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

		
		},
		methods: {
			
			fileinput(event) {
				if (event.target.files.length > 0) {
					this.disablepreviewfile = false;
					this.filepreviewbutton_variant = "success";
					this.browserfile = event.target.files[0];
					console.log("new choose file name:" + this.browserfile.name );
					//console.log("current parsed:" + this.parsed );
				} else {
					console.log("current file number:" + event.target.files.length );
					this.disablepreviewfile = true;
					this.filepreviewbutton_variant = "";
					this.browserfile = null;
					//console.log("current parsed:" + this.parsed );
				}
			},
			
			parseFile(){
				Papa.parse( this.file, {
				    header: true,
				    skipEmptyLines: true,
				    complete: function( results ){
				        this.content = results;
						this.disableuploadfile = false;
						this.fileuploadbutton_variant = "success";
						this.disableclearpreviewtable = false;
						this.clearpreviewtableebutton_variant = "success";
						this.parsed = true;
				    }.bind(this)
				} );
			},
		
			allRecords: function(){
				this.disableuploadfile =  true;
				this.fileuploadbutton_variant =  "";
				this.parsed = false;
				if (this.browserfile != null) {
					this.file = this.browserfile;
					this.file_success_upload = "Press [Upload Files(s)] to upload";
					this.parseFile();
				}
			},	
			
			submitUpdates(){  
				this.$swal.fire({
				  title: 'Please confirm!',
				  text: "All records on the file, as new entries, will be uploaded to the system!",
				  icon: 'warning',
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Yes, please upload it!'
				}).then((result) => {
					if (result.isConfirmed) {
						console.log('content data:' + this.content.data + "total length:" + this.content.data.length);
						this.importerrorlist = [];
						var resultmessage = '';
						var input_survey_id  = '';
						
						var input_location_longitude = '';
						var input_location_latitude = '';
						var input_survey_created_time = '';
						var input_survey_state = '';
						var input_observation = '';
						var input_measurement= '';
						var input_condition = '';
						var input_client_reference= '';
						var input_species_name= '';
						
						for(var j = 0; j < this.content.data.length; j++ ) {
						    console.log('content data - survey id:' + this.content.data[j].SurveyID);
							console.log('content data - longitude:' + this.content.data[j].Longitude);
							console.log('content data - latitude:' + this.content.data[j]['Latitude']);
							console.log('content data - observation:' + this.content.data[j].Observation);
							console.log('content data - measurement:' + this.content.data[j].Measurement);
							console.log('content data - condition:' + this.content.data[j].Condition);
							console.log('content data - client reference:' + this.content.data[j].Client_Reference);
							console.log('content data - name:' + this.content.data[j].Species_Name);
							input_survey_id = this.content.data[j].SurveyID
							input_location_longitude = this.content.data[j].Longitude
							input_location_latitude =  this.content.data[j]['Latitude']
							input_survey_created_time =  this.getNow
							input_survey_state ='Draft'
							input_observation =  this.content.data[j].Observation
							input_measurement =  this.content.data[j].Measurement
							input_condition =  this.content.data[j].Condition
							input_client_reference =  this.content.data[j].Client_Reference
							input_species_name = this.content.data[j].Species_Name
						
							axios.post('ajaxfile_post_individualsurveyrecord.php', {
								survey_id: '',
								
								location_longitude: input_location_longitude,
								location_latitude: input_location_latitude,
								survey_created_time: this.getNow,
								survey_state: 'Draft',
								observation: this.content.data[j].Observation,
								measurement: this.content.data[j].Measurement,
								condition: this.content.data[j].Condition,
								client_reference: input_client_reference,
								species_name : this.content.data[j].Species_Name
						
							}).then((response) => {
					  	     
					  	
					  	//alert_BulkExportFromExcel_Result(this.file.name)
					  	//this.$swal.fire({
					  	 // position: 'center',
					  	 // icon: 'success',
					  	//  title: this.file.name + " has been uploaded sucessfully!",
					  	 // showCloseButton: true
					  	  
					  //	})  
								this.importerrorlist.push({'Row No' : j + 1, 'Input_client_reference' : input_client_reference , 'Upload Result' : 'Updated Success'  }) 
								
								//console.log('Survey ID: ' + this.content.data[j].SurveyID + ' is loaded Successful!!');
								//console.log('Response:' + response.data);
							}).catch((error) => {
								//console.log('Survey ID: ' + this.content.data[j].SurveyID + ' is loaded FAILED!!');
								console.log('Error: ' + error);
								this.importerrorlist.push({'Row No' : j + 1, 'Input_client_reference' : input_client_reference , 'Upload Result' : error  }) 
					  	//this.file_success_upload = "Upload Failure! Please try again later";
					  	//this.$swal.fire({
					  	//  icon: 'error',
					  	//  title: 'Upload Failure',
					  	//  text: this.file.name + " has not been uploaded!",
					  	//  footer: 'Please ensure the Internet is on or contact web administrator for further assistance.'
							})
						}
						this.file_success_upload = "File:"  + this.file.name  + " is Uploaded";
						console.log('result message length :' + this.importerrorlist.length);
						for(var r = 0; r < this.importerrorlist.length; r++ ) {
							resultmessage = resultmessage +  this.importerrorlist[r] +  ",  "
						}
						this.$swal.fire({
							title: "File: " + this.file.name + " is uploaded." + resultmessage,
							position: 'center',
							icon: 'information',
							showCloseButton: true,
						})	  
					}
				})
			},	
		
			clearpreviewtable(){
				this.$swal.fire({
				  title: 'Could you please confirm?',
				  text: "All data will be cleared in this page!",
				  icon: 'warning',
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Yes, please clear everything!'
				}).then((result) => {
				  if (result.isConfirmed) {
					  this.disableuploadfile = true;
					  this.fileuploadbutton_variant = "";
					  this.disableclearpreviewtable = true;
					  this.disablepreviewfile = true;
					  this.clearpreviewtableebutton_variant = "";
					  this.filepreviewbutton_variant = "",
					  this.file_success_upload = "";
					  this.parsed = false;
					  this.file = '';
					  this.browserfile = '';
				  }
				})
				
			},

        },

		created: function(){
        },

}
                                           
</script>




