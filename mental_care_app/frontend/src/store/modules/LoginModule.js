import axios from 'axios';
import * as validators from '../../validators/SignupValidator.js';
const state = {
    email: {
        value: "",
        message: "",
        is_ok: false
    },
    password: {
        value: "",
        message: "",
        is_ok: false
    },
    button: false
};

const getters = {
    getEmail(state) {
        return state.email;
    },
    getPassword(state) {
        return state.password;
    },
    getButton(state) {
        return state.button;
    }
}

const actions = {
    async sendApi(context) {
        try{
            const api_res = await axios.post(
                "http://127.0.0.1:5000/api/login", {
                    email: context.state.email.value,
                    password: context.state.password.value
                });
            console.log(api_res);
            const res = api_res.data.message;
            console.log(res);
        }catch(error) {
            console.log(error);
        }
    },
    inputForm(context, input) {
        context.commit("setForm", input);
    }
};

const mutations = {
    setForm(state, input){
        let res = "";
        if (input.key == 'email') {
            res = validators.emailValidator(input.value);
            if (res === null) {
                state.email.is_ok = false;
                state.email.message = '必須の項目です';
            }else if (res) {
                state.email.is_ok = true;
                state.email.message = 'OK';
            }else {
                state.email.is_ok = false;
                state.email.message = '入力にエラーがあります';
            }
        }
        else if (input.key == 'password') {
            res = validators.passwordValidator(input.value);
            if (res === null) {
                state.password.is_ok = false;
                state.password.message = '必須項目です';
            }else if (res) {
                state.password.is_ok = true;
                state.password.message = 'OK';
            }else {
                state.password.is_ok = false;
                state.password.message = '入力にエラーがあります';
            }
        }
        state[input.key].value = input.value;
        let count = 0;
        for (const idx in state) {
            console.log(state[idx]);
            if (idx == "button"){ continue; }
            if (state[idx].is_ok){ continue; }
            count+=1;
            break;
        }
        if (count <= 0) { state.button = true; }
    }
};

const LoginModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default LoginModule;