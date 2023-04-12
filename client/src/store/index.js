
import presistedState from 'vuex-persistedstate';
import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './authentication/main';
import rooms from './rooms/main';
import groups from './groups/main';
import profile from './profile/main';
import chats from './chats/main';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: '/api',
  },
  modules: {
    authentication,
    rooms,
    groups,
    profile,
    chats,
  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    presistedState({
      key: 'chatApp-Adonis',
      paths: ['authentication'],
    }),
  ],
});
