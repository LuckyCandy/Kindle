
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')
const iView = require('iview')

import Vue from 'vue'
import router from './router.js'
import api from './api/index.js'

iView.Message.config({
    top: 50,
    duration: 3
})

Vue.use(iView)
Vue.prototype.$api = api

import 'iview/dist/styles/iview.css'

import App from './components/App.vue'

const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
