<script>
import { defineComponent, computed, watchEffect, ref } from "vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  name: "ButtonRoute",
  props: {
    path: String,
    class: String,
    text: String,
    href: String
  },
  setup(props) {
    const { t, locale } = useI18n()
    const path = computed(() => {
      return `/${locale.value}/${props.path}`
    })

    return {
      path,
      t,
      locale
    }
  }
})
</script>

<template>
  <a
    v-if="href"
    :href="href"
    target="_blank"
    class="cursor-pointer uppercase text-base button-animation-line"
    :class="class">
    {{ text }}
  </a>
  <router-link
    v-else
    :to="{
      path: path
    }"
    class="cursor-pointer uppercase text-base button-animation-line"
    :class="class">
    {{ text }}
  </router-link>
</template>

<style scoped lang="scss"></style>
