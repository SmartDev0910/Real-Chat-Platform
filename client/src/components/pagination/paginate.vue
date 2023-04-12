<template lang="pug">

    .pagination

        ul.numbers
            li
                a.prev(@click="nextPrev(Number(source.page) - 1)", :class="{ disable: disablePrev }") «

            li(v-for="page in pages")

                a(@click="navigate(page)", :class="{ current: source.page == page }") {{ page }}

            li
                a.next(@click="nextPrev(Number(source.page) + 1)", :class="{ disable: disableNext  }") »

</template>

<script>
export default {

  props: ['source'],

  data() {
    return {
      pages: [],
    };
  },

  watch: {
    source() {
      this.pages = Array.apply(null, { length: this.source.lastPage }).map((value, index) => index + 1);
    },
  },

  methods: {
    nextPrev(page) {
      if (page == 0 || page == this.source.lastPage + 1) return;
      this.navigate(page);
    },
    navigate(page) {
      this.$emit('navigate', page);
    },
  },

  computed: {
    disableNext() {
      return (
        this.source.page == this.source.lastPage 
        || 
        this.source.page == this.source.lastPage + 1
        );
    },
    disablePrev() {
      return (this.source.page == 1);
    }
  }

};
</script>
