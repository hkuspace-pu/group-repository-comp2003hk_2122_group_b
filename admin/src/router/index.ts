import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import tree from '../views/tree/tree.vue'
import survey from '../views/survey/survey.vue'
import user from '../views/user/user.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/tree',
        name: 'Tree',
        component: tree
    },
    {
        path: '/survey',
        name: 'Survey',
        component: survey
    },
    {
        path: '/user',
        name: 'User',
        component: user
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
