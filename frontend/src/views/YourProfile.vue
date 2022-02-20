<template>
  <div class="yourprofile">
    <h1>Your Profile</h1>  
	   <h1><label>Full Name: Mok Wai Tin</label></h1>
	   <h1><label>Login Name: TIMMOK</label></h1>	
	   <br />
	   <br />
	   <label>Email:</label><input v-model="Email" placeholder="wai.mok-1@students.plymouth.ac.uk" type="email"/>
	   <br />
	   <br />
	   <label>Role:</label><label>Moderator</label>
	   <br />
	   <br />
	   	<h1 id="action_buttons">
	   		<input type='button' value='Clear All' @click='confirm_clearall()'/>
	   		<br />
	   		<br />
	   	    <input type='button' value='Update' @click='confirm_alert_box("Confirm to submit new email address?","TIMMOK",Email )'/>
	   	</h1>  
  </div>
</template>


<script>
import axios from 'axios';
import VueSimpleAlert from 'vue-simple-alert';
import { Vue, Component } from 'vue-property-decorator';
import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { version, description } from 'vue-simple-alert/package.json';
export default {
	data(){
		return{
			Email : this.Email,
		}
	},
	
	methods:{

		clearall() {
			this.Email = "";
		},
		submit(username,email){
			this.alert_submitted("Your new Email" + email + " for login name " + username + " has been submitted Successfully!\nThanks you","success","Success !");
		},
		confirm_clearall() {
			console.log("confirm to clear all?");
		    this.$confirm("All Input will be removed!", 'Confirm?', 'warning'
			).then((r) => {
				console.log("User Confirm to clear all");
				clearall();
		    }).catch(() => {
		        console.log('User cancel to submit');
		    });
		},
		confirm_alert_box(confirm_message, username, email) {
			console.log(confirm_message +  " " + username);
			if (email = "") {
				this.alert_submitted("Email cannot be empty.",alert_icon,alert_word) 
			} else {
				this.$confirm(confirm_message, 'Confirm?', 'warning'
				).then((r) => {
					console.log("good to go!");
					this.submit(username, email );
				
				}).catch(() => {
					console.log('User cancel to submit');
				});
			}
		},		
		alert_submitted(message,alert_icon,alert_word) {
			this.$alert( message,alert_word,alert_icon
			).then(() => {
					//console.log("Closed");
			});
		}
	}
}
</script>
