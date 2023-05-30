<script>
import { defineComponent, watchEffect, ref } from "vue"
import { inView, animate } from "motion"

export default defineComponent({
  name: "Button",
  props: {
    type: String,
    text: String,
    class: String
  },
  setup(props) {
    return {}
  }
})
</script>

<template>
  <button
    :type="type"
    :class="class"
    class="button px-4 py-2 text-base text-center w-full uppercase">
    <span>{{ text }}</span>
  </button>
</template>

<style scoped lang="scss">
.button {
  background: $gray;
  color: $black;
  max-width: 20rem;
  margin: 0 auto;
  @screen lg {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease-in-out;
    &:hover {
      animation: rotate624 0.7s ease-in-out both;
      background: $black;
      & span {
        color: $gray;
        animation: storm1261 0.7s ease-in-out both;
        animation-delay: 0.06s;
      }
    }
  }
}
</style>
