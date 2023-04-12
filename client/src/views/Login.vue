<template lang="pug">

    .auth
        h2 Login
        .form
            input(
                type="email"
                placeholder="Email"
                :value="email"
                @input="setEmail"
                )
            input(
                type="password"
                placeholder="Password"
                :value="password"
                @input="setPassword"
                )

            button(@click="login") Login

            span(:value="error") {{ error }}

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {

  methods: {

    ...mapMutations('authentication/login', ['setEmail', 'setPassword']),

    ...mapActions('authentication/login', ['login']),

  },

  computed: {

    ...mapState('authentication/login', ['email', 'password', 'error']),

  },

};
</script>
