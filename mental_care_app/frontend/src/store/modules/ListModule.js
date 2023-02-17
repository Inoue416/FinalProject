import axios from "axios";
import store from "../store";

const state = {
    items: [],
    now_pg: 0,
    max_pg: 1,
}

const getters = {
    getData(state){
        return state.items;
    },
    getPageInfo(state){
        let pages = [];
        console.log("max page: "+state.max_pg);

        for (let i = 0; i < state.max_pg; i++){
            pages.push(i);
        }
        return pages;
    },
    getPageNow(state) {
        return state.now_pg;
    }
}

const actions = {
    async setData(context, key) {
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
    },
    changeData(context, page) {
        context.commit("changeData", page);
    }
}

const mutations = {
    setData(state, items){
        state.items = items;
        let len = items.length;
        let page = parseInt(len / 10);
        if (len % 10 == 0) {
            console.log("割り切れる: "+page);
            page -= 1;
        }
        state.max_pg = page;
        state.now_pg = 0;        
    },
    setErrorMessage(message) {
        store.state.error_message.message = message;
        store.state.error_message.is_active = true;
    },
    changeData(state, page) {
        console.log("Mutation: "+page);
        state.now_pg = page;
    }
}

const ListModule = {
    namespaced: true,
    state,
    getters, 
    actions,
    mutations
}

export default ListModule;