import Vue from 'vue';
import Router from 'vue-router';
import Login from "./components/Login";
import Home from "./components/Home";

Vue.use(Router);

export default new Router({
    mode : "history",
    routes : [
        { path : '/login', component : Login },
        { path : '/', component : Home }
    ]
});