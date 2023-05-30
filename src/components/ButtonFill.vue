<script>
import { defineComponent, watchEffect, ref } from "vue"

export default defineComponent({
  name: "ButtonFill",
  props: {
    type: String,
    text: String,
    class: String,
    href: String,
    to: String,
    path: String,
    click: Function
  },
  setup(props) {
    return {}
  }
})
</script>

<template>
  <div v-if="href" :class="class">
    <a
      :href="href"
      class="button px-4 py-2 text-sm text-center w-full uppercase">
      <span>{{ text }}</span>
    </a>
  </div>
  <div v-else-if="to" :class="class">
    <router-link
      :to="to"
      class="button px-4 py-2 text-sm text-center w-full uppercase">
      <span>{{ text }}</span>
    </router-link>
  </div>
  <div v-else :class="class">
    <button
      @click="click"
      :type="type"
      class="button px-4 py-2 text-sm text-center w-full uppercase">
      <span>{{ text }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.button {
  background: $gray;
  color: $black;
  max-width: 30rem;
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
