<template lang="pug">
    
    form.send(method='POST' v-on:submit.prevent='' enctype='multipart/form-data')

        button(type='button' @click='toggleModal')

            i(v-bind:class="[modal ? 'green' : '', 'material-icons']") photo_camera

        .message
            input#msg(autocomplete='off' @keyup.enter='send' :value="body" @input="setBody" placeholder='Write a new message')

        button(type='button' @click="send")

            i(v-bind:class="[invalid ? '' : 'green', 'material-icons']") send

</template>

<script>

import { mapMutations, mapState, mapGetters, mapActions } from 'vuex';

export default {
    
     props: ['modal'],

     methods: {

        ...mapMutations('chats/sendMessage', ['setBody']),
        ...mapActions('chats/sendMessage', ['send']),
        ...mapMutations('chats/friend', ['toggleModal']),

     },

     computed: {
        ...mapState('chats/sendMessage', ['body']),
        ...mapGetters('chats/sendMessage', ['invalid']),
     }

}
</script>
