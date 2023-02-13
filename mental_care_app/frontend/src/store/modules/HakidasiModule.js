import { textAreaValidator, isTextLength } from "../../validators/TextAreaValidator";
import router from "@/router";

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
        // API通信
        console.log("POST 送信");
        context.commit("success");
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
        state.error_message = message;
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