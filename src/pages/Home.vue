<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  name: "Home",
  components: {},
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
  <div class="home">
    <h1>{{ t("pages.home.title") }}</h1>
  </div>
</template>

<style scoped lang="scss">
.home {
  text-align: center;
  min-height: $height100vh;
  padding: 0 $gutter;
  padding-top: $header;
}
</style>
