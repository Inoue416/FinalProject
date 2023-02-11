import axios from "axios";


const state = {
    items: [],
    now_pg: 0,
    max_pg: 1,
    error_message: ""
}

const getters = {
    getData(state){
        // if (state.items == []) { return []; }
        // if (state.now_pg > state.max_pg) { return state.items[0]; }
        // return state.items[state.now_pg];
        return state.items;
    },
    getErrorMessage(state) {
        return state.error_message;
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
            context.commit("setErrorMessage", "サーバーにアクセルできませんでした");
        }
    },
    changeData(context, page) {
        context.commit("changeData", page);
    }
}

const mutations = {
    setData(state, items){
        state.items = items;
        // let item = [];
        // let count = 0;
        let len = items.length;
        let page = parseInt(len / 10);
        if (len % 10 == 0) {
            console.log("割り切れる: "+page);
            page -= 1;
        }
        state.max_pg = page;
        state.now_pg = 0;
        
        // for (const it of items) {
        //     if (count == 10){
        //         state.items.push(item.concat());
        //         count = 0;
        //         item = [];
        //     }
        //     item.push(it);
        //     count += 1;
        // }
    },
    setErrorMessage(state, message) {
        state.error_message = message;
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