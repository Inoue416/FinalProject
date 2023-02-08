import axios from 'axios';
import * as validators from '../../validators/SignupValidator.js';
import router from '@/router/index.js';

const state = {
    username: {
        value: "",
        message: "",
        is_ok: false
    },
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
    password_confirm: {
        value: "",
        message: "",
        isActive: true,
        is_ok: false
    },
    button: false,
    error_message: ""
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
    },
    getErrorMessage(state) {
        return state.error_message;
    }
}

const actions = {
    async sendApi(context) {
        try{
            const api_res = await axios.post(
                "http://127.0.0.1:5000/api/registor", {
                    username: context.state.username.value,
                    email: context.state.email.value,
                    password: context.state.password.value,
                    password_confirm: context.state.password_confirm.value
                });
            const res = api_res.data.message;
            if (res == ""){
                context.commit("registor");
            }else{
                context.commit("setErrorMessage", res, "all");
            }
        }catch(error) {
            console.log(error);
        }
    },
    inputForm(context, input) {
        context.commit("setForm", input);
    },
    async checkEmail(context, key) {
        const api_res = await axios.post("http://127.0.0.1:5000/api/check_email", {
            email: context.state.email.value
        });
        const res = api_res.data.message;
        context.commit("setErrorMessage", res, key);
    }
};

const mutations = {
    setErrorMessage(state, message, key){
        if (key == "all"){
            for (const s in state){
                state[s].is_ok = false;
            }
        }
        else if (message != ""){
            state[key].is_ok = false;
            state.button = false;
        }
        state.error_message = message;
    },
    registor(state) {
        state.username.value = "";
        state.email.value = "";
        state.password.value = "";
        state.password_confirm.value = "";
        state.button = false;
        state.error_message = "";
        router.push("/");
    },
    setForm(state, input){
        let res = "";
        if (input.key == 'username') { // usernameのバリデーション
            res = validators.userNameValidator(input.value);
            if (res === null) { 
                state.username.is_ok = true;
                state.username.message = "OK"
            }else {
                state.username.is_ok = false;
                state.username.message = res;
            }
        }
        else if (input.key == 'email') {
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
                state.password_confirm.isActive = true;
            }else if (res) {
                state.password.is_ok = true;
                state.password.message = 'OK';
                state.password_confirm.isActive = false;
            }else {
                state.password.is_ok = false;
                state.password.message = '入力にエラーがあります';
                state.password_confirm.isActive = true;
            }
        }
        else if (input.key == 'password_confirm') {
            console.log("pass_confirm valid");
            res = validators.passwordConfirmValidator(state.password.is_ok, state.password.value, input.value);
            console.log(res);
            if (res === null) {
                state.password_confirm.is_ok = false;
                state.password_confirm.message = "上のパスワード欄にエラーがあります";
            }
            else if (res) {
                state.password_confirm.is_ok = true;
                state.password_confirm.message = "OK";
            }else {
                state.password_confirm.is_ok = false;
                state.password_confirm.message = "パスワード入力が一致していません";
            }
        }
        state[input.key].value = input.value;
        if (input.key == "password") {
            if (state.password.value == state.password_confirm.value && state.password.is_ok) {
                state.password_confirm.is_ok = true;
                state.password_confirm.message = "OK"
            }
            else {
                state.password_confirm.is_ok = false;
                state.password_confirm.message = "パスワード入力にエラーがあります";
            }
        }
        let count = 0;
        for (const idx in state) {
            console.log(state[idx]);
            if (idx == "button"){ continue; }
            if (idx == "error_message") {
                if (state[idx] == "") { continue; }
                else{ count+=1; continue; }
            }
            if (state[idx].is_ok){ continue; }
            count+=1;
            break;
        }
        if (count <= 0) { state.button = true; }
        else { state.button = false; }
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