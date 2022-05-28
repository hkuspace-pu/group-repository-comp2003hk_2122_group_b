
<template >
   <div id="surveyrecordlist" >

		<br>
		<center>
		<b-row>
			<b-col lg="4" sm="1">
				<b-button :pressed="false" variant="success" pill @click='allRecords(0);'>
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
						      <b-form-input bordered = "true" v-model="tree_name_string_input" size="lg" placeholder="input 'amb' when tree name(s) contains 'amb' (i.e. Carambola)"></b-form-input>
						    </b-col>
						</b-row>
						</b-form-group>
					</div>	
					<br>
					<div>
						<b-form-group class="survey_id my-1" v-slot="{ ariaDescribedby }">
						<b-row>
						    <b-col sm="3">
						        <label for="survey_id_start_input">Survey ID From (fill both "0" to capture all records):</label>
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
						<b-form-group class="last_amended_date my-1" v-slot="{ ariaDescribedby }">
						<b-row>
						    <b-col sm="3">
						        <label for="last_amended_date_from_input">Survey Record Last Amendment Date from (both of boxes must be filled or other ignoring them): </label>
						    </b-col>
						    <b-col sm="3">
						        <b-form-input v-model="last_amended_date_from_input" type="date" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"></b-form-input>
						    </b-col>
							<b-col sm="1">
								<center>
									<label for="last_amended_date_to_input"> to: </label>
								</center>
							</b-col>
							<b-col sm="3">
							    <b-form-input v-model="last_amended_date_to_input" type="date" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"></b-form-input>
							</b-col>
						</b-row>
						</b-form-group>
					</div>
					<br>
					<div>
						<b-form-group   label="Tree Condition ( Uncheck all boxes to ignore )" v-slot="{ ariaDescribedby }">
							<b-form-checkbox-group
								id="Tree_Condition_Checked_Box_Group"
								:options="selectable_tree_condition_options"
								v-model="selectable_tree_condition_selected"
								:aria-describedby="ariaDescribedby"
								value-field="tree_condition_value"
								text-field="tree_condition_text"
								name="Tree_Condition_Checked_Box_Group"
								plain>
							</b-form-checkbox-group>
						</b-form-group>
					</div>
					<br>
					<div>
						<b-form-group label="Survey Status ( Uncheck all boxes to ignore )" v-slot="{ ariaDescribedby }">
							<b-form-checkbox-group
								id="SurveyState_Checked_Box_Group"
								:options="SurveyState_Checked_Box_options"
								v-model="surveystate_checked_box_selected"
								:aria-describedby="ariaDescribedby"
								value-field="survey_state_value"
								text-field="survey_state_text"
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
					<div class="last_amended_date_from_input mt-3">Survey Record Last Amended Date from:   <strong>{{ last_amended_date_from_input }}  to  {{ last_amended_date_to_input }}</strong></div>
					<div class="tree_condition mt-3">Tree Condition: <strong>{{ selectable_tree_condition_selected }}</strong></div>
					<div class="SurveyState mt-3">Survey Status: <strong>{{ surveystate_checked_box_selected }}</strong></div>
					</h5>
					<br>
					</b-list-group-item>
					</b-list-group>
					<br>
					<b-button pill variant="info" @click='allRecords(1)' ><h5>Confirm</h5></b-button>
				</b-card>
			</b-collapse>
		</div>
		<br><br>
	    <div class="line-1" ></div> 
	    <br>
		<div>
			<b-container >
				<b-row  >
					<b-col cols="12" align-self="center">
					<H6>
					<div><p class="text-white">
						Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
						<b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
						<b>,         You selected {{  this.bulkselectsurveycase.length }} of {{  this.values.length }} record(s)</b></p>
				    </div>
					
					<b-table   selectable :fields="fields"   @row-clicked="myRowClickHandler" :select-mode="multi"  responsive="sm"   hover sticky-header="550px"  head-variant="light"  :items="items"  :tbody-tr-class="rowClass"  :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @sort-changed="sortChanged">

						<template #head(id)="scope" > <div class="text-white">Survey ID</div> </template>
						<template #head()="scope">
							<div class="text-nowrap text-black"> {{ scope.label }} </div>
							<template #cell(selected)="{ rowSelected }" >
								<template v-if="rowSelected" >
									<span class="text-danger" aria-hidden="true" >&check;</span>
									<span class="sr-only" >Yes</span>
								</template>
								<template v-else>
									<span aria-hidden="true" >&nbsp;</span>
									<span class="sr-only" >No</span>
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
import { mapMutations,mapGetters  } from "vuex";
 import Vuex from 'vue'

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
			tree_name_string_input:'',
		
			survey_id_start_input:"",
			survey_id_end_input:"",
			last_amended_date_from_input:"",
			last_amended_date_to_input:"",

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
			        {key:'selected', sortable: true, output_excel: false,  tdClass: (value) => value ? 'text-success' : 'text-white'},
					{key:'Last_Amended_Time', sortable: true,label: "Last Amended Time",field: "Last_Amended_Time", output_excel: true ,class: 'text-white'},
					{key:'Species_Name', sortable: true,label: "Tree Name",field: "Tree Name", output_excel: true,class: 'text-white'},
					{key:'Moderator_Comment', sortable: true,label: "Moderator Comment",field: "Moderator_Comment", output_excel: true,class: 'text-white'},
					{key:'Latitude', sortable: true,label: "Latitude",field: "Latitude", output_excel: true,class: 'text-white'},
					{key:'Longitude', sortable: true,label: "Longitude",field: "Longitude", output_excel: true,class: 'text-white'},
					{key:'Measurement', sortable: true,label: "Measurment",field: "Measurment", output_excel: true,class: 'text-white'},
					{key:'Observation', sortable: true,label: "Observation",field: "Observation", output_excel: true,class: 'text-white'},
					{key:'Condition', sortable: true,label: "Condition",field: "Condition", output_excel: true,class: 'text-white'},
					{key:'Video', sortable: true,label: "Video",field: "Video", output_excel: true,class: 'text-white'},
					{key:'Score', sortable: true,label: "Score",field: "Score", output_excel: true,class: 'text-white'},
					{key:'Client_Reference', sortable: true,label: "Client_Reference",field: "Client_Reference", output_excel: true,class: 'text-white'},
					{key:'SurveyState', sortable: true,label: "Survey State",field: "Survey State", output_excel: true,class: 'text-white'},
					{key:'actions',label: "Actions", field: "actions", sortable: true, output_excel: false,class: 'text-white'},
					{key:'actions2',label: "Action 2", field: "actions2", sortable: true, output_excel: false,class: 'text-white'}
					
			],
            selectable_tree_condition_selected: [],
			selectable_tree_condition_options: [
				{ tree_condition_text: 'Excellent', tree_condition_value: 'Excellent' },
				{ tree_condition_text: 'Normal', tree_condition_value: 'Normal' },
				{ tree_condition_text: 'Deteriorate', tree_condition_value: 'Deteriorate'},
				{ tree_condition_text: 'Poor',tree_condition_value: 'Poor' },
				{ tree_condition_text: 'Danger', tree_condition_value: 'Danger' },
			],
			surveystate_checked_box_selected: [],
			SurveyState_Checked_Box_options: [
				{ survey_state_text: 'Draft', survey_state_value: 'Draft' },
				{ survey_state_text: 'Final', survey_state_value: 'Final' },
				{ survey_state_text: 'Rejected', survey_state_value: 'Rejected'},
				{ survey_state_text: 'Approved',survey_state_value: 'Approved' },
				{ survey_state_text: 'Published', survey_state_value: 'Published'},
			],
		}                                            
	},
    computed: {
    	items: function() {
    	   
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
		...mapGetters(["isLoggedIn"]),

    },
	methods: {
		priceFormat(value){
			return '$ ' + value;
		},
        filter_individual_survey(){
			

			var ListofTreeInfo = this.values;
			var Select_Individual_Tree_Info = [];
			var treeNameEN = ""
			var treescientificName = ""
			var treeNameEN = ""
			//console.log("Tree Name Survey Name-->:+" + this.tree_string + "")
			if (this.tree_name_string_input.length > 0) {
				//console.log('Tree Individual deatails:' +ListofTreeInfo[j].treeId)
				 console.log('starting Survey Individual details Filtered-> ' + ListofTreeInfo)
				for(var k = 0; k < ListofTreeInfo.length; k++ ) {
					if (ListofTreeInfo[k].Species_Name.toLowerCase().includes(this.tree_name_string_input.toLowerCase()) ) {
						Select_Individual_Tree_Info.push(ListofTreeInfo[k])
							console.log('Survey Individual details Filtered: Included Tree Name-> ' +ListofTreeInfo[k].Species_Name)
					} else {
						console.log('Survey Individual details Filtered: Not Included Tree Name-> ' +ListofTreeInfo[k].Species_Name)
					}
				}
			} else {
				Select_Individual_Tree_Info = ListofTreeInfo
				console.log('Tree Name ignored' )
			}
			console.log('tree name filtered: ' + Select_Individual_Tree_Info)
			var Select_Individual_Tree_Info0 = [];
			if (this.surveystate_checked_box_selected.length > 0) {
				for(var j = 0; j < this.surveystate_checked_box_selected.length; j++ ) {
				//console.log('Tree Individual deatails:' +ListofTreeInfo[j].treeId)
					for(var k = 0; k < Select_Individual_Tree_Info.length; k++ ) {
						if (Select_Individual_Tree_Info[k].SurveyState === this.surveystate_checked_box_selected[j] ) {
								Select_Individual_Tree_Info0.push(Select_Individual_Tree_Info[k])
								console.log('Survey Individual details Filtered: Survey State-> ' + Select_Individual_Tree_Info[k].SurveyState)
						}
					}
				}
			} else {
				Select_Individual_Tree_Info0 = Select_Individual_Tree_Info
				console.log('Tree Survey State Ignore' )
			}
			console.log('tree survey state filtered: ' + Select_Individual_Tree_Info0)
			var Select_Individual_Tree_Info1 = []
			if (this.selectable_tree_condition_selected.length > 0) {
				for(var j = 0; j < this.selectable_tree_condition_selected.length; j++ ) {
					for(var k = 0; k < Select_Individual_Tree_Info0.length; k++ ) {
						if (Select_Individual_Tree_Info0[k].Condition === this.selectable_tree_condition_selected[j] ) {
								Select_Individual_Tree_Info1.push(Select_Individual_Tree_Info0[k])
								console.log('Survey Individual details Filtered: condition-> ' +Select_Individual_Tree_Info0[k].Condition)
						}
					}
			    }
			} else {
				Select_Individual_Tree_Info1 = Select_Individual_Tree_Info0
				console.log('Tree Survey Condition Ignore' )
			}
			console.log('tree condition filtered: ' + Select_Individual_Tree_Info1)	
			var Select_Individual_Tree_Info2 = []
			if (this.survey_id_start_input != 0 || this.survey_id_end_input != 0 ) {
				for(var k = 0; k < Select_Individual_Tree_Info1.length; k++ ) {
					console.log('Survey Individual details Filtered: -> Checking Survey ID:' + Select_Individual_Tree_Info1[k].SurveryID)
					if ((parseInt(Select_Individual_Tree_Info1[k].SurveyID)  >= this.survey_id_start_input) && (parseInt(Select_Individual_Tree_Info1[k].SurveyID)  <= this.survey_id_end_input )) {
						Select_Individual_Tree_Info2.push(Select_Individual_Tree_Info1[k])
						console.log('Survey Individual details Filtered: -> Survey ID:' +Select_Individual_Tree_Info1[k].SurveryID)
					} else {
						console.log('Survey Individual details Filtered: -> Survey ID Ignored:' + Select_Individual_Tree_Info1[k].SurveryID)
					}
				}
			    
			} else {
				Select_Individual_Tree_Info2 = Select_Individual_Tree_Info1
				console.log('Tree Survey ID Ignore' )
			}
			console.log('tree survey ID filtered: ' + Select_Individual_Tree_Info2)	
			
			var Select_Individual_Tree_Info3 = []
			var survey_date = ''
			var date_parts 
			var parts
			var date_from = this.last_amended_date_from_input;
			var date_to = this.last_amended_date_to_input;
			date_from = new Date(date_from.split('-'));
			date_to = new Date(date_to.split('-'));
			//console.log('last_amended_date_from_input:' + this.last_amended_date_from_input)
			//console.log('last_amended_date_from_output:' + this.last_amended_date_to_input)
			//console.log('last_amended_date_from_input_split:' + date_from)
			///console.log('last_amended_date_to_input_split:' + date_to)
			
			this.last_amended_date_from_input
			if (this.last_amended_date_from_input != '' && this.last_amended_date_to_input != '' ) {
				for(var k = 0; k < Select_Individual_Tree_Info2.length; k++ ) {
					//console.log('Survey Individual details Filtered: -> Checking Survey Amended Time:' + Select_Individual_Tree_Info2[k].Last_Amended_Time)
					survey_date = Select_Individual_Tree_Info2[k].Last_Amended_Time.substr(0, 10);
					console.log('survey date captured: ' + survey_date);
					
					parts = survey_date.split('-');
					// Please pay attention to the month (parts[1]); JavaScript counts months from 0:
					// January - 0, February - 1, etc.
					console.log('Date Part - Year: ' + parts[0]);
					console.log('Date Part - Month: ' + parts[1]-1);
					console.log('Date Part - Date: ' + parts[2]-1);
					date_parts = new Date(parts[0], parts[1] - 1, parts[2]); 
					
					//date_parts = new Date(survey_date); 
					console.log('formulated date: ' + date_parts);
					
					if (date_parts  >= date_from  && date_parts  <= date_to  ) {
						Select_Individual_Tree_Info3.push(Select_Individual_Tree_Info2[k])
						console.log('Survey Individual details Filtered: -> Last_Amended_Time Included: ' +Select_Individual_Tree_Info2[k].Last_Amended_Time)
					} else {
						console.log('Survey Individual details Filtered: -> Last_Amended_Time Ignored: ' + Select_Individual_Tree_Info2[k].Last_Amended_Time)
					}
				}
			    
			} else {
				Select_Individual_Tree_Info3 = Select_Individual_Tree_Info2
				//console.log('Tree Last_Amended_Time Ignore' )
			}
			
			this.values = Select_Individual_Tree_Info3;
			
			console.log('final survery filtered: ' + this.values)	
		},
		
		computed: {
		      ...mapGetters(["isLoggedIn"])   
		},
		
		...mapMutations(["setUser", "setToken"]),  
		
		allRecords: function(advanced_filter){
			
			if ( !this.$store.getters.isLoggedIn) {
				this.$swal.fire({
					position: 'center',
					icon: 'error',
					title:"Please Sign-In first",
					showCloseButton: true
				})
				
				 return;
				
			} 
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
					if (advanced_filter == 1) {
						this.filter_individual_survey();
					}
;		 
				}).catch((error) => {
					console.log('error on all Records:' + error);
				});	
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
 
			rowClass(item, type) {
			        if (!item || type !== 'row') return
			        if (item.selected) return 'table-secondary' 
			      }
						
			
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
	    border: 1px;
	}
	
	.form-control-borderless:hover, .form-control-borderless:active, .form-control-borderless:focus {
	    border: 1px;
	    outline: none;
	    box-shadow: none;
		 color: greenyellow;
	}
	.input-lg {
		 font-size: 25px;
	}
	.text-white {
	    color: white;
	}
	.text-black {
	    color: black;
	}	
	.text-green {
	    color: green;
	}	
 .line-1{
width: 100%;
height: 2px;
border-bottom: 2px solid white;
position: absolute;
}

  tr:hover {
      background-color:#f5f5f5;
  }
  
</style>

export default 
