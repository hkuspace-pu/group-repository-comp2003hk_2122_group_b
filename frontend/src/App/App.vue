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
	  width='220px'
      :collapsed="collapsed"
	  @toggle-collapse="onCollapse"
      @item-click="onItemClick"
      
    />
  </div>
</template>

<script>
export default {
  name: "App",
  appmargin: '0px',
  data() {
    return {
     appmargin: this.appmargin,	
	 width: '220px',
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
          title: "New Member",
          icon: "fa fa-user-plus"
        },
        {
          href: "/login",
          title: "Login",
          icon: "fa fa-sign-in"
        },
        {
          href: "/searchtreepage",
          title: "Search Tree",
          icon: "fa fa-magnifying-glass"
        },
        {
          href: "/surveyrecordlist",
          title: "Your Survey Records",
          icon: "fa fa-list-check"
        },
        {
          href: "/individualsurveypage",
          title: "Survey Form",
          icon: "fa fa-file-invoice"
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
		   this.appmargin = '220px';
	  }
	  
    },
    onCollapse(c) {
      console.log("onCollapse");
      this.collapsed = c;
	  console.log(this.appmargin);
	  if (this.appmargin == '220px' ) {
	     this.appmargin = '0px';
		  console.log('new margin' + this.appmargin);
	  }  else {
		   this.appmargin = '220px';
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
