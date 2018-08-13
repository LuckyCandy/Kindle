import Vue from 'vue'
import Router from 'vue-router'

import Layout from './components/LayoutComponent.vue'
import Login from './components/Auth/Login.vue'

Vue.use(Router)


const router = new Router({
    routes:[
        {
            path: '/login',
            component: Login
        },
        {
            path:'/',component: Layout,
            children: [
                {
                    path: ''
                }
            ]
        }
    ]
})

export default router