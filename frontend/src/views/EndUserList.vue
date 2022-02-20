
<template>
	<div id="enduserlist">
	<input type='button' @click='prompt_BulkExportToExcel_Path(bulkselectenduser)' value='Excel Bulk End User Report Output'><span>End User Login Name Selected: {{ bulkselectenduser.join() }} </span>
	<table border='1' width='80%' style='border-collapse: collapse;'>
		<tr>
			<td><input type='button' value='All User Records' @click='allRecords();'></td>
		</tr>   
		<tr>
			<th>Select</th>
			<th>Login Name</th>
			<th>User Name</th>
			<th>Email</th>
			<th>Role</th>
			<th>Action</th>
			
		</tr>

		<tr v-for='(user,index) in users'>
			<td><input type="checkbox" :id="user.username" :value="user.username" v-model="bulkselectenduser"></td>
			<td>{{ user.username }}</td>
			<td>{{ user.name }}</td>
			<td>{{ user.email }}</td>
			<td>{{ user.role }}</td>
			<td><input type='button' value='Removed' @click='allRecords();'></td>
			</tr> 
	</table>
	</div>
</template>

<script>
import axios from 'axios';
import VueSimpleAlert from 'vue-simple-alert';
import { Vue, Component } from 'vue-property-decorator';
import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { version, description } from 'vue-simple-alert/package.json';


export default  {   
      	           
	props: ['data'],

    data () {

        return {
			users:this.users,
			//user:this.users.user,
			username: '',
			name: '',			
			email: '',
            role:'',
			bulkselectenduser:[],
			
			//user_role_option_selected: this.role,
		//	selectable_user_role_options: [
		//		{ text: '-', values: '-'},
		//		{ text: 'Public', values: 'Public'},
		//		{ text: 'Moderator', values: 'Moderator'},
		//	],
			
        }
	},
	methods: {
		allRecords: function(){
			axios.get('ajaxfile_get_enduserlist.php').then((response) => {
				this.users = response.data;
				console.log('get all users list!'); 
			}).catch((error) => {
				console.log('error:' + error);
			});
						
		},
        
		userReport: function(){
			axios.get('ajaxfile_get_enduserlist.php').then((response) => {
				this.users = response.data;
                console.log('get all users list!'); 
			}).catch((error) => {
			    console.log('error:' + error);
			});
						
		},
		deleteRecord: function(){
			axios.get('ajaxfile_get_enduserlist.php').then((response) => {
				this.users = response.data;
                console.log('get all users list!'); 
			}).catch((error) => {
			    console.log('error:' + error);
			});
						
		}, 
		
		BulkExportToExcel(bulkselectenduser,excel_file_path) {
			this.alert_BulkExportToExcel_created(excel_file_path) 
		},
		
		alert_BulkExportToExcel_created(excel_file_path) {
			this.$alert("EndUserExport.csv is saved at " + excel_file_path ,"success","Success Created!"
			).then(() => {
					//console.log("Closed");
			});
		},
		
			  
		prompt_BulkExportToExcel_Path(bulkselectenduser) {
			this.$prompt(
				bulkselectenduser.join(),
				"C:/desktop/download/EndUserExport.csv",
				"Input a path of the excel file to save the below End User Information",
				"question",
				{ input: "text" }
			)
			.then((response) => {
			    this.BulkExportToExcel(bulkselectenduser,response ) ;
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
