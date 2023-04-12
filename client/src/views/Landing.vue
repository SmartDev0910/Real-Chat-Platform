<template lang="pug">

  .home
    section(v-if='!isLoggedIn')
      router-link(to='/register') Register
      router-link(to='/login') Login

    section(v-if='isLoggedIn')
      span Welcome
      button(@click='logout') Logout

</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {

  methods: {

    ...mapActions('authentication/logout', [
      'logout',
    ]),

  },

  computed: {

    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),

  },

};

</script>
