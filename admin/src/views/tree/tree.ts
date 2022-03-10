import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
    name: 'tree',
    data() {
        return {
        }
    },
    setup() {
        console.log("starLog...... tree setup")
        axios
            .get("https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/trees")
            .then(response => console.log('starLog http response', response))
    }
})
