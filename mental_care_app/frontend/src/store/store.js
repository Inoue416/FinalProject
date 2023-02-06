import Vuex from 'vuex';
import SignupModule from './modules/SignupModule';

const store = new Vuex.Store({
    modules: {
        signupmodule: SignupModule
    }
});

export default store;