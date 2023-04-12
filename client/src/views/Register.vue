<template lang="pug">

    .auth
        h2 Register
        .form
            input(
                type="email"
                placeholder="Email"
                :value="email"
                @input="setEmail"
                )
            input(
                type="text"
                placeholder="Username"
                :value="username"
                @input="setUsername"
                )
            input(
                type="password"
                placeholder="Password"
                :value="password"
                @input="setPassword"
                )
            input(
                type="password"
                placeholder="Confirm your password"
                :value="confirmedPassword"
                @input="setConfirmedPassword"
                )

            button(@click="register") Register

            span(:value="error") {{ error }}

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {

  methods: {

    ...mapMutations('authentication/register', [
      'setEmail',
      'setUsername',
      'setPassword',
      'setConfirmedPassword',
    ]),

    ...mapActions('authentication/register', [
      'register',
    ]),

  },

  computed: {

    ...mapState('authentication/register', [
      'email',
      'username',
      'password',
      'confirmedPassword',
      'error',
    ]),

  },

};
</script>
