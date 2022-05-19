
<template >
   <div id="surveyrecordlist" >

		<br>
		<center>
		<b-row>
			<b-col lg="4" sm="1">
				<b-button :pressed="false" variant="success" pill @click='allRecords();'>
					<h5>Download All Survey</h5>
				</b-button>
			</b-col>
			<b-col lg="4" sm="1">			
				<b-button :class="advance_filter_visible ? null : 'collapsed'" :aria-expanded="advance_filter_visible ? 'true' : 'false'" aria-controls="advancefilter_page" @click="advance_filter_visible = !advance_filter_visible" img src="../assets/icons8-search-64.png" pill variant="info" :pressed="false" >
					<h5>Advance Survey Record Filter</h5>
				</b-button>
			</b-col>
			<b-col lg="4" sm="1">
				<vue-excel-xlsx :buttondisable="this.vueexcelxlsx" :data="this.bulkselectsurveycase" :columns="this.survey_columns_in_bulk_excel" :file-name="'survey'" :file-type="'csv'" pill :sheet-name="'survey'">
					<h5>Export Selected Survey Record(s) in CSV</h5>
				</vue-excel-xlsx>
			</b-col>
		</b-row>
		</center>
		<div>
			<b-collapse width='95%' id="advancefilter_page" v-model="advance_filter_visible" class="mt-2">
				<b-card>
					<p class="card-text"><h2>Advanced Survey Record Filter</h2></p>
					<h5>
					<b-list-group flush>
				    <b-list-group-item>
					<div>
						<b-form-group class="tree_name_string my-1" v-slot="{ ariaDescribedby }">
						<b-row>
						    <b-col sm="4">
						      <label for="tree_name_string_input">Any sort of tree name contains a subset of string (blank to ignore):</label>
						    </b-col>
						    <b-col sm="6">
						      <b-form-input v-model="tree_name_string_input" size="lg" placeholder="input 'amb' when tree name(s) contains 'amb' (i.e. Carambola)"></b-form-input>
						    </b-col>
						</b-row>
						</b-form-group>
					</div>	
					<br>
					<div>
						<b-form-group class="survey_id my-1" v-slot="{ ariaDescribedby }">
						<b-row>
						    <b-col sm="3">
						        <label for="survey_id_start_input">Survey ID From:</label>
						    </b-col>
						    <b-col sm="2">
						        <b-form-input v-model="survey_id_start_input" type="number"></b-form-input>
						    </b-col>
							<b-col sm="1">
								<center>
									<label for="survey_id_end_label_input"> to </label>
								</center>
							</b-col>
							<b-col sm="2">
							    <b-form-input v-model="survey_id_end_input" type="number"></b-form-input>
							</b-col>
						</b-row>
						</b-form-group>
					</div>
					<br>
					<div>
						<b-form-group class="created_time my-1" v-slot="{ ariaDescribedby }">
						<b-row>
							<b-col sm="3">
								<label for="created_date_from_input">Survey Record Created Date from: </label>
						    </b-col>
						    <b-col sm="3">
						        <b-form-input v-model="created_date_from_input" type="date"></b-form-input>
						    </b-col>
							<b-col sm="1">
								<center>
									<label for="created_date_to_input"> to </label>
								</center>
							</b-col>
							<b-col sm="3">
							    <b-form-input v-model="created_date_to_input" type="date"></b-form-input>
							</b-col>
						</b-row>
						</b-form-group>
					</div>
					<br>
					<div>
						<b-form-group class="last_amended_date my-1" v-slot="{ ariaDescribedby }">
						<b-row>
						    <b-col sm="3">
						        <label for="last_amended_date_from_input">Survey Record Last Amendment Date from: </label>
						    </b-col>
						    <b-col sm="3">
						        <b-form-input v-model="last_amended_date_from_input" type="date"></b-form-input>
						    </b-col>
							<b-col sm="1">
								<center>
									<label for="last_amended_date_to_input"> to: </label>
								</center>
							</b-col>
							<b-col sm="3">
							    <b-form-input v-model="last_amended_date_to_input" type="date"></b-form-input>
							</b-col>
						</b-row>
						</b-form-group>
					</div>
					<br>
					<div>
						<b-form-group label="Tree Condition ( Uncheck all boxes to ignore )" v-slot="{ ariaDescribedby }">
							<b-form-checkbox-group
								:options="Tree_Condition_Checked_Box_Group_Options"
								v-model="Tree_Condition_Checked_Box_Selected"
								:aria-describedby="ariaDescribedby"
								value-field="tree_condition_text"
								text-field="tree_condition_value"
								name="Tree_Condition_Checked_Box_Group"
								plain>
							</b-form-checkbox-group>
						</b-form-group>
					</div>
					<br>
					<div>
						<b-form-group label="Survey Status ( Uncheck all boxes to ignore )" v-slot="{ ariaDescribedby }">
							<b-form-checkbox-group
								:options="Survey_Status_Checked_Box_Group_Options"
								v-model="Survey_Status_Checked_Box_Selected"
								:aria-describedby="ariaDescribedby"
								value-field="survey_status_text"
								text-field="survey_status_value"
								name="Survey_Status_Checked_Box_Group"
								plain>
							</b-form-checkbox-group>
						</b-form-group>
					</div>
					<br>
					</b-list-group-item>
					<b-list-group-item>
					</h5>
					<br>
					<h2>Filter Summary</h2>
					<h5>
					<div class="treenamekeyword mt-3">A general/scientific/alias tree name contains:* <strong>{{ tree_name_string_input }} </strong>*</div>
					<div class="surveyidrange mt-3">Survey ID From: <strong>{{ survey_id_start_input }} to {{ survey_id_end_input }}</strong></div>
					<div class="survey_record_created_date_from mt-3">Survey Record Created Date from:   <strong>{{ created_date_from_input }}  to  {{ created_date_to_input }}</strong> </div>
					<div class="last_amended_date_from_input mt-3">Survey Record Last Amended Date from:   <strong>{{ last_amended_date_from_input }}  to  {{ last_amended_date_to_input }}</strong></div>
					<div class="tree_condition mt-3">Tree Condition: <strong>{{ Tree_Condition_Checked_Box_Selected }}</strong></div>
					<div class="survey_status mt-3">Survey Status: <strong>{{ Survey_Status_Checked_Box_Selected }}</strong></div>
					</h5>
					<br>
					</b-list-group-item>
					</b-list-group>
					<br>
					<b-button pill variant="info"><h5>Confirm</h5></b-button>
				</b-card>
			</b-collapse>
		</div>
		<br><br>
		<!--
		<sorted-table :values="values">
		<thead>
		<tr>
			<th scope="col" style="text-align: left; width: 10rem;"><sort-link name="Selected">Select</sort-link></th>
			<th scope="col" style="text-align: left; width: 10rem;"><sort-link name="Survey_Case_No">Survey ID</sort-link></th>
			<th scope="col" style="text-align: left; width: 10rem;"><sort-link name="Creator_Name">Creator Name</sort-link></th>
			<th scope="col" style="text-align: left; width: 10rem;"><sort-link name="Created_Time">Created Time</sort-link></th>
			<th scope="col" style="text-align: left; width: 10rem;"><sort-link name="Created_Venue">Created Venue</sort-link></th>
			<th scope="col" style="text-align: left; width: 10rem;"><sort-link name="Species_Name">Species Name</sort-link></th>
			<th scope="col" style="text-align: left; width: 10rem;"><sort-link name="Survey_Status">Survey Status</sort-link></th>
			<th scope="col" style="text-align: left; width: 10rem;"><sort-link name="Administrator_Comment">Administrator Comment</sort-link></th>
			<th colspan = 3>Action</th>
		</tr>
		</thead>
		<template #body="sort">
		<tbody >
		<tr v-for="value in sort.values" :key="value.Survey_Case_No">
			        <td><input type="checkbox" :id="value.Survey_Case_No" :value="value.Survey_Case_No" v-model="bulkselectsurveycase" @change="check($event)"   :checked="value.Selected"></td>
		            <td>{{ value.Survey_Case_No }}</td>
		            <td>{{ value.Creator_Name }}</td>
		            <td>{{ value.Created_Time }}</td>
					<td>{{ value.Created_Venue }}</td>
					<td>{{ value.Species_Name }}</td>
					<td>{{ value.Survey_Status }}</td>
					<td>{{ value.Administrator_Comment }}</td>
					<td><input type='button' value='Delete' @click='deleteRecord(index,value.Survey_Case_No);'></td>
					<td><input type='button' value='View' @click='showDetail("View",value.Survey_Case_No);'></td>
					<td><input type='button' value='Edit' @click='showDetail("Edit",value.Survey_Case_No);'></td>	
		          </tr>
		</tbody>
	   </template>
	    </sorted-table>	
		-->
		<div>
			<b-container >
				<b-row  >
					<b-col cols="12" align-self="center">
					<H6>
					<div>
						Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
						<b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
						<b>,         You selected {{  this.bulkselectsurveycase.length }} of {{  this.values.length }} record(s)</b>
				    </div>
					<!--@row-selected="onRowSelected" -->
					<b-table selectable :fields="fields"   @row-clicked="myRowClickHandler" :select-mode="multi"  responsive="sm"   hover sticky-header="550px"  head-variant="light" :items="new_sorted_table"  :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @sort-changed="sortChanged">

						<template #head(id)="scope" > <div class="text-nowrap">Survey ID</div> </template>
						<template #head()="scope">
							<div class="text-nowrap"> {{ scope.label }} </div>
							<template #cell(selected)="{ rowSelected }" >
								<template v-if="rowSelected">
									<span aria-hidden="true">&check;</span>
									<span class="sr-only">Yes</span>
								</template>
								<template v-else>
									<span aria-hidden="true">&nbsp;</span>
									<span class="sr-only">No</span>
								</template>
                         
							</template>

						</template>
				
						<template v-slot:cell(actions)="data">
							<b-container style="{ width: '160px'}">
								<b-row>
									<b-col style="{ width: '70px'}"   align-self="center">
										<b-button  @click="showDetail('View',data.item)" class="mr-1" variant="warning">View</b-button>
									</b-col>	
									<b-col style="{ width: '70px'}"  align-self="center">
										<b-button  @click="showDetail('Edit',data.item)" class="mr-1" variant="warning">Edit</b-button>
									</b-col>	
								</b-row>
							</b-container>
						</template>
						
					</b-table>
				</H6>
				</b-col>
			</b-row  >
		</b-container >	
		</div>
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
import VueExcelXlsx from "vue-excel-xlsx";
Vue.use(VueExcelXlsx);

export default  { 
	name: "App",
	props:['data'],
    data () {
        return {
			//surveycases:this.surveycases,
			//fields:[{key:'Survey_Case_No',stickyColumn: true,isRowHeader: true ,variant: 'primary', sortable: true}, {key:'selected', sortable: true},{key:'Creator_Name', sortable: true},{key:'Created_Time', sortable: true},{key:'Created_Venue', sortable: true},{key:'Species_Name', sortable: true},{key:'Survey_Status', sortable: true},{key:'Moderator_Comment', sortable: true},{key:'Latitude', sortable: true},{key:'Longitude', sortable: true},{key:'Measurement', sortable: true},{key:'Observation', sortable: true},{key:'Condition', sortable: true}],
			 
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
			values: [],
			selectedsurveydata:[],
			advance_filter_visible: false,
			tree_name_string_input:"",
			survey_id_start_input:"",
			survey_id_end_input:"",
			last_amended_date_from_input:"",
			last_amended_date_to_input:"",
			created_date_to_input:"",
			created_date_from_input:"",
			vueexcelxlsx: true,
			 sortBy: 'Survey_Case_No',
			 Client_Reference:"",
			 Score:"",
			sortDesc: false,
            fields:[
				    {key:'Survey_Case_No',stickyColumn: true,isRowHeader: true ,variant: 'primary', sortable: true, label: "Survey ID",field: "Survey_Case_No", output_excel: true}, 
			        {key:'selected', sortable: true, output_excel: false},
					{key:'Creator_Name', sortable: true,label: "Creator Name",field: "Creator_Name", output_excel: true},
					{key:'Created_Time', sortable: true,label: "Created Time",field: "Created_Time", output_excel: true},
					{key:'Created_Venue', sortable: true,label: "Created Venue",field: "Created_Venue", output_excel: true},
					{key:'Species_Name', sortable: true,label: "Species Name",field: "Species_Name", output_excel: true},
					{key:'Survey_Status', sortable: true,label: "Survey Status",field: "Survey_Status", output_excel: true},
					{key:'Moderator_Comment', sortable: true,label: "Moderator Comment",field: "Moderator_Comment", output_excel: true},
					{key:'Latitude', sortable: true,label: "Latitude",field: "Latitude", output_excel: true},
					{key:'Longitude', sortable: true,label: "Longitude",field: "Longitude", output_excel: true},
					{key:'Measurement', sortable: true,label: "Measurment",field: "Measurment", output_excel: true},
					{key:'Observation', sortable: true,label: "Observation",field: "Observation", output_excel: true},
					{key:'Condition', sortable: true,label: "Condition",field: "Condition", output_excel: true},
					{key:'Score', sortable: true,label: "Score",field: "Score", output_excel: true},
					{key:'Client_Reference', sortable: true,label: "Client_Reference",field: "Client_Reference", output_excel: true},
					{key:'actions',label: "Action", output_excel: false}
			],
            
			Tree_Condition_Checked_Box_Selected: [],
			Tree_Condition_Checked_Box_Group_Options: [
			    { tree_condition_value: 'Bad', tree_condition_text:  'Bad' },
				{ tree_condition_value: 'Poor', tree_condition_text:  'Poor' },
				{ tree_condition_value: 'Normal', tree_condition_text:  'Normal' },
				{ tree_condition_value: 'Good', tree_condition_text:  'Good' },
				{ tree_condition_value: 'Excellent', tree_condition_text:  'Excellent' },
			],
			Survey_Status_Checked_Box_Selected: [],
			Survey_Status_Checked_Box_Group_Options: [
			    { survey_status_value: 'Draft', survey_status_text:  'Draft' },
				{ survey_status_value: 'Submitted', survey_status_text:  'Submitted' },
				{ survey_status_value: 'Pending Approval', survey_status_text:  'Pending Approval' },
				{ survey_status_value: 'Approved', survey_status_text:  'Approved' },
				{ survey_status_value: 'Published', survey_status_text:  'Published' },
			],
		}                                            
	},
    computed: {
    	new_sorted_table: function() {
    	   
    	    return this.values;	
    	},
		survey_columns_in_bulk_excel: function() {
    	    var survey_columns = [];
    	  	
			for(var j = 0; j < this.fields.length; j++ ) {
				if (this.fields[j].output_excel){
					survey_columns.push({'label': this.fields[j].key, 'field': this.fields[j].key})
				}
			}
			  return survey_columns;
    	},
    
    },
	methods: {
		priceFormat(value){
			return '$ ' + value;
		},
				
		/**allRecords: function(){
			axios.get('ajaxfile_get_surveyrecords.php').then((response) => {
					//this.surveycases = response.data;
					this.values = [];
					for (const eachsurvey of response.data) {
					  eachsurvey["Selected"] = false;
					  eachsurvey["Survey_Case_No"] = Number(eachsurvey["Survey_Case_No"]) ;
					 
					}
					this.bulkselectsurveycase =[];
					this.values=    response.data;
					this.json_data = response.data;
					console.log(this.values); 
				}).catch((error) => {
					console.log('error on all Records:' + error);
				});	
			},
        **/
		
		allRecords: function(){
			axios.get('ajaxfile_get_surveyrecords.php').then((response) => {
					//this.surveycases = response.data;
					this.values = [];
					
					 for(var j = 0; j < response.data.length; j++ ) {
					  response.data[j]["Survey_Case_No"] = Number(response.data[j]["Survey_Case_No"]) ;
					  response.data[j]["selected"] = false ;
					}
					this.bulkselectsurveycase =[];
					this.values=    response.data;
					this.json_data = response.data;
					console.log(this.values); 
				}).catch((error) => {
					console.log('error on all Records:' + error);
				});	
			},
				
				
			Filter_By_Survey_Case_No: function(){
						
                console.log('Survey_Case_No_To:' + this.Survey_Case_No_To); 
                console.log('Survey_Case_No_From:' + this.Survey_Case_No_From); 
						
				if(this.Survey_Case_No_From >= 0 && this.Survey_Case_No_To >= this.Survey_Case_No_From) {
					axios.get('ajaxfile_get_surveyrecords.php', {
						params: {
							Survey_Case_No_From: this.Survey_Case_No_From ,
                            Survey_Case_No_To: this.Survey_Case_No_To
						}
					}).then((response) => {
						//this.surveycases = response.data;
						this.values = [];
						this.bulkselectsurveycase = [];
						for (const eachsurvey of response.data) {
						  eachsurvey["Selected"] = false;
						  eachsurvey["Survey_Case_No"] = Number(eachsurvey["Survey_Case_No"]) ;
						}
						this.values=    response.data;
					}).catch((error) => {
						console.log(error);
					});
				}
			},
			
			deleteRecord: function(index,Survey_Case_No){
				axios.post('ajaxfile_delete_surveyrecords.php', {
					 Survey_Case_No: Survey_Case_No
				}).then((response) => {
					//this.surveycases.splice(index, 1);
					this.values.splice(index, 1);
					alert(response.data);
				}).catch((error) => {
					console.log('error:' + error);
				});
						  
			},
					
			showDetail(mode, Survey_Case_Data){
					//this.$router.push('/individualsurveypage'); 
				console.log('Survey_Case_Data:' + Survey_Case_Data);
				this.$router.push({name:'IndividualSurveyPage', params: {mode_state : mode, individual_survey_data : Survey_Case_Data}});
			}  ,  
			
			BulkExportToExcel(bulkselectsurveycase,excel_file_path) {
				this.alert_BulkExportToExcel_created(excel_file_path) 
			},
			BulkImportFromExcel(bulkselectsurveycase,excel_file_path) {
				this.alert_BulkImportFromExcel_created(excel_file_path) 
			},
			alert_BulkExportToExcel_created(excel_file_path) {
				this.$alert("SurveyIDExport.csv is saved at " + excel_file_path ,"success","Success Created!"
				).then(() => {
						//console.log("Closed");
				});
			},
			alert_BulkImportFromExcel_created(excel_file_path) {
				this.$alert("SurveyIDImport.csv is uploaded.Please check.","success","Success Imported!"
				).then(() => {
						//console.log("Closed");
				});
			},
	  
			prompt_BulkExportToExcel_Path(bulkselectsurveycase) {
				this.$prompt(
					bulkselectsurveycase.join(),
					"C:/desktop/download/SurveyIDExport.csv",
					"Input a path of the excel file to save the below Survey ID",
					"question",
					{ input: "text" }
				)
				.then((response) => {
				    this.BulkExportToExcel(bulkselectsurveycase,response ) ;
				})
				.catch((e) => console.log("canceled" + e));
			},
			
			prompt_BulkImportFromExcel_Path(){
				this.$prompt(
					"",
					"C:/desktop/upload/SurveyIDImport.csv",
					"Input a location of the excel file to upload your survey information",
					"question",
					{ input: "text" }
				)
				.then((response) => {
				    this.BulkImportFromExcel(response) ;
				})
				.catch((e) => console.log("canceled" + e));
			},
			
			/**check(e) {  
			      //console.log(e.target.id);  
				  for (const eachsurvey of this.values) {
				    if (eachsurvey["Survey_Case_No"] === Number(e.target.id)) {
						eachsurvey["Selected"] = e.target.checked;
						console.log(e.target.id + " " + eachsurvey["Selected"]);  
						break;
					}
				  }
				  this.vueexcelxlsx = true;
				  this.selectedsurveydata = [];
				  for (const eachsurvey of this.values) {
				    if (eachsurvey["Selected"] === true) {
						this.selectedsurveydata.push(eachsurvey)
						this.vueexcelxlsx = false;
					}
				  }				    
			},
			**/
			
			myRowClickHandler(record, index) {
				this.bulkselectsurveycase = [];
				for(var j = 0; j < this.values.length; j++ ) {
					if (record["Survey_Case_No"] === this.values[j]["Survey_Case_No"]) {
						this.values[j]["selected"] = !this.values[j]["selected"];
					}
					if (this.values[j]["selected"]) {
						this.bulkselectsurveycase.push(this.values[j])
					}
				}
				if (this.bulkselectsurveycase.length > 0 ) {
					for(var j = 0; j < this.bulkselectsurveycase.length; j++ ) {
						console.log('last bulkinsert case no:' + this.bulkselectsurveycase[j]["Survey_Case_No"]); 									 
					} 
					this.vueexcelxlsx = false
				} 
				
			},
			onRowSelected(items) {
			
				
				this.vueexcelxlsx = false;
				if (items.length > 0) { 
					
				
				//for(var j = 0; j < this.values.length; j++ ) {
				//	console.log('this values case on row selected:' + this.values[j]["Survey_Case_No"] + " selected:" + this.values[j]["selected"]); 
				//	}
					this.bulkselectsurveycase = [];
					console.log('on row selected:');
					for(var j = 0; j < this.values.length; j++ ) {
					
						console.log('this values case no:' + this.values[j]["Survey_Case_No"]); 
						for (const each_selected_survey of items) {
							console.log('this selected items case no:' + each_selected_survey["Survey_Case_No"]); 
							if (each_selected_survey["Survey_Case_No"] === this.values[j]["Survey_Case_No"]) {
								console.log('this values case no before assign true:' + this.values[j]["selected"]); 
								this.values[j]["selected"] = !this.values[j]["selected"];
								console.log('this values case no after assign true:' + this.values[j]["selected"]); 
								this.sortChanged;
								break;
							}
						}
						if (this.values[j]["selected"]) {
							this.bulkselectsurveycase.push(this.values[j])
						}
					}	
				}
					
			},
			sortChanged(e) {
				console.log('on sortchange:');
			}
			
								
        },

		created: function(){
			this.values = [];
        },

}
                                           
</script>
<style>
	input[type=text]{
	width: 100%;
    }
	.form-control-borderless {
	    border: none;
	}
	
	.form-control-borderless:hover, .form-control-borderless:active, .form-control-borderless:focus {
	    border: none;
	    outline: none;
	    box-shadow: none;
	}
	.input-lg {
		 font-size: 25px;
	}
</style>

export default 
