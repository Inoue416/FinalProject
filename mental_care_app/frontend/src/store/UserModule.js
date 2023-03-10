import router from "@/router";

const state = {
    user_id: 3,
    username: "井上優也",
    success_message: "",
    error_message: ""
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
    },
    closeMessage(context, key){
        context.commit("closeMessage", key);
    }
}

const mutations = {
    logout(state){
        state.user_id = null;
        state.username = "";
        router.push("/login")
    },
    setSuccessMessage(state, message) {
        state.success_message = message;
    },
    setErrorMessage(state, message) {
        state.error_message = message;
    },
    closeMessage(state, key){
        state[key] = "";
    }
}

const UserModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

export default UserModule;