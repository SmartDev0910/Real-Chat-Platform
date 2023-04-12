/* eslint-disable */

import Axios from '@/plugins/http';
import router from '@/router';

export default {

    namespaced: true,

    state: {
        users: [],
        loading: false,
        errorLoad: false,
        userProfile: undefined,
        defaultCover: 'images/default_cover.jpg'
    },

    actions: {

        getUsers({ commit }) {

            commit('setLoading', true);
            commit('setErrorLoad', false);

            return Axios().get('/profile').then(({ data }) => {
                commit('setUsers', data);
                commit('setLoading', false);
            })
            .catch(() => {
                commit('setLoading', false);
                commit('setErrorLoad', true);
            })   

        },

        getUser({ commit }, userId) {

            commit('setLoading', true);
            commit('setErrorLoad', false);

            return Axios().get(`/profile/get/${userId}`).then(({ data }) => {
                if (!data) return router.push('/profile');
                commit('setUserProfile', data);
                commit('setLoading', false);
            })
            .catch(() => {
                commit('setLoading', false);
                commit('setErrorLoad', true);
                router.push('/profile');
            })   

        },

    },

    mutations: {
        setUsers(state, users) {
            users.sort(() => Math.random() - 0.5);
            if (users.length >= 8) users = users.slice(0, 8);
            state.users = users;
        },
        setUserProfile(state, user) {
            state.userProfile = user
        },
        setLoading(state, boolean) {
            state.loading = boolean;
        },
        setErrorLoad(state, boolean) {
            state.errorLoad = boolean;
        },
    },

    getters: {
        records(state) {
            return (state.users.length !== 0);
        }
    },

}