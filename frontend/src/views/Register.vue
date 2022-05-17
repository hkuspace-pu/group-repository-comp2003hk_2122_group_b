<template>
	<!--
    <div>
    <h1>Registration</h1>
	<form @submit="onCreateClick">
		<label>Login Name:</label><input v-model="register_username" placeholder="Login (case sensitive)" />
		<br />
		<br />
		<label>Login Password:</label><input v-model="register_password" placeholder="Password (case sensitive, more than 8 characters)" type="password" />
		<br />
		<br />
		<label>Confirmed Password:</label><input v-model="register_password_confirmed" placeholder="Re-enter your password" type="password" />
		<br />
		<br />
		<label>Your Name:</label><input v-model="register_username" placeholder="Your Name" type="String" />
		<br />
		<br />
		<label>Email:</label><input v-model="register_email" placeholder="email" type="email" />
		<br />
		<br />
		<button type="submit">Register</button>
		<br />
		<br />
		<button @click='clear()'>Clear All</button>
		<br />
		<br />
		<p>{{register_status}}</p>
		</form>
    </div>
	-->
	
    <div>
		<b-container >
			<b-row  >
				<b-col cols="10" align-self="left">
					 <h2>Register new member</h2>
				</b-col>	
			</b-row>
	<br>
	<h4>
		<b-row class="text-center" class="border border-primary">
			<b-col cols="10" align-self="center">
      <b-form @submit.prevent="onCreateClick" @reset.prevent="clear">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="You will use this email address to login"
        >
          <b-form-input
            id="input-1"
            v-model="register_email"
            type="email"
            placeholder="Enter Email Address"
            required
          ></b-form-input>
        </b-form-group>
        <br>
        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="register_username"
            placeholder="Please Enter Your Full Name"
            required
          ></b-form-input>
        </b-form-group>
        <br>
        <b-form-group id="input-group-3" label="Password" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="register_password"
            placeholder="Please Enter Your Password (which containts more than 8 characters)"
            required
			type="password" 
          ></b-form-input>
        </b-form-group>
		<br>
        <b-form-group id="input-group-4" label="Confirm Password" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="register_password_confirmed"
            placeholder="Please Confirm Your Password"
            required
			type="password" 
          ></b-form-input>
        </b-form-group>
        <br>
		<b-container>
			<b-row>
				<b-col cols="3" align-self="left">
					<b-button type="submit" variant="primary">Submit</b-button>
				</b-col>
				<b-col cols="3" align-self="left">
					<b-button type="reset" variant="danger">Reset</b-button>
				</b-col>
				<b-col cols="6" align-self="left">
					<h5></h5>
				</b-col>
				<br>
			</b-row>
		</b-container>
		
 
    </b-form>

    </h4>
	</b-col>
	</b-row>
    </div>
</template>



<script>
import { mapMutations } from "vuex";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
import crypto from '../views/util/crypto'



export default {
	data: () => {
		return {
			url: "https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/users",
			newPassword: "",
			confirmPassword: "",
			email:"",
			register_username:"",
			register_password:"",
			register_password_confirmed:"",
			register_email:"",
			login_name:""
		};	
	},

	methods: {
	    async onCreateClick(e) {
			e.preventDefault();
			this.$swal.fire({
			  title: 'Could you please confirm?',
			  text: "New Registration User Information is correct",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, please submit!'
			}).then((result) => {
				
				let isValidate = this.checkCreationEmpty();
				if (!isValidate) {;
					this.createUser();
				}
			})
	    },
		
	    createUser() {
	        let key  = "yAQwfsssfLP48cHQ",
	        iv = crypto.generateIV(16),
			
	        sendObj = {
	                "userName": this.register_username,
	                "email": this.register_email,
	                "membership": 200,
	                "password": crypto.encrypt(this.register_password, key, iv),
	                "iv": iv
	            };
		
	        console.log('starLog send obj', sendObj);
			axios.post(this.url, sendObj).then(res => {
	            console.log('starLog update user details response', res);
				this.$swal.fire({
						position: 'center',
						icon: 'success',
						title:  "Welcome Email is sent. Please follow the remaining steps on it to complete the whole registration. Thank you."  ,
						showCloseButton: true
				});
				this.register_username = "";
				this.register_username = "";
				this.register_password = "";
				this.register_password_confirmed = "";
				this.register_email = "";
			});
	    },

	    checkCreationEmpty() {
			let name = this.register_username || "",
	        newPassword = this.register_password || "",
		    email = this.register_email || "",
	        confirmPassword = this.register_password_confirmed || "";
	
	        if (name.length <= 0)  {
				this.$swal.fire({
					position: 'center',
					icon: 'error',
					title:"Your Name is empty",
					showCloseButton: true
				})
	            return true;
	        }
			if (email.length <= 0 ) {
			    this.$swal.fire({
			    	position: 'center',
			    	icon: 'error',
			    	title:"Your Email is empty",
			    	showCloseButton: true
			    })
			    return true;
			}
			if (newPassword.length <= 0 || confirmPassword.length <= 0) {
			    this.$swal.fire({
			    	position: 'center',
			    	icon: 'error',
			    	title:"Your Password is empty",
			    	showCloseButton: true
			    })
			    return true;
			} else {
				
				if (newPassword != confirmPassword) {
				    this.$swal.fire({
				    	position: 'center',
				    	icon: 'error',
				    	title:"Your two passwords are not matched",
				    	showCloseButton: true
				    })
				    return true;
				} else {
					if (newPassword.length < 8) {
						this.$swal.fire({
							position: 'center',
							icon: 'error',
							title:"Password should be composed of more than 8 characters.",
							showCloseButton: true
						})
					    return true;
					}
				}
			}
			
	        return false;
	    },
	    

	    clear() {
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
					this.register_username = "";
					this.register_username = "";
					this.register_password = "";
					this.register_password_confirmed = "";
					this.register_email = "";
				}
			})
	    },

	},
	created: function(){
		this.login_name = this.$Login_Name;
	},
  
};
</script>