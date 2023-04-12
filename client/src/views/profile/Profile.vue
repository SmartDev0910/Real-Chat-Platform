<template lang="pug">
    
    transition(name="fade")
        .right(v-if="!errorLoad")
            .head

                h1
                    router-link(v-if="pathProfile && isAuthenticatedUser" to="/profile/edit")
                        i.material-icons edit_location

                    router-link(v-else-if="pathEdit" to="/profile")
                        i.material-icons arrow_back

                    router-link(v-else, to="/profile" @click.native="setUserProfile(user)")
                        i.material-icons arrow_back

                .info
                    p Profile
                    p.name {{ userProfile.username }}

            .profile_box
                .information
                    .widget(v-bind:class="{ widget_100: profileId }")
                        .cover
                            img(v-if="userProfile.cover" :src="userProfile.cover")
                            img(v-else, :src="defaultCover")

                            friendship(v-if="!isAuthenticatedUser" :profileUserId="userProfile._id")

                        avatar.photo(:username="userProfile.username", color="#fff", :src="userProfile.avatar", :size="100")

                        h1 {{ userProfile.username }}
                        h2 {{ userProfile.description }}

                    .users(v-if="!profileId")

                        router-view

                        div(v-if="pathProfile")

                            .list(v-for="(user, i) in users")

                                avatar.image(:username="user.username", color="#fff", :src="user.avatar", :size="50")
                                button.name(@click="setUserProfile(users[i])", v-bind:class="{ current_user: user._id === userProfile._id}")
                                    | {{ user.username }}

                            .list(v-if="!records")

                                avatar.image(username="!", color="#fff", :size="50", backgroundColor="#e57373")
                                button.name(@click="getUsers") You are the first user

                            .list(v-if="records")

                                button.random(@click="getUsers")
                                    i.material-icons cached


</template>

<script>
 
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
import Friendship from '@/components/rightSide/friends/friendship.vue';

export default {
    
    components: { Friendship },

    created() {
        this.getUsers();
        this.setUserProfile(this.user);
        if (this.profileId) this.getUser(this.profileId);
    },

    data() {
        return {
            profileId: this.$route.params.profileId,
        }
    },

    methods: {

        ...mapActions('profile', ['getUsers', 'getUser']),
        ...mapMutations('profile', ['setUserProfile']),

    },

    computed: {

        ...mapState('profile', ['users', 'records', 'userProfile', 'defaultCover', 'errorLoad']),
        ...mapState('authentication', ['user']),
        ...mapGetters('profile', ['records']),

        pathProfile() {
            return (this.$route.name === 'profile');
        },

        pathEdit() {
            return (this.$route.name === 'editProfile')
        },

        isAuthenticatedUser() {
            return (this.user._id === this.userProfile._id)
        }

    }

}

</script>

