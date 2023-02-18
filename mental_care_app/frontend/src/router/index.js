import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import FormView from '../views/FormView.vue';
import ListView from '../views/ListView.vue';
//import store from '@/store/store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
    // beforeEnter: (to, from, next) => {
    //   if (!store.state.is_login) {
    //     next();
    //   }else{
    //     next();
    //   }
    // }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
    // beforeEnter: (to, from, next) => {
    //   if (!store.state.is_login) {
    //     next();
    //   }else{
    //     next(false);
    //   }
    // }
  },
  {
    path: '/form',
    name: 'form',
    component: FormView
    // beforeEnter: (to, from, next) => {
    //   console.log("beforeRouteEnter: ");
    //   if (!store.state.is_login) {
    //     next();
    //   }else{
    //     next(false);
    //   }
    // }
  },
  {
    path: '/list',
    name: 'list',
    component: ListView
    // beforeEnter: (to, from, next) => {
    //   if (!store.state.is_login) {
    //     next();
    //   }else{
    //     next(false);
    //   }
    // }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
