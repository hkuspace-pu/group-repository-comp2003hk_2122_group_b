<template>
	 
  <div id="app" style="background-color:rgb(241, 255, 221)">
	   <div class = "div-title" :style="'margin-left:'+this.appmargin">
	 	<center><img alt="Tree Project logo" src="../assets/logo10.png"></center>
			   </div>
    <div id="view" :class="[{'collapsed' : collapsed}]" :style="'margin-left:'+this.appmargin" >
      <router-view/>
    </div>
    <sidebar-menu
      class="sidebar"
      :menu="menu"
	  width='240px'
      :collapsed="collapsed"
	  @toggle-collapse="onCollapse"
      @item-click="onItemClick"
      
    />
  </div>
</template>

<script>
import Vue from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', VueSelect.VueSelect)
	
export default {
  name: "App",
  appmargin: '0px',
  data() {
    return {
     appmargin: this.appmargin,	
	 width: '240px',
      menu: [
        {
          header: true,
          title: "Application Menu",
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
          title: "Login",
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
          title: "Your Profile",
          icon: "fa fa-address-card"
        },
        {
          href: "/about",
          title: "About",
          icon: "fa fa-tree"
        },
        {
          href: "/logout",
          title: "Logout",
          icon: "fa fa-right-from-bracket"
        },

      ],
      collapsed: true,
	 
    };
  },
  methods: {
    onItemClick(e, i) {
      console.log("onItemClick");
	  if (this.collapsed) {
		  this.appmargin = '0px';
	  } else {
		   this.appmargin = '240px';
	  }
	  
    },
    onCollapse(c) {
      console.log("onCollapse");
      this.collapsed = c;
	  console.log(this.appmargin);
	  if (this.appmargin == '240px' ) {
	     this.appmargin = '0px';
		  console.log('new margin' + this.appmargin);
	  }  else {
		   this.appmargin = '240px';
		    console.log('new margin' + this.appmargin);
	  }
	  
    }
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
</style>
