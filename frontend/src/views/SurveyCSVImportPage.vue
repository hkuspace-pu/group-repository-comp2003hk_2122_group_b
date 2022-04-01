
<template >
   
   <div id="surveycsvimportpage" >
		<div>  
		<br>
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
			}                                            
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
				console.log("new choose file name[file]:" + this.file.name );
				
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
					this.file_success_upload = "Upload Pending";
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
					  axios.post( '/', this.content.data
					  ).then((response) => {
					  	//console.log(this.browserfile.name + ' upload SUCCESS!!');
					  	this.file_success_upload = "Upload Successful";
					  	//alert_BulkExportFromExcel_Result(this.file.name)
					  	this.$swal.fire({
					  	  position: 'center',
					  	  icon: 'success',
					  	  title: this.file.name + " has been uploaded sucessfully!",
					  	  showCloseButton: true
					  	  
					  	})
					  	
					  }).catch((error) => {
					  	//console.log(this.browserfile.name + ' load FAILURE!!');
					  	this.file_success_upload = "Upload Failure! Please try again later";
					  	this.$swal.fire({
					  	  icon: 'error',
					  	  title: 'Upload Failure',
					  	  text: this.file.name + " has not been uploaded!",
					  	  footer: 'Please ensure the Internet is on or contact web administrator for further assistance.'
					  	})
					  });
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




