<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import Form from "../components/Form.vue"
import Text from "../components/Text.vue"

export default defineComponent({
  name: "Home",
  components: {
    Form,
    Text
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
    <Text text="home pages" tag="h1" class="text-2xl uppercase" />
    <Form button="invia" formTitle="form titolo" />
  </div>
</template>

<style scoped lang="scss">
.home {
  text-align: center;
  min-height: $height100vh;
  padding: 0 $gutter;
  padding-top: calc(#{$header} + #{$gutter});
}
</style>
