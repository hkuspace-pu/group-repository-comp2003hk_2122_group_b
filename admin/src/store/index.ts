import { createStore } from 'vuex'

export default createStore({
    state: {
        treeSideButton: 'active',
        surveySideButton: '',
        userSideButton: ''
    },
    mutations: {
        changeSideButton(state, target) {
            state.treeSideButton = '';
            state.surveySideButton = '';
            state.userSideButton = '';

            if(target === 'tree') {
                state.treeSideButton = 'active'; 
            }
            if(target === 'survey') {
                state.surveySideButton = 'active'; 
            }
            if(target === 'user') {
                state.userSideButton = 'active'; 
            }
        }
    },
    actions: {
    },
    modules: {
    }
})
