//import axios from 'axios';
import * as validators from '../../validators/SignupValidator.js';
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
        is_ok: false
    },
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
            }else if (res) {
                state.password.is_ok = true;
                state.password.message = 'OK';
            }else {
                state.password.is_ok = false;
                state.password.message = '入力にエラーがあります';
            }
        }
        else if (input.key == 'password_confirm') {
            res = validators.passwordConfirmValidator(input.value);
            if (res) {
                state.is_ok = true;
                state.message = "OK";
            }else {
                state.is_ok = false;
                state.message = "パスワード入力が一致していません";
            }
        }
        let count = 0;
        for (s in state) {
            if (s.is_ok){ continue; }
            count+=1;
            break;
        }
        if (count <= 0) { state.button = true; }
        state[input.key].value = input.value;
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