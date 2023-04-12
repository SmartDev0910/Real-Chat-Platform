<template lang="pug">
    
    .chat_groups

        .data

            router-link(to="/groups/manage")
                i.material-icons arrow_back

            avatar.avatar(
                :username="groupName",
                color="#fff",
                :backgroundColor="highlightAvatar",
                :src="avatar",
                v-bind:class="{ avatar_shadow: groupName || avatar }"
            )

            h4  Edit Group

            hr

        loading(v-if="loading" :normal="false")

        form(v-on:submit.prevent="" method="POST" enctype="multipart/form-data")
        .group_input


            label.upload_avatar

                button.button_upload(v-if="!avatar" type='button')
                    i.material-icons backup

                button.button_upload(v-else  type='button')
                    i.material-icons clear

                input(
                    v-show="!avatar"
                    type="file"
                    name="avatar"
                    ref="avatarInput"
                )

            input.input_name(
                name="name"
                type="text"
                placeholder="Group name..."
                :value="groupName"
                @input="setGroupName"
            )

            button.button_send(
                type='button' 
                @click="saveGroup(groupId)" 
                v-bind:disabled="buttonDisabled"
                ) Save


        multiselect(
            track-by="_id"
            :multiple="true"
            label="username"
            :hide-selected="true"
            :close-on-select="false"
            :options="friends"
            placeholder="Select friends"
            :value="selectedUsers"
            @input="setSelectedUsers"
        )

</template>

<script>


import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';

export default {

    created() {
        this.getGroup(this.groupId);
    },

    data() {
        return {
            groupId: window.atob(this.$route.params.groupId),
        }
    },

    watch: {
        selectedUsers(value) {
            this.setSelectedIds(value.map(obj => obj._id));
        }
    },

    methods: {

        ...mapActions('groups/edit', ['getGroup', 'saveGroup']),
        ...mapMutations('groups/edit', [
            'setSelectedUsers',
            'setGroupName',
            'setSelectedIds'
            ]),

    },

    computed: {

        ...mapState('groups/edit', [
            'avatar', 
            'groupName', 
            'friends', 
            'loading',
            'selectedUsers'
            ]),
        ...mapGetters('groups/edit', ['highlightAvatar', 'buttonDisabled']),

    }

}
</script>
