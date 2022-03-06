import { defineComponent } from "vue";

export default defineComponent({
    name: "sideMenu",
    data() {
        return {
            btns: {
                tree: 'active',
                survey: '',
                user: ''
            }
        }
    },
    methods: {
        onButtonClick(target: string) {
            this.btns.tree = '';
            this.btns.survey = '';
            this.btns.user = '';

            switch(target) {
                case 'tree':
                    this.btns.tree = 'active';
                    break;
                case 'survey':
                    this.btns.survey = 'active';
                    break;
                case 'user':
                    this.btns.user = 'active';
                    break;
            }

            this.$router.push('/' + target);
        }
    }
})
