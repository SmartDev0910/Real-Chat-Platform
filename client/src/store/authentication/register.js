/* eslint-disable */

import Axios from '@/plugins/http';
import router from '@/router';

const initialState = () => {
    return {
        email: null,
        username: null,
        password: null,
        confirmedPassword: null,
        error: null,
    }
}

const state = initialState();

export default {

    namespaced: true,
    
    state,

    actions: {

        register({ commit, state  }) {
            return Axios().post('/auth/register', {
                email: state.email,
                username: state.username,
                password: state.password,
                password_confirmation: state.confirmedPassword
            })
            .then(({ data }) => {
                commit('authentication/setUser', data, { root: true });
                commit('reset');
                router.push('/home');
            })
            .catch(error => {
                let message = 'An error has occurred';
                if (error.response.status === 422) message = error.response.data.shift().message
                commit('setError', message)
            })   
        },

    },

    mutations: {
        setEmail(state, e) {
            state.email = e.target.value;
        },
        setUsername(state, e) {
            state.username = e.target.value;
        },
        setPassword(state, e) {
            state.password = e.target.value;
        },
        setConfirmedPassword(state, e) {
            state.confirmedPassword = e.target.value;
        },
        setError(state, error) {
            state.error = error;
        },
        reset(state) {
           Object.assign(state, initialState())
        }
    },

}