<template lang="pug">
    
    .friends
        div(v-if="!loading")
            .style_friend.add_friend

                button(v-if="status == 'not_friends'", @click='addFriend')
                    i.material-icons person_add

                button.green(v-if="status == 'pending'", @click='acceptFriend')
                    i.material-icons done_all

                button.green(v-if="status == 'waiting'")
                    i.material-icons near_me

                button.accepted(v-if="status == 'friends'")
                    i.material-icons favorite

            .style_friend.delete_friend(v-if="status != 'not_friends'")

                button.orange(@click="rejectFriend")
                    i.material-icons clear

        loading(v-if="loading", :normal="false")

</template>

<script>

import Axios from '@/plugins/http';
import { mapState } from 'vuex';

export default {

    props: ['profileUserId'],

    watch: {
        profileUserId() { this.relationshipStatus() }
    },

    created() {
        this.updateStatus();
    },
    
    data() {
        return { 
            status: '',
            loading: false,
        }
    },

    methods: {

        relationshipStatus() {

            this.loading = true;

            return Axios().get(`/friends/check/${this.profileUserId}`).then(({ data }) => {
                this.status = data.status;
                this.loading = false;
            })
            .catch(() => this.loading = false) 
        },

        addFriend() {

            this.loading = true;

            return Axios().post(`/friends/add/${this.profileUserId}`).then(({ data }) => {
                this.status = data.status;
                this.loading = false;
            })
            .catch(() => this.loading = false) 
        },
        
        acceptFriend() {

            this.loading = true;

            return Axios().post(`/friends/accept/${this.profileUserId}`).then(({ data }) => {
                this.status = data.status;
                this.loading = false;
            })
            .catch(() => this.loading = false) 
        },
        
        rejectFriend() {

            this.loading = true;

            return Axios().delete(`/friends/reject/${this.profileUserId}`).then(({ data }) => {
                this.status = data.status;
                this.loading = false;
            })
            .catch(() => this.loading = false) 
        },   

        updateStatus() {
            this.relationshipStatus();
            this.$pusher.subscribe(`user${this.user._id}`).bind('friendship', () => this.relationshipStatus());
        }

    },

    computed: {

        ...mapState('authentication', ['user']),        

    }

}

</script>
