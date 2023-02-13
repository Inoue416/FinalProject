import Vuex from 'vuex';
import SignupModule from './modules/SignupModule';
import LoginModule from './modules/LoginModule';
import router from "@/router";
import ListModule from './modules/ListModule';
import HakidasiModule from './modules/HakidasiModule';

const state = {
    user_id: 3,
    username: "井上優也",
    success_message: {
        message: "",
        is_active: false
    },
    error_message: {
        message: "",
        is_active: false
    },
}

const getters = {
    getUserName(state) {
        return state.username;
    },
    getUserId(state) {
        return state.user_id;
    },
    getSuccessMessage(state) {
        return state.success_message;
    },
    getErrorMessage(state) {
        return state.error_message;
    }
}

const actions = {
    logout(context){
        context.commit("logout")
    },
    setSuccessMessage(context, message) {
        context.commit("setSuccessMessage", message);
    },
    setErrorMessage(context, message) {
        context.commit("setErrorMessage", message);
    }
}

const mutations = {
    logout(state){
        state.user_id = null;
        state.username = "";
        router.push("/login")
    },
    setSuccessMessage(state, message) {
        state.success_message.message = message;
        state.success_message.is_active = true;
    },
    setErrorMessage(state, message) {
        state.error_message.message = message;
        state.error_message.is_active = true;
    }
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        signupmodule: SignupModule,
        loginmodule: LoginModule,
        listmodule: ListModule,
        hakidasimodule: HakidasiModule
    }
});

export default store;