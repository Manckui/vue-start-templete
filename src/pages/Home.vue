<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import Form from "../components/Form.vue"

export default defineComponent({
  name: "Home",
  components: {
    Form
  },
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
    <Form button="invia" formTitle="form titolo" />
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
