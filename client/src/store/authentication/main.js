/* eslint-disable */

import Axios from '@/plugins/http';
import EventBus from '@/plugins/eventBus';
import register from './register';
import login from './login';
import logout from './logout';

export default {

    namespaced: true,
    
    state: {
        token: null,
        user: null,
        loading: false,
    },

    modules: {
        register,
        login,
        logout
    },

    actions: {

        saveProfile({ commit, state }) {

            commit('setLoading', true);

            return Axios().patch(`/profile/${state.user._id}`, {
                username: state.user.username,
                description: state.user.description,
            })
            .then(({ data }) => {
                commit('setLoading', false);
                EventBus.$emit('snotifyDone', data.status);
            })
            .catch(error => {
                commit('setLoading', false);
                let message = 'An error has occurred';
                if (error.response.status === 422) {
                    message = error.response.data.shift().message;
                    return EventBus.$emit('snotifyWarning', message);
                }
                EventBus.$emit('snotifyError', message);
            })   
        },

        onFileChange({ commit }, data) {
            let files = data.target.files || data.dataTransfer.files;
            if (!files.length) return;
            let reader = new FileReader();
            reader.onload = e => commit(`set${data.target['name']}`, e.target.result);
            reader.readAsDataURL(files[0]);
        },

    },

    mutations: {
        setUser(state, data) {
            if (data.token) state.token = data.token;
            state.user = data.user;
            localStorage.setItem('FreezedUser', JSON.stringify(data.user));
        },
        setUsername(state, e) {
            state.user.username = e.target.value;
        },
        setDescription(state, e) {
            state.user.description = e.target.value;
        },
        setAvatar(state, avatar) {
            state.user.avatar = avatar;
        },
        setCover(state, cover) {
            state.user.cover = cover;
        },
        resetUser(state) {
            state.user = JSON.parse(localStorage.getItem('FreezedUser'));
        },
        setLoading(state, boolean) {
            state.loading = boolean;
        },
    },

    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
        user(state) {
            return state.user;
        },
        userId(state) {
            if (state.user) return state.user._id;
        },
        save(state) {
           if (state.user) return (state.user.username.length >= 3 && state.user.description.length >= 5);
        },
        token(state) {
            if (state.token) return state.token;
        },
    }

}