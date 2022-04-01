
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
				<vue-excel-xlsx :buttondisable="this.vueexcelxlsx" :data="this.selectedsurveydata" :columns="this.surveycolumns" :file-name="'survey'" :file-type="'csv'" pill :sheet-name="'survey'">
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
		</tr><!-- Details/Delete -->
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
			surveycolumns : [
				{
					label: "Survey ID",
				    field: "Survey_Case_No",
				},
				{
				    label: "Creator Name",
				    field: "Creator_Name",  
				},
				{
				    label: "Created Time",
				    field: "Created_Time",
				},
				{
				    label: "Species Name",
				    field: "Species_Name",
				},
				{
				    label: "Survey Status",
				    field: "Survey_Status",
				},
				{
				    label: "Administrator Comment",
				    field: "Administrator_Comment",
				},														
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

	methods: {
		priceFormat(value){
			return '$ ' + value;
		},
						
		allRecords: function(){
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
					
			showDetail(mode, Survey_Case_No){
					//this.$router.push('/individualsurveypage'); 
				console.log('Survey_Case_No:' + Survey_Case_No);
				this.$router.push({name:'IndividualSurveyPage', params: {mode_state : mode, survey_id : Survey_Case_No}});
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
			
			check(e) {  
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
								
        },

		created: function(){
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
</style>

export default 
