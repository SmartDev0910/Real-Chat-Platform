<template lang="pug">
   
    transition(name='slide-fade') 
        .chat(v-if="chat")

            .head

                avatar.img(:username="chat.name" :src="chat.avatar" color="#fff")

                .info

                    p {{ chat.name }}
                    
                    p.online(v-if="onlineUsers.length > 1")
                        span(v-for="onlineUser in onlineUsers" v-if="user._id != onlineUser.id") {{ onlineUser.info.username }}
                            span.state.green &#8226; 

                    p.online(v-else) Offline
                        span.state.red &#8226;

            .chat_box

                .chat_content#chat

                    messages(:messages="messages")

                .modal(v-if="modal")

                    .container(v-if="!photo")
                        label.upload_photo
                            i.material-icons file_upload
                            input(type="file" name="photo" @change="onFileChange($event)" ref="photo")

                    .container(v-else)
                        .preview
                            img(:src="photo")
                            a(@click="resetPhoto")
                                i.material-icons clear

            send(:modal="modal")

</template>

<script>

import messages from '@/components/rightSide/chat/messages';
import send from '@/components/rightSide/chat/send';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {

    components: {
        messages,
        send,
    },

    watch: {
        roomsDone() {
            this.getChat();
        },
        chat: {
            handler() {
                this.listenRealTimeMessage();
            },
        },
        photo() {
            if (this.photo) this.setUploadedPhoto(Object.values(this.$refs.photo.files).shift());
        },
    },

    data() {
        return {
            onlineUsers: [],
        };
    },

    beforeRouteUpdate (to, from, next) {
        this.$pusher.unsubscribe(`presence-${this.$route.name}${this.chat.id}`);
        next();
    },

    beforeRouteLeave (to, from, next) {
        this.$pusher.unsubscribe(`presence-${this.$route.name}${this.chat.id}`);
        next();
    },

    mounted() {
        this.getChat();
    },

    methods: {
        ...mapActions('chats/friend', ['getMessages', 'getChat']),
        ...mapMutations('chats/friend', ['setChat', 'pushConversation']),
        ...mapActions('chats/sendMessage', ['onFileChange']),
        ...mapMutations('chats/sendMessage', ['resetPhoto', 'setUploadedPhoto']),

        listenRealTimeMessage() {
            const sub = this.$pusher.subscribe(`presence-${this.$route.name}${this.chat.id}`)
            sub.bind('newMessage', message => this.pushConversation(message));
            sub.bind('pusher:subscription_succeeded', () => this.pushOnlineUsers(sub.members));
            sub.bind('pusher:member_added', () => this.pushOnlineUsers(sub.members));
            sub.bind('pusher:member_removed', () => this.pushOnlineUsers(sub.members));
        },

        pushOnlineUsers(members) {
            this.onlineUsers = [];
            members.each(member => this.onlineUsers.push(member));
        },

    },
    
    computed: {
        ...mapState('chats/friend', ['chat', 'messages', 'modal']),
        ...mapState('chats/sendMessage', ['photo', 'uploadedPhoto']),
        ...mapState('rooms', ['roomsDone']),
        ...mapState('authentication', ['user']),
        ...mapGetters('chats/friend', ['friendName']),
    }

}
</script>
