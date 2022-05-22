
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
						<b-form-group class="Last_Amended_Time my-1" v-slot="{ ariaDescribedby }">
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
								:options="SurveyState_Checked_Box_Group_Options"
								v-model="SurveyState_Checked_Box_Selected"
								:aria-describedby="ariaDescribedby"
								value-field="SurveyState_text"
								text-field="SurveyState_value"
								name="SurveyState_Checked_Box_Group"
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
					<div class="SurveyState mt-3">Survey Status: <strong>{{ SurveyState_Checked_Box_Selected }}</strong></div>
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
				
						<template v-slot:cell(actions)="data" align-self="center">
							<b-container  align-self="center">
								<b-row>
									<b-col style="{ width: '70px'}"   align-self="center">
										<b-button  @click="showDetail('View',data.item)" class="mr-1" variant="warning">View</b-button>
									</b-col>		
								</b-row>
							</b-container>
						</template>
						<template v-slot:cell(actions2)="data" align-self="center">
							<b-container  align-self="center">
								<b-row>
									<b-col v-if="data.item.SurveyState==='Draft'" style="{ width: '70px'}"   align-self="center">
										<b-button  @click="deleteRecord(data.item, data.index)" class="mr-1" variant="warning">Delete</b-button>
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
	
			surveycases:[],
			SurveyID: 0,
			Creator_Name: '',
			Last_Amended_Time:'',
			Created_Venue: '',
            Species_Name: '',
            SurveyState: '',
            Administrator_Comment: '',
            SurveyID_To: 0,
            SurveyID_From: 0,
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
			 sortBy: 'SurveyID',
			 Client_Reference:"",
			 Score:"",
			sortDesc: false,
			selectable_tree_name_id:{},
			tree_data:'',
			Condition:'',
            fields:[
				    {key:'SurveyID',stickyColumn: true,isRowHeader: true ,variant: 'primary', sortable: true, label: "Survey ID",field: "SurveyID", output_excel: true}, 
			        {key:'selected', sortable: true, output_excel: false},
					{key:'Last_Amended_Time', sortable: true,label: "Last Amended Time",field: "Last_Amended_Time", output_excel: true},
					{key:'Species_Name', sortable: true,label: "Tree Name",field: "Tree Name", output_excel: true},
					{key:'Moderator_Comment', sortable: true,label: "Moderator Comment",field: "Moderator_Comment", output_excel: true},
					{key:'Latitude', sortable: true,label: "Latitude",field: "Latitude", output_excel: true},
					{key:'Longitude', sortable: true,label: "Longitude",field: "Longitude", output_excel: true},
					{key:'Measurement', sortable: true,label: "Measurment",field: "Measurment", output_excel: true},
					{key:'Observation', sortable: true,label: "Observation",field: "Observation", output_excel: true},
					{key:'Condition', sortable: true,label: "Condition",field: "Condition", output_excel: true},
					{key:'Video', sortable: true,label: "Video",field: "Video", output_excel: true},
					{key:'Score', sortable: true,label: "Score",field: "Score", output_excel: true},
					{key:'Client_Reference', sortable: true,label: "Client_Reference",field: "Client_Reference", output_excel: true},
					{key:'SurveyState', sortable: true,label: "Survey State",field: "Survey State", output_excel: true},
					{key:'actions',label: "Actions", field: "actions", sortable: true, output_excel: false},
					{key:'actions2',label: "Action 2", field: "actions2", sortable: true, output_excel: false}
					
			],
            
			selectable_tree_condition_options: [
				{ text: '-', value: '-' },  
				{ text: 'Excellent', value: 1 },
				{ text: 'Normal', value: 2 },
				{ text: 'Deteriorate', value: 3},
				{ text: 'Poor',value: 4 },
				{ text: 'Danger', value: 5 },
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

		
		allRecords: function(){
			axios.get('ajaxfile_get_surveyrecords.php').then((response) => {
					//this.surveycases = response.data
					console.log("response data: "+ response.data.toString());
					for(var j = 0; j < response.data.length; j++ ) {
					    //console.log('Tree Individual deatails:' +ListofTreeInfo[j].treeId)
						//console.log('tree name en:' + this.tree_data[j]['treeNameEn']);
						//console.log('tree id:' + this.tree_data[j]['treeId']);
						//let tree_id_pair[tree_id] = '';
						response.data[j]["selected"] = false
					
						//this.selectable_tree_name_id[this.tree_data[j]['treeNameEn']] =  this.tree_data[j]['treeId']
					}
					this.bulkselectsurveycase =[];
					this.values=    response.data;
;		 
				}).catch((error) => {
					console.log('error on all Records:' + error);
				});	
			},
				
				
			Filter_By_SurveyID: function(){
						
                console.log('SurveyID_To:' + this.SurveyID_To); 
                console.log('SurveyID_From:' + this.SurveyID_From); 
						
				if(this.SurveyID_From >= 0 && this.SurveyID_To >= this.SurveyID_From) {
					axios.get('ajaxfile_get_surveyrecords.php', {
						params: {
							SurveyID_From: this.SurveyID_From ,
                            SurveyID_To: this.SurveyID_To
						}
					}).then((response) => {
						//this.surveycases = response.data;
						this.values = [];
						this.bulkselectsurveycase = [];
						for (const eachsurvey of response.data) {
						  eachsurvey["Selected"] = false;
						  eachsurvey["SurveyID"] = Number(eachsurvey["SurveyID"]) ;
						}
						this.values=    response.data;
					}).catch((error) => {
						console.log(error);
					});
				}
			},
			
			deleteRecord: function(Survey_Case, index){
				var survey_info = 'Survey Case No: ' +  Survey_Case.SurveyID + ',\n'
								+ 'Client_Reference: ' +  Survey_Case.Client_Reference + ",\n" 
				                + 'Last Amended Time: ' +  Survey_Case.Last_Amended_Time + ",\n" 
								+ 'Tree Name: ' +  Survey_Case.Species_Name + ",\n"  
								+ 'Survey State: ' +  Survey_Case.SurveyState + ",\n" 
								+ 'Latitude: ' +  Survey_Case.Latitude + ",\n" 
								+ 'Latitude: ' +  Survey_Case.Longitude + ",\n" 
								+ 'Measurement: ' +  Survey_Case.Measurement + ",\n"  
								+ 'Observation: ' +  Survey_Case.Observation + ",\n" 
								+ 'Condition: ' +  Survey_Case.Condition + ",\n" 
								+ 'Index: ' +  index + ",\n";
										
				console.log("Confirm to delete?" + survey_info);
				this.$swal.fire({
				  title: 'Could you please confirm to delete this Survey Record ID :' +  Survey_Case.SurveyID + ' ?',
				  text: "Surevey Record to be Deleted: " + survey_info,
				  icon: 'warning',
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Yes, please delete this survey record' ,
				}).then((result) => {
					if (result.isConfirmed) {
						console.log("User Confirm to delete survey:" + Survey_Case);
						axios.post('ajaxfile_delete_surveyrecords.php', {
							SurveyID: Survey_Case.SurveyID
						}).then((response) => {
							//this.surveycases.splice(index, 1);
							this.$swal.fire({
								position: 'center',
								icon: 'success',
								title:'This survey has been successfully deleted!',
								showCloseButton: true
							})
							this.values.splice(index, 1);
						
						}).catch((error) => {
							console.log('Cancel failed:' + error + ". Please try again.");
						});
					} else {
						console.log('User cancel to submit');
					}
				}).catch((e) => {
				    console.log('Deletion get an error:' + e);
				});
				
				
						  
			},
					
			showDetail(mode, Survey_Case_Data){
					//this.$router.push('/individualsurveypage'); 
				//console.log('Survey_Case_Data:' + Survey_Case_Data);
				//if (Survey_Case_Data.length > 0 ) {
				//	for(var j = 0; j < this.Survey_Case_Data.length; j++ ) {
				//		console.log('last bulkinsert case no:' + this.bulkselectsurveycase[j]["SurveyID"]); 									 
				//	} 
				//	this.vueexcelxlsx = false
				//} 
				console.log('Survey_Case_Data:' + Survey_Case_Data);
			
				console.log('Survey_Case_Data: SurveyID->' + Survey_Case_Data.SurveyID)
				console.log('Survey_Case_Data: Longitude->' + Survey_Case_Data.Longitude)
				console.log('Survey_Case_Data: Latitude->' + Survey_Case_Data.Latitude)
	
				console.log('Survey_Case_Data: Last_Amended_Time->' + Survey_Case_Data.Last_Amended_Time)
				console.log('Survey_Case_Data: Species_Name->' + Survey_Case_Data.Species_Name)
				console.log('Survey_Case_Data: SurveyState->' + Survey_Case_Data.SurveyState)
				console.log('Survey_Case_Data: Moderator_Comment->' +  Survey_Case_Data.Moderator_Comment)
				console.log('Survey_Case_Data: Measurement->' + Survey_Case_Data.Measurement)
				console.log('Survey_Case_Data: Observation->' + Survey_Case_Data.Observation)
				console.log('Survey_Case_Data: Condition->' + Survey_Case_Data.Condition	)
				console.log('Survey_Case_Data: Client_Reference->' + Survey_Case_Data.Client_Reference)
				console.log('Survey_Case_Data: Score->' + Survey_Case_Data.Score)
				
				this.$router.push({name:'IndividualSurveyPage', params: {mode_as_selected: 'View', individual_survey_data : Survey_Case_Data}});
				
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

			myRowClickHandler(record, index) {
				this.bulkselectsurveycase = [];
				for(var j = 0; j < this.values.length; j++ ) {
					if (record["SurveyID"] === this.values[j]["SurveyID"]) {
						this.values[j]["selected"] = !this.values[j]["selected"];
					}
					if (this.values[j]["selected"]) {
						this.bulkselectsurveycase.push(this.values[j])
					}
				}
				if (this.bulkselectsurveycase.length > 0 ) {
					for(var j = 0; j < this.bulkselectsurveycase.length; j++ ) {
						console.log('last bulkinsert case no:' + this.bulkselectsurveycase[j]["SurveyID"]); 									 
					} 
					this.vueexcelxlsx = false
				} 
				
			},
			
			sortChanged(e) {
				console.log('on sortchange:');
			},
			tree_name_download(){
						axios.get("https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/trees")
				       .then(response => {
							    this.tree_data = response.data
								Vue.prototype.$Tree_Data = response.data;
						
								this.selectable_tree_name_id = [];

								
								for(var j = 0; j < this.tree_data.length; j++ ) {
								//console.log('Tree Individual deatails:' +ListofTreeInfo[j].treeId)
									//console.log('tree name en:' + this.tree_data[j]['treeNameEn']);
									//console.log('tree id:' + this.tree_data[j]['treeId']);
									//let tree_id_pair[tree_id] = '';
									this.selectable_tree_name_id.push({text: this.tree_data[j]['treeNameEn'] , value: this.tree_data[j]['treeId']  })

									//this.selectable_tree_name_id[this.tree_data[j]['treeNameEn']] =  this.tree_data[j]['treeId']
								}
								
								for(var j = 0; j < this.selectable_tree_name_id.length; j++ ) {
									//console.log('tree name matching ID:' + this.selectable_tree_name_id[j]['text'] + " vs " + this.selectable_tree_name_id[j]['value']);
								}
								
				       }).catch(error => {
							this.$swal.fire({
								position: 'center',
								icon: 'error',
								title:'Tree Name Cannot be Downloaded. Pleaser refresh later.',
								showCloseButton: true
							})
							console.error("There was an error in tree name download!", error);
				       });			
			},
			
								
        },

		created: function(){
			this.values = [];
			if(typeof(Vue.prototype.$Tree_Data) === 'undefined' || Vue.prototype.$Tree_Data === null || Vue.prototype.$Tree_Data === '') {
					this.tree_name_download();
			}
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
