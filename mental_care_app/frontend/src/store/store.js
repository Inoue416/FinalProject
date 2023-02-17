import Vuex from 'vuex';
import SignupModule from './modules/SignupModule';
import LoginModule from './modules/LoginModule';
import router from "@/router";
import ListModule from './modules/ListModule';
import HakidasiModule from './modules/HakidasiModule';
import ChartModule from './modules/ChartModule';
import axios from '../lib/axios';

// APIでログインの判定が帰ってくるのでその場合に合わせて処理をする
// ログインが切れていればusernameを空にする
// ログイン状態を管理するメンバを作る
const state = {
    username: "",
    is_login: false,
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
    async logout(context){
        try{
            await axios.get("http://127.0.0.1:5000/api/logout");
            context.commit("logout");
        } catch(error) {
            context.commit("setErrorMessage", "サーバーに接続できませんでした");
            context.state.is_login = false;
        }
    },
    setSuccessMessage(context, message) {
        context.commit("setSuccessMessage", message);
    },
    setErrorMessage(context, message) {
        context.commit("setErrorMessage", message);
    },
    closeSuccessMessage(context) {
        context.commit("closeSuccessMessage");
    },
    closeErrorMessage(context) {
        context.commit("closeErrorMessage");
    }
}

const mutations = {
    logout(state){
        state.user_id = null;
        state.username = "";
        state.is_login = false;
        router.push("/login");
    },
    setSuccessMessage(state, message) {
        state.success_message.message = message;
        state.success_message.is_active = true;
    },
    setErrorMessage(state, message) {
        state.error_message.message = message;
        state.error_message.is_active = true;
    },
    closeSuccessMessage(state) {
        state.success_message.message = "";
        state.success_message.is_active = false;
    },
    closeErrorMessage(state) {
        state.error_message.message = "";
        state.error_message.is_active = false;
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
        hakidasimodule: HakidasiModule,
        chartmodule: ChartModule
    }
});

export default store;