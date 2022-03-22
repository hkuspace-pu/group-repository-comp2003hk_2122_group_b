
<template >
   
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
	</table>	
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


export default  { 
	    name: "App",
		props:['data'],
		provide: {
			message: 'hello!'
		},
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
				values: [],
					  
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
					//this.surveycases = response.data;
					this.values = [];
					for (const eachsurvey of response.data) {
					  eachsurvey["Selected"] = false;
					  eachsurvey["Survey_Case_No"] = Number(eachsurvey["Survey_Case_No"]) ;
					}
					this.bulkselectsurveycase =[];
					this.values=    response.data;
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
