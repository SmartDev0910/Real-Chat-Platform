/* eslint-disable */

import router from '@/router';

export default {

    namespaced: true,

    actions: {

        logout({ commit }) {
            const data = {
                token: null,
                user: null
            };
            commit('authentication/setUser', { data }, { root: true });
            router.push('/');
        }

    },

}