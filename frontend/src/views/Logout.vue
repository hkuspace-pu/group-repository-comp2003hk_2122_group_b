<template>
	<div class="logout">

	    <b-form @submit.prevent="logout" >
			<b-container>
				<b-row>
					<b-col cols="3" align-self="left">
						<b-button type="submit" variant="primary">Logout</b-button>
					</b-col>
				</b-row>
			</b-container>
		</b-form>
	</div>
</template>

<script>
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
	
	methods: {
		logout() {
			this.$swal.fire({
				title: 'Could you please confirm to logout?',
				text: "Unsaved data will be lost!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, I want to logout.'
			}).then((result) => {
		   	
				if (result.isConfirmed) {
					Vue.prototype.$Login_Name  =  "User";
					console.log('Login Name:' + Vue.prototype.$Login_Name);
				}
			})	
		},
	}
}
</script>