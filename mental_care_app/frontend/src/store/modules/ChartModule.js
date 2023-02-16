import axios from "axios";


const state = {
    items: [],
    error_message: ""
}

const getters = {
    getData(state){
        return state.items;
    },
    getErrorMessage(state) {
        return state.error_message;
    }
}

const actions = {
    async setData(context, key) { // IF: keyで制御できるようにしたい(とりあえずは全てをとってくる:all)
        try{
            console.log(key);
            const api_res = await axios.get(
                'http://127.0.0.1:5000/api/get_data/'+key,
            );
            const res = api_res.data.items;
            console.log(api_res.data.message);
            console.log(res);
            context.commit("setData", res);
        } catch(error) {
            console.log(error);
            console.log("サーバーにアクセスできませんでした。");
            context.commit("setErrorMessage", "サーバーに接続できませんでした");
        }
    }
}

const mutations = {
    setData(state, items){
        state.items = items;
    },
    setErrorMessage(state, message) {
        state.error_message = message;
    }
}

const ChartModule = {
    namespaced: true,
    state,
    getters, 
    actions,
    mutations
}

export default ChartModule;