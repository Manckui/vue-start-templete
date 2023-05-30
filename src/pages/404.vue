<script>
import { ref, defineComponent, computed, onMounted } from "vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  name: "404",
  setup() {
    const { t, locale } = useI18n()

    return {
      t,
      locale
    }
  }
})
</script>

<template>
  <div
    class="container-404 fixed top-0 left-0 z-50 w-full flex items-center justify-center flex-col space-y-4">
    <h1 class="uppercase text-xl">404 page not found.</h1>
    <router-link
      class="px-4 py-2 uppercase"
      :to="{
        path: `/`
      }">
      torna alla home
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.container-404 {
  background-color: $black;

  height: $height100vh;
}

h1 {
  color: $white;
}

a {
  background-color: $white;
}
</style>
