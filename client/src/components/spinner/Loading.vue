<template lang="pug">

    div(v-bind:class="normal ? 'normal' : 'top'")
        span.dot
        span.dot
        span.dot

</template>

<style scoped>
    .top {
        position: absolute;
        top: 10%;
        right: 0;
        transform: translate(-50%, -50%);
    }
    .normal {
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .dot {
        width: 7px;
        height: 7px;
        background-color: #FFFFFF;
        border: 2px solid #009688;
        border-radius: 50%;
        float: left;
        margin: 0 5px;
        transform: scale(0);
        animation: fx 1000ms ease infinite 0ms;
    }
    .dot:nth-child(2) {
        animation: fx 1000ms ease infinite 300ms;
    }
    .dot:nth-child(3) {
        animation: fx 1000ms ease infinite 600ms;
    }
    @keyframes fx {
        50% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>

<script>
export default {
  props: {
    normal: {
      default: true,
      type: Boolean,
    },
  },
};
</script>
