<template lang="pug">

    .search_container
        .search
            i.material-icons search
            input(type='text' placeholder='Search...' v-model="name" v-on:keyup="filter")

</template>

<script>

import { mapState } from 'vuex';

export default {

  data() {
    return {
      name: '',
    };
  },

  methods: {
    filter() {
      let type = 'private';

      const friends = this.friends.filter(f => f.user.username.match(new RegExp(this.name, 'i')));
      const groups = this.groups.filter(g => g.name.match(new RegExp(this.name, 'i')));

      type = (groups.length > 0 && groups.length > friends.length) ? 'group' : 'private';

      if (this.name === '') type = 'private';

      this.$eventBus.$emit('filter', { type, friends, groups });
    },
  },

  computed: {
    ...mapState('rooms', ['friends', 'groups']),
  },

};

</script>
