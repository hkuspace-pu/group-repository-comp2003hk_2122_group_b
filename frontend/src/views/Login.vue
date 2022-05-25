<template>

  <div style="background-color:rgb(34, 40, 39)" >
<br>

<b-container class="bv-example-row">
   <b-row class="text-center" class="border border-primary">
	<b-col align-self="center" cols="2"><h3><p class="text-white">Sign-In</p></h3></b-col>
	<br>
	<b-col cols="10" align-self="center" >
	 <h5>
    <b-form @submit.prevent="login" @reset.prevent="clear('login')">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
		class="text-white" 
      >
        <b-form-input
          id="input-1"
          v-model="login_email"
          type="email"
          placeholder="Please Enter Your Email Address"
          required
		   
        ></b-form-input>
      </b-form-group>
      <b-form-group class="text-white"  id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="login_password"
          placeholder="Please Enter Password"
          required
		  type="password" 
        ></b-form-input>
      </b-form-group>
	
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
			</b-row>
	    </b-container>
	 
	  </h5>
	  </b-row>
	  
  </b-form>
  </b-col>
   </b-row>
    <br>
   <b-row  class="border border-primary">
	   <b-col align-self="center" cols="2"><h3><p class="text-white"> Reset Password</p> </h3></b-col>
	<b-col cols="10" align-self="center">
  <h4>
  <b-form @submit.prevent="reset_password()"  @reset.prevent="clear('reset')">
      <b-form-group
	    class="text-white"
        id="input-group-3"
        label="Please enter a new password"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="login_new_password"
          type="password"
          placeholder="A new password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group class="text-white" id="input-group-4" label="Please re-enter a new password" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="login_new_password_confirmed"
          placeholder="A new password"
          required
  		  type="password" 
        ></b-form-input>
      </b-form-group>
	  <b-container>
	  	<b-row>
	  		<b-col cols="3" align-self="left">
	  			<b-button type="submit" variant="primary">Submit</b-button>
	  		</b-col>
	  		<b-col cols="2" align-self="left">
	  			<b-button type="reset" variant="danger">Reset</b-button>
	  		</b-col>
			<b-col cols="7" align-self="left">
				<h6><p class="text-white">*Please also enter your email and current password in above "Sign-In" Section</p></h6>
			</b-col>
	  	</b-row>
	  </b-container>

  </b-form>
  </b-col>
  </b-row>
   <br>
  <b-row class="border border-primary">
	  <b-col align-self="center" cols="2"><h3><p class="text-white"> Forget Password</p></h3></b-col>
  <br>
  <b-col cols="10" align-self="center">
  <b-form @submit.prevent="forget_password()" >
	  <b-container>
	  	<b-row>
	  		<b-col cols="3" align-self="left">
	  			<b-button type="submit" variant="primary"><p class="text-white">Submit</p></b-button>
	  		</b-col>
	  		<b-col cols="2" align-self="left">
	  			
	  		</b-col>
	  		<b-col cols="7" align-self="left">
	  			<h6><p class="text-white">*Please enter your email address in above "Sign-In" Section</p></h6>
	  		</b-col>
	  	</b-row>
	  </b-container>
  
  </b-form>
  </b-col>
  </h4>
  </b-row>
  </b-container>
  
  </div>
  
</template>

<script>
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
import crypto from '../views/util/crypto'
import Vue from 'vue';
import { mapMutations,mapGetters  } from "vuex";

export default {
	data: () => {
		return {
			url: "https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/users",
			email:"",
			login_password:"",
			login_email:"",
			login_new_password:"",
			login_new_password_confirmed:"",
			
		};	
	},

	methods: {
		computed: {
		    ...mapGetters(["isLoggedIn"])   
		},
		...mapMutations(["setUser", "setToken"]),
	    async login(e) {
			let validatePassword = this.checkLoginEmpty();
	
			if (!validatePassword){
				let key = "yAQwfsssfLP48cHQ",
				iv = crypto.generateIV(16),
				sendObj = {
					"requestType": "login",
					"email": this.login_email,
					"iv" : iv,
					"password": crypto.encrypt(this.login_password, key, iv)
				}
				console.log('login message:', sendObj ); 
				axios.put(this.url, sendObj).then(res => {
					this.$swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Welcome! ' + res.data.userName + " You are logged in.",
						showCloseButton: true
					})
					console.log('starLog login response', res); 
					this.login_email = "";
					this.login_password = "";
					Vue.prototype.$Login_Name  =  res.data.userName;
					Vue.prototype.$Login_Email =  res.data.email;
					this.setUser(res.data.userName);
					this.setToken(123456789);
				}).catch((error) => {
					this.$swal.fire({
						position: 'center',
						icon: 'success',
						title:error,
						showCloseButton: true
					})
					console.log('Login Error:' + error);
				});;
			}
	    },
		reset_password()  {
		    let isEmpty = this.checkUpdatePasswordEmpty();
		    if (isEmpty) return;
			if(typeof(Vue.prototype.$Login_Email) === 'undefined' || Vue.prototype.$Login_Email === null || Vue.prototype.$Login_Email === '') {
				if (this.login_email === '') {
					this.$swal.fire({
						position: 'center',
						icon: 'error',
						title: "Please input your email in Login Session.",
						showCloseButton: true
					})
					return;
				}
			} else {
				this.login_email = Vue.prototype.$Login_Email
			}
			
		    let key = "yAQwfsssfLP48cHQ",
		        oldPasswordIV = crypto.generateIV(16),
		        newPasswordIV = crypto.generateIV(16),
		        sendObj = {
		            "requestType": "changePassword",
		             "email": this.login_email,
		            "oldPassword": crypto.encrypt(this.login_password, key, oldPasswordIV),
		            "oldPasswordIV": oldPasswordIV,
		            "newPassword": crypto.encrypt(this.login_new_password, key, newPasswordIV),
		            "newPasswordIV": newPasswordIV
		        };
		    console.log('reset message:', sendObj ); 
		    axios.put(this.url, sendObj).then(res => {
				this.$swal.fire({
					position: 'center',
					icon: 'success',
					title: res,
					showCloseButton: true
				})
		        console.log('starLog change password response', res);
				this.login_new_password = "";
				this.login_new_password_confirmed = "";
		    }).catch((error) => {
		    	this.$swal.fire({
		    		position: 'center',
		    		icon: 'error',
		    		title:error,
		    		showCloseButton: true
		    	})
		    	console.log('Login Error:' + error);
		    });;
		},
		checkLoginEmpty()  {
		    let email = this.login_email || "",
		        password = this.login_password || "";
		    if (email.length <= 0 || password.length <= 0) {
		        this.$swal.fire({
		        	position: 'center',
		        	icon: 'error',
		        	title: "Password or Email address should not be empty",
		        	showCloseButton: true
		        })
		        return true;
		    }
		    return false;
		},
				
		checkUpdatePasswordEmpty() {
		    let oldPassword = this.login_password || "",
		        newPassword = this.login_new_password || "",
		        confirmPassword = this.login_new_password_confirmed || "";
		
		    if (oldPassword.length <= 0 || newPassword.length <= 0 || confirmPassword.length <= 0) {
		        this.$swal.fire({
		        	position: 'center',
		        	icon: 'error',
		        	title:"All password boxes should not be empty.",
		        	showCloseButton: true
		        })
		        return true;
		    } else {
				if (newPassword.length <= 8 || confirmPassword.length <= 8) {
					this.$swal.fire({
						position: 'center',
						icon: 'error',
						title:"New Password should contain more than 8 characters",
						showCloseButton: true
					})
					return true;
				} else {
					if (newPassword != confirmPassword) {
						this.$swal.fire({
							position: 'center',
							icon: 'error',
							title:"New Password is not matched with Reconfirm New Password",
							showCloseButton: true
						})
						return true;
					}
				}
			}
			return false;
		},
		forget_password(){
			if (this.login_email.length <= 0 ) {
			    this.$swal.fire({
			    	position: 'center',
			    	icon: 'error',
			    	title:"Email box should not be empty.",
			    	showCloseButton: true
			    })
			} else {
				this.$swal.fire({
					position: 'center',
					icon: 'success',
					title:"Reset Password Link is sent to your email address. The link keeps to be valid for 3 days only!",
					showCloseButton: true
				})
			}
		},
		
		clear(section) {
			
			 console.log('clear section:' + section);
			this.$swal.fire({
			  title: 'Could you please confirm?',
			  text: "All data will be cleared in this section!",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, please clear all data in this section!'
			}).then((result) => {
				 console.log('clear section result:' + result);
				if (result.isConfirmed) {
					 console.log('clear section go ahead to clear:' + section);
					if (section == "login") {
						 console.log('clear login section');
						this.login_email = "";
						this.login_password = "";
					} else if (section == 'reset') {
						 console.log('clear reset section');
						this.login_new_password = "";
						this.login_new_password_confirmed = "";
					}
				}
			})
		}
		
	},
	created: function(){
		this.login_name = this.$Login_Name;
	},
}
</script>