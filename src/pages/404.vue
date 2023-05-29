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
  <div>
    <div>
      <h1>404 page not found.</h1>
      <router-link
        :to="{
          path: `/`
        }">
        torna alla home
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
