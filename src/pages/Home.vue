<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import Form from "../components/Form.vue"
import Text from "../components/Text.vue"
import Card from "../components/Card.vue"
import img from "../assets/images/default.jpg"

export default defineComponent({
  name: "Home",
  components: {
    Form,
    Text,
    Card
  },
  setup() {
    const { t, locale } = useI18n()
    const texts = [
      { text: "lorem ipsum lorem ipsum" },
      { text: "lorem ipsum lorem ipsum" }
    ]
    return {
      t,
      locale,
      img,
      texts
    }
  }
})
</script>

<template>
  <div class="home">
    <Text text="home pages" tag="h1" class="text-2xl uppercase" />
    <Card
      :src="img"
      alt="img default"
      title="titolo card"
      subtitle="subtitle card"
      :texts="texts" />
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
