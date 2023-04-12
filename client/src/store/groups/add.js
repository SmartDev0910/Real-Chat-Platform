/* eslint-disable */

import Axios from '@/plugins/http';
import EventBus from '@/plugins/eventBus';

export default {

    namespaced: true,

    state: {
        avatar: null,
        groupName: '',
        friends: [],
        selectedUsers: [],
        selectedIds: [],
        loading: false,
    },

    actions: {

        getFriends({ commit }) {

            commit('setLoading', true);

            return Axios().get(`/groups/friends`).then(({ data }) => {
                commit('setFriends', data.friends);
                commit('setLoading', false);
            })
            .catch(() => {
                EventBus.$emit('snotifyError', 'Could not load friend list');
                commit('setLoading', false);
            })   

        },

        addGroup({ commit, state }) {

            commit('setLoading', true);

            return Axios().post('/groups/create', {
                name: state.groupName,
                usersId: state.selectedIds,
                avatar: state.avatar,
            })
            .then(({ data }) => {
                commit('setLoading', false);
                commit('reset');
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

    },

    mutations: {
        setGroupName(state, e) {
            state.groupName = e.target.value;
        },
        setFriends(state, friends) {
            state.friends = friends;
        },
        setSelectedUsers(state, selectedUsers) {
           state.selectedUsers = selectedUsers;
        },
        setSelectedIds(state, selectedIds) {
            state.selectedIds = selectedIds;
        },
        setLoading(state, boolean) {
            state.loading = boolean;
        },
        reset(state) {
            state.groupName = '';
            state.selectedIds = [];
            state.avatar = null;
            state.selectedUsers = [];
        },
    },

    getters: {
        highlightAvatar(state) {
            return (state.groupName === '') ? '#EEEEEE' : null;
        },
        buttonDisabled(state) {
            return (state.groupName.length < 3);
        }
    }


}