<template lang="pug">
    
    .edit_user

        form(method="POST" v-on:submit.prevent="" enctype="multipart/form-data")

            h1 Edit information

            input.info(type='text' :value="user.username" @input="setUsername"  placeholder='Username')

            input.info(type='text' :value="user.description" @input="setDescription" placeholder='Description')

            h1 Select avatar

            label.upload_profile
                .area
                    i.material-icons.edit_i photo_camera
                input(type="file" name="Avatar" @change="onFileChange($event)" ref='Avatar')

            h1 Select cover

            label.upload_profile
                .area
                    i.material-icons.edit_i photo_size_select_actual
                input(type='file' name='Cover' @change="onFileChange($event)" ref='Cover')

            button.save(v-if="save && !loading" @click="saveProfile") Save

            loading(v-if="loading")

</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
    
    methods: {

        ...mapActions('authentication', ['saveProfile', 'onFileChange']),
        ...mapMutations('authentication', ['setUsername', 'setDescription']),

    },

    computed: {

        ...mapState('authentication', ['user', 'loading']),
        ...mapGetters('authentication', ['save']),

    }

}
</script>
