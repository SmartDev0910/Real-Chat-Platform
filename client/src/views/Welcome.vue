<template lang="pug">

    .welcome
        img(:src="image")
        p {{ description }}

</template>

<script>
export default {

  data() {
    return {
      image: 'images/udemy.png',
      description: 'Real-time chat app',
    };
  },

};
</script>
