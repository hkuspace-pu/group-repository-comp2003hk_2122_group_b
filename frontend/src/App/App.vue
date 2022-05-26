<template>

  <div id="app" style="background-color:rgb(34, 40, 39)"  >
	   
	   <div class = "div-title" :style="'margin-left:'+this.appmargin">
			<b-container>
		    	<b-row >
					<b-col cols="12" align-self="center">
						<!-- <center><img alt="Tree Project logo" src="../assets/logo10.png"></center> -->
					</b-col>
				</b-row>
				<b-row>
					<b-col cols="8" align-self="center">
					</b-col>
					<b-col cols="2" align-self="right">
						<p class="text-white" ><H4 v-if="!isLoggedIn" >Hello, User</H4><H4 v-else="isLoggedIn"> Hello, {{this.updateloginuser}}</H4></p>
					</b-col>
					<b-col cols="2" align-self="right">		
						<H4><router-link v-if="!isLoggedIn" to="/login"><p class="text-white" >Sign-In</p></router-link><router-link v-else to="/home"> <a :href="href" @click.prevent="logout">Sign-Off</a></router-link></H4>
					</b-col>
					
				</b-row>
			</b-container>
	  </div> 
	  <div class="line-1"></div>
	  <br>

   
	<div id="view" :class="[{'collapsed' : collapsed}]" :style="'margin-left:'+this.appmargin" >	
      <router-view/>
	 
    </div>
	
    <sidebar-menu
      class="sidebar"
      :menu="menu"
	  width='200px'
      :collapsed="expanded"
	  @toggle-collapse="onCollapse"
      @item-click="onItemClick"
      
	  
    />
	</p>
  </div>
  <!--<div class="logout"  v-if ="this.$Login_Name != 'User'">
      <b-form @submit.prevent="logout" >
  		<b-container>
  			<b-row>
  				<b-col cols="3" align-self="left">
  					<b-button type="submit" variant="primary">Logout</b-button>
  				</b-col>
  					<b-col cols="3" align-self="left">
  						<H1></H1>Hi {{ this.$Login_Name }}</H1>
  					</b-col>
  			</b-row>
  		</b-container>
  	</b-form>
  </div> -->
</template>

<script>
import Vue from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VueCryptojs from 'vue-cryptojs'
import axios from 'axios';
import VueSimpleAlert from 'vue-simple-alert';
import { Component } from 'vue-property-decorator';
import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { mapMutations,mapGetters  } from "vuex";

Vue.use(VueCryptojs)

Vue.component('v-select', VueSelect.VueSelect)
	
export default {
  name: "App",
 
  data() {
    return {
	tree_data:'',
	loginuser:"User",
     appmargin: this.appmargin,	
	 width: '200px',
      menu: [
        {
          header: true,
          title: "Application Menu",
		  hiddenOnCollapse: true
        },
		{ 
		  title: "Hello! User",
		  hiddenOnCollapse: true
		},
		{
		  href: "/home",
		  title: "Home",
		  icon: "fa fa-home"
		},
        {
          href: "/register",
          title: "Join us",
          icon: "fa fa-user-plus"
        },
        {
          href: "/login",
          title: "Sign-In",
          icon: "fa fa-sign-in"
        },
        {
	      href: "/searchtreepage",
		  params: "{ Select_Individual_Tree_Info: Select_Individual_Tree_Info }",
          title: "Search Tree",
          icon: "fa fa-magnifying-glass"
        },
        {
          href: "/surveyrecordlist",
          title: "Survey Record List",
          icon: "fa fa-list-check"
        },
        {
          href: "/individualsurveypage",
          title: "Single Survey Form",
          icon: "fa fa-file-invoice"
        },
		{
		  href: "/surveycsvimportpage",
		  title: "Survey CSV Import",
		  icon: "fa fa-cloud-arrow-up"
		  
		},
        {
          href: "/yourprofile",
          title: "Your Contribution",
          icon: "fa fa-address-card"
        },
        {
          href: "/about",
          title: "About US",
          icon: "fa fa-tree"
        },
       
      ],
      collapsed: true,
	 
    };
  },
  computed: {
  	updateuser: function() {
  	    if(typeof(Vue.prototype.$Login_Name) !== 'undefined' || Vue.prototype.$Login_Name !== null) {
			return "Hello! " + Vue.prototype.$Login_Name;	
		} else {
			return "Hello! User"
		}	
  	},
	updateloginuser: function() {
		if(typeof(Vue.prototype.$Login_Name) === 'undefined' || Vue.prototype.$Login_Name === null || Vue.prototype.$Login_Name === '') {
			console.log('updateloginuer no defined')
			return  'User'
		} else {
			console.log('current user:' + Vue.prototype.$Login_Name)
			return  Vue.prototype.$Login_Name;
		}
	},
	 ...mapGetters(["isLoggedIn"])
 
  },
  methods: {
	computed: {
	      ...mapGetters(["isLoggedIn"])   
	  },
	  ...mapMutations(["setUser", "setToken"]),
	  
    onItemClick(e, i) {
      console.log("onItemClick");
	  if (this.collapsed) {
		  this.appmargin = '0px';
	  } else {
		   this.appmargin = '200px';
	  }
	  
    },
	logout:function(){
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
				this.menu[1].title = "Hello! User";
				console.log('Login Name:' + Vue.prototype.$Login_Name);
				this.setUser('User');
				this.setToken('');
				 this.$router.push('/home')
				
			}
		})	
	},
		
		
    onCollapse(c) {
      console.log("onCollapse:" + c);
      this.collapsed = c;
	  console.log(this.appmargin);
	  if (this.collapsed) {
	  		  this.appmargin = '0px';
	  } else {
	  		   this.appmargin = '200px';
	  }
	   this.menu[1].title = "Hello!  " + Vue.prototype.$Login_Name;
    },
	tree_name_download(){
			
			axios.get("https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/trees")
			.then(response => {
				
				Vue.prototype.$Tree_Data = response.data;	
				
						
			}).catch(error => {
				this.$swal.fire({
					position: 'center',
					icon: error,
					title:'Tree Name Cannot be Downloaded. Pleaser refresh later.',
					showCloseButton: true
				})
				console.error("There was an error in tree name download!", error);
			});			
		},
	

	},
  
  created(){
  	if(typeof(Vue.prototype.$Tree_Data) === 'undefined' || Vue.prototype.$Tree_Data === null || Vue.prototype.$Tree_Data === '') {
  		this.tree_name_download();
  	}
	//if (this.collapsed) {
	//		  this.appmargin = '0px';
	//} else {
			   this.appmargin = '200px';
	//};
	this.$router.push('/home')
  }
};


</script>

<style >
#view {
  padding-left: 50px;
}
#view.collapsed {
  padding-left: 50px;
}

.sidebar.v-sidebar-menu .vsm-arrow:after {
  content: "\f105";
  font-family: "FontAwesome";
}
.sidebar.v-sidebar-menu .collapse-btn:after {
  content: "\f07e";
  font-family: "FontAwesome";
}

.div_title{
 text-align: center;
  border: 3px solid blue;
  }
  
 .line-1{
width: 100%;
height: 2px;
border-bottom: 2px solid white;
position: absolute;
}
</style>
