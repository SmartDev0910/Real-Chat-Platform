/* eslint-disable */

import Axios from '@/plugins/http';

export default {

    namespaced: true,

    state: {
        body: '',
        photo: null,
        uploadedPhoto: null,
    },

    actions: {

        send({ commit, state, rootState, getters }) {

            if (getters.invalid) return;
            
            return Axios().post('/messages/send', {
                body: state.body,
                photo: state.uploadedPhoto,
                roomName: rootState.route.name,
                chatId: rootState.chats.friend.chat.id,
            })
            .then(() => {
                commit('resetData');
            }).catch(() => {
                commit('chats/friend/errorMessage', {
                    user: rootState.authentication.user,
                    photo: state.photo,
                    body: state.body,
                }, { root: true });
                commit('resetData');
            });
            
        },

        onFileChange({ state, commit }, data) {
            let files = data.target.files || data.dataTransfer.files;
            if (!files.length) return;
            let reader = new FileReader();
            reader.onload = e => {
                commit('setPhoto', e.target.result);
                document.getElementById("msg").focus();
            };
            reader.readAsDataURL(files[0]);
        },

    },

    mutations: {
        setBody(state, e) {
            state.body = e.target.value;
        },
        resetData(state) {
            state.body = '';
            state.photo = null;
            state.uploadedPhoto = null;
        },
        resetPhoto(state) {
            state.photo = null;
            state.uploadedPhoto = null;
        },
        setPhoto(state, photo) {
            state.photo = photo;
        },
        setUploadedPhoto(state, photo) {
            state.uploadedPhoto = photo;
        },
    },

    getters: {
        invalid(state) {
            if (state.photo) return false;
            return (state.body.length < 2);
        },
    },

}