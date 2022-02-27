import { mapGetters } from "vuex";
export default {
    data() {
        return {
            mode: undefined,
            survey_id: undefined
        }
    },
    computed: {
        ...mapGetters(["isLoggedIn"])
    }
};
