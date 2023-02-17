import { textAreaValidator, isTextLength } from "../../validators/TextAreaValidator";
import router from "@/router";
import axios from "axios";
import store from "../store";


const state = {
    error_message: "",
    button: false,
    text: "",
    error_message_text_area: "",
    max_length: 100
}

const getters = {
    getErrorMessage(state) {
        return state.error_message;
    },
    getButton(state) {
        return state.button;
    },
    getErrorMessageTextArea(state) {
        return state.error_message_text_area;
    }
}

const actions = {
    async sendApi(context) {
        // バリデーションを入れる
        if (!isTextLength(state.text, state.max_length)) {
            context.commit("checkText", state.text);
        }
        else if (!textAreaValidator(state.text)) {
            context.commit("checkText", state.text);
        }
        else{
            try{
                console.log("POST送信");
                const api_res = await axios.post(
                    "http://127.0.0.1:5000/api/classification",
                    {
                        text: state.text
                    }
                );
                const res = api_res.data.message;
                console.log(api_res.data.success);
                if (!api_res.data.success) { context.commit("setErrorArea", res); }
                else{
                    console.log(res);
                    context.commit("success");
                }
                
            }catch(error) {
                console.log(error);
                console.log("サーバーに接続できませんでした");
                context.commit("setErrorMessage", "サーバーに接続できませんでした");
            }
        }
    },
    setErrorArea(context, message) {
        context.commit("setErrorArea", message);
    },
    setErrorMessage(context, message) {
        context.commit("setErrorMessage", message);
    },
    checkText(context, text) {
        context.commit("checkText", text);
    }
}

const mutations = {
    setErrorMessage(state, message) {
        console.log(state.error_message_text_area);
        store.state.error_message.message = message;
        store.state.error_message.is_active = true;
    },
    setErrorArea(state, message) {
        state.error_message_text_area = message;
    }, 
    success(state) {
        state.error_message = "";
        state.button = false;
        state.text = "";
        router.push("/");
    },
    checkText(state, text){
        state.text = text;
        if (!isTextLength(text, state.max_length)) {
            state.error_message_text_area = "1～100文字以内で入力してください";
            state.button = false;
        }
        else if (!textAreaValidator(text)) {
            state.error_message_text_area = "使用できない文字が含まれています";
            state.button = false;
        }
        else {
            state.error_message_text_area = "";
            state.button = true;
        }
    }
}

const HakidasiModule = {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
};

export default HakidasiModule;