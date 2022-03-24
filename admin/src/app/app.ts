import { defineComponent } from "vue";
import sideMenu from "./../components/sideMenu/sideMenu.vue";
import { initializeApp } from "firebase/app";

export default defineComponent({
    name: "app",
    data() {
        return {
        }
    },
    created() {
        const firebaseConfig = {
            apiKey: "AIzaSyBlWTVgbIsS9RCB2AAzBn183z_xUViDgdU",
            authDomain: "tree-app-c9daf.firebaseapp.com",
            projectId: "tree-app-c9daf",
            storageBucket: "tree-app-c9daf.appspot.com",
            messagingSenderId: "294755854377",
            appId: "1:294755854377:web:2f9492648500df2ee81438",
            measurementId: "G-3WJ0TLBCDR",
            databaseURL: 'https://tree-app-c9daf.firebaseio.com'
        };
        initializeApp(firebaseConfig);
    },
    components: {
        sideMenu
    }
})
