<template lang="pug">

    .wrap

        router-link.navigate(to='#')
            i.material-icons arrow_back

        .left
            Left

        .right
            router-view(:key='$route.fullPath')

        vue-snotify

</template>

<script>

import {  mapState, mapMutations } from 'vuex';
import Left from '@/components/leftSide/Left.vue';
import EventBus from '@/plugins/eventBus';

export default {

  components: { Left },

  watch: {
    '$route' (to, from) {
        if (from.name === 'editProfile') this.resetUser();
    },
  },

  created() {
    this.snotifyDone();
    this.snotifyError();
    this.snotifyWarning()
  },

  methods: {
    snotifyDone() {
      EventBus.$on('snotifyDone', msg => this.$snotify.success(msg, 'Done'));
    },
    snotifyError() {
      EventBus.$on('snotifyError', msg => this.$snotify.error(msg, 'Oups'));
    },
    snotifyWarning() {
      EventBus.$on('snotifyWarning', msg => this.$snotify.warning(msg, 'Validation'));
    },
    ...mapMutations('authentication', ['resetUser']),
  },
};
</script>
