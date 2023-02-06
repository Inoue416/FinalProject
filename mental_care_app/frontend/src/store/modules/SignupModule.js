//import axios from 'axios';
const state = {
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    button: false
};

const getters = {
    getUserName(state) {
        return state.username;
    },
    getEmail(state) {
        return state.email;
    },
    getPassword(state) {
        return state.password;
    },
    getPasswordConfirm(state) {
        return state.password_confirm;
    },
    getButton(state) {
        return state.button;
    }
}

const actions = {
    // async registor(context) {
    //     try{
    //         const api_res = await axios.post(
    //             "http://127.0.0.1:5000/api/registor", {
    //                 username: context.state.username,
    //                 email: context.state.email,
    //                 password: context.state.password,
    //                 password_confirm: context.state.password_confirm
    //             });
    //         const res = api_res.response;
    //         console.log(res);
    //     }catch(error) {
    //         console.log(error);
    //     }
    // },
    inputForm(context, input) {
        context.commit("setForm", input);
    }
};

const mutations = {
    registor(state, response) {
        if (response === 'success'){
            state.username = "";
            state.email = "";
            state.password = "";
            state.password_confirm = "";
        }
    },
    setForm(state, input){
        state[input.key] = input.value;
    }
};

const SignupModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default SignupModule;