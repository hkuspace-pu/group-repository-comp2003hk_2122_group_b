
<template>
   
   <div id="surveyrecordlist" >
	<input type='button' @click='prompt_BulkExportToExcel_Path(bulkselectsurveycase)' value='Excel Bulk Output'><span>Survey ID Selected: {{ bulkselectsurveycase.join() }} </span>
    <input type='button' @click='prompt_BulkImportFromExcel_Path()' value='Excel Bulk Survey Information Upload'>
    
	<table border='1' width='80%' style='border-collapse: collapse;background-color:rgb(207, 254, 247)'>
        <tr>
			<td><input type='button' value='All Survey Case No' @click='allRecords();'></td>
			<td>  Input </td>
            <td> Between </td>
			<td><input type='number' v-model='Survey_Case_No_From' placeholder="Enter between 1 - 24"></td>
            <td> And </td>
            <td><input type='number' v-model='Survey_Case_No_To' placeholder="Enter between 1 - 24"></td>
			<td><input type='button' @click='Filter_By_Survey_Case_No()' value='Filter by Case No'></td>
		</tr>
		
		<br><br>
		<tr>
        </tr>
		<tr>
			<th>Select</th>
			<th>Survey ID</th>
			<th>Creator Name</th>
			<th>Created Time</th>
			<th>Created Venue</th>
			<th>Species Name</th>
			<th>Survey Status</th>
			<th>Administrator Comment</th>
			<th colspan = 3>Action</th>
		</tr><!-- Details/Delete -->
		<tr v-for='(surveycase,index) in surveycases'>
			<td><input type="checkbox" :id="surveycase.Survey_Case_No" :value="surveycase.Survey_Case_No" v-model="bulkselectsurveycase"></td>
			<td>{{ surveycase.Survey_Case_No }}</td>
			<td>{{ surveycase.Creator_Name }}</td>
			<td>{{ surveycase.Created_Time }}</td>
			<td>{{ surveycase.Created_Venue }}</td>
            <td>{{ surveycase.Species_Name }}</td>
			<td>{{ surveycase.Survey_Status }}</td>
			<td>{{ surveycase.Administrator_Comment }}</td>
			<td><input type='button' value='Delete' @click='deleteRecord(index,surveycase.Survey_Case_No);'></td>
			<td><input type='button' value='View' @click='showDetail("View",surveycase.Survey_Case_No);'></td>
			<td><input type='button' value='Edit' @click='showDetail("Edit",surveycase.Survey_Case_No);'></td>
		</tr>
	</table>
		
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
import { version, description } from 'vue-simple-alert/package.json';

export default  { 
	
		props:['data'],
				
        data () {
            return {
				surveycases:this.surveycases,
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
				bulkselectsurveycase:[]
			}                                            
		},
        mounted() {
			if (localStorage.getItem('surveycases')) {
				try {
					localStorage.setItem('surveycases', JSON.stringify(this.surveycases));   
		        } catch(e) {
                    localStorage.removeItem('surveycases');
                }
            }
        },
		persist() {
			localStorage.surveycases = this.surveycases;			      
				console.log('persist localStorage.surveycases = this.surveycases;	');   
	    },
                
		watch:{
			surveycases(newsurveycases) {        
				try {
					localStorage.setItem('surveycases', JSON.stringify(newsurveycases));
				} catch (e) {
					console.log('erro watch localStorage.surveycases = newsurveycases;');  
				}       
			}
		},
		methods: {
			allRecords: function(){
				axios.get('ajaxfile_get_surveyrecords.php').then((response) => {
					this.surveycases = response.data;
					console.log(response.data); 
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
						this.surveycases = response.data;
					}).catch((error) => {
						console.log(error);
					});
				}
			},
			
			deleteRecord: function(index,Survey_Case_No){
				axios.post('ajaxfile_delete_surveyrecords.php', {
					 Survey_Case_No: Survey_Case_No
				}).then((response) => {
					this.surveycases.splice(index, 1);
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
								
        },

		created: function(){
        },
                                
                               

}
                                           
</script>
<style>
	input[type=text]{
	width: 100%;
    }
</style>

export default 
