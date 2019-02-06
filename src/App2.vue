<template>
  <div>
    <button v-on:click="isOpened = !isOpened"> test </button>
    <Slide
      :isOpen="isOpened"
      right
      noOverlay
      disableEsc
      :burgerIcon="false"
      :crossIcon="false"
      disableOutsideClick
    >hello</Slide>
  </div>
</template>

<script>
import Slide from "./components/Menu/slide";

export default {
  data() {
    return {
      isOpened: true
    }
  },
  components: {
    Slide
  }
};
</script>

<style>
</style>
