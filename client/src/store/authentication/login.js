/* eslint-disable */

import Axios from '@/plugins/http';
import router from '@/router';

export default {

    namespaced: true,
    
    state: {
        email: null,
        password: null,
        error: null,
    },

    actions: {

        login({ commit, state }) {
            return Axios().post('/auth/login', {
                email: state.email,
                password: state.password,
            })
            .then(({ data }) => {
                commit('authentication/setUser', data, { root: true });
                commit('reset');
                router.push('/home');
            })
            .catch(error => {
                let message = 'An error has occurred';
                if (error.response.status === 401) message = error.response.data.shift().message;
                commit('setError', message);
            })   
        },

    },

    mutations: {
        setEmail(state, e) {
            state.email = e.target.value;
        },
        setPassword(state, e) {
            state.password = e.target.value;
        },
        setError(state, error) {
            state.error = error;
        },
        reset(state) {
            [state.email, state.password, state.error] = [null, null, null]
        }
    },

}