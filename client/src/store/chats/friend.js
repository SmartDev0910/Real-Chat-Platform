/* eslint-disable */

import router from '@/router';
import Axios from '@/plugins/http';

export default {

    namespaced: true,

    state: {
        chat: null,
        onlineUsers: [],
        messages: [],
        modal: false,
    },

    actions: {

        getMessages({ state, rootState, commit }) {

            const userId = rootState.authentication.user._id;
            const url = `/messages/${rootState.route.name}/${state.chat.id}`;

            return Axios().get(url).then(({data}) => {

                if (data.messages.length === 0) return commit('welcomeMessage', userId);
                data.messages.reverse().forEach(data => commit('pushConversation', data));

            }).catch(() => commit('welcomeMessage', userId));
        },

        getChat({ state, rootState, commit, dispatch, getters }) {
            let chat = rootState.route.params.chat || getters.getChatByUserName;
            if (rootState.rooms.roomsDone && !chat) router.push('/home');
            if (chat) {
                commit('setChat', chat);
                dispatch('getMessages');
            }
        },

    },

    mutations: {
        toggleModal(state) {
            state.modal = !state.modal;
        },
        setChat(state, chat) {
            state.chat = {
                id: chat._id,
                name: (chat.user) ? chat.user.username : chat.name,
                avatar: (chat.user) ? chat.user.avatar : chat.avatar,
            };
            state.onlineUsers = [];
            state.messages = [];
        },
        setOnlineUsers(state, members) {
            state.onlineUsers = [];
            members.each(member => state.onlineUsers.push(member));
        },
        welcomeMessage(state, userId) {
            state.messages.push({
                welcome: true,
                id: userId,
                name: 'h i...',
                avatar: 'images/welcome.png',
                photo: null,
                text: 'Be the first to greet...',
                time: new Date()
            });
        },
        errorMessage(state, data) {
            state.messages.push({
                id: data.user._id,
                name: data.user.username,
                avatar: data.user.avatar,
                photo: data.photo,
                text: data.body,
                error: true
            });
        },
        pushConversation(state, data) {
            
            if (state.messages.length !== 0 && state.messages[0]['welcome']) state.messages.shift();

            state.messages.push({
                id: data.user._id,
                name: data.user.username,
                avatar: data.user.avatar,
                photo: data.photo,
                text: data.body,
                time: data.created_at
            });

        },
    },

    getters: {
        roomType(state, getters, rootState) {
            const routeName = rootState.route.name;
            if (routeName === "friend_chat") return 'friends';
            if (routeName === "group_chat") return 'groups';
        },
        friendName(state, getters, rootState) {
            const paramName = (getters.roomType === 'groups') ? 'group_name' : 'friend_name';
            return rootState.route.params[paramName].replace('_', ' ');
        },
        getChatByUserName(state, getters, rootState) {
            return rootState.rooms[getters.roomType].find(room => {
                const roomName = (room.user) ? room.user.username : room.name;
                return roomName === getters.friendName
            });
        },
    }

}