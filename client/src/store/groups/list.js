/* eslint-disable */

import Axios from '@/plugins/http';
import EventBus from '@/plugins/eventBus';

export default {

    namespaced: true,

    state: {
        groups: [],
        loading: false,
        errorLoad: false,
    },

    actions: {

        listGroups({ commit }, page = 1) {

            commit('setLoading', true);
            commit('setErrorLoad', false);

            page = (page === 0) ? 1 : page;

            return Axios().get(`/groups?page=${page}`).then(({ data }) => {
                commit('setGroups', data);
                commit('setLoading', false);
            })
            .catch(() => {
                commit('setLoading', false);
                commit('setErrorLoad', true);
            })   

        },

        deleteGroup({ state, commit, dispatch }, groupId) {

            commit('setLoading', true);
            commit('setErrorLoad', false);

            return Axios().delete(`/groups/${groupId}`).then(({ data }) => {
                commit('setLoading', false);
                const page = (state.groups.data.length === 1) ? state.groups.page - 1 : state.groups.page;
                dispatch('listGroups', page);
                EventBus.$emit('snotifyDone', data.status);
            })
            .catch(() => {
                commit('setLoading', false);
                EventBus.$emit('snotifyError', 'An error has occurred');
            })   

        },


    },

    mutations: {
        setGroups(state, groups) {
            state.groups = groups;
        },
        setLoading(state, boolean) {
            state.loading = boolean;
        },
        setErrorLoad(state, boolean) {
            state.errorLoad = boolean;
        },
    },

    getters: {
        notFound(state) {
            return (state.groups.data && state.groups.data.length === 0);
        }
    },


}