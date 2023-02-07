import Vuex from 'vuex';
import SignupModule from './modules/SignupModule';
import LoginModule from './modules/LoginModule';

const store = new Vuex.Store({
    modules: {
        signupmodule: SignupModule,
        loginmodule: LoginModule
    }
});

export default store;