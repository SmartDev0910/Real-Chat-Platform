/* eslint-disable */

import Axios from '@/plugins/http';
const arraySort = require('array-sort');

export default {

    namespaced: true,

    state: {
        privateList: true,
        friends: [],
        groups: [],
        friendsId: [],
        groupsId: [],
        rooms: {
            friends: [],
            groups: [],
        },
        loading: false,
        roomsDone: false,
    },

    actions: {

        chats({ commit }) {

            commit('setLoading', true);

            return Axios().get('/chats').then(({ data }) => {
                commit('setRooms', data);
                commit('setRoomsDone');
                commit('setLoading', false);
            })
            .catch(() => {
                commit('setLoading', false);
            })   

        },

        toggle({ state, commit }) {
            commit('setPrivateList', !state.privateList)
        },

        changeTo({ commit, dispatch }, data) {
            dispatch('chats');
            if (data.type === 'private') return commit('setPrivateList', true);
            if (data.type === 'group') return commit('setPrivateList', false);
        }

    },

    mutations: {
        setRooms(state, data) {
            const friends = arraySort(data.friends, 'message.created_at').reverse();
            const groups = arraySort(data.groups, 'message.created_at').reverse();
            state.friendsId = data.friendsId;
            state.groupsId = data.groupsId;
            [state.friends, state.groups] = [friends, groups];
            [state.rooms.friends, state.rooms.groups] = [friends, groups];
        },
        setPreviewMessageAndPushUp(state, data) {
            const chatType = (data.type === 'friends') ? 'friend_chat' : 'group_chat';
            state.privateList = (data.type === 'friends') ? true : false;
            let i = state.rooms[data.type].findIndex(room => room._id === data.message[chatType]);
            let room = state.rooms[data.type][i];
            room.message = data.message;
            state.rooms[data.type].splice(i, 1);
            state.rooms[data.type].splice(state.rooms[data.type].filter(room => !room.message).length, 0, room);
        },
        setFiltered(state, data) {
            [state.rooms.friends, state.rooms.groups] = [data.friends, data.groups];
        },
        setLoading(state, boolean) {
            state.loading = boolean;
        },
        setRoomsDone(state) {
            state.roomsDone = true;
        },
        setPrivateList(state, boolean) {
            state.privateList = boolean;
        },
    },


}