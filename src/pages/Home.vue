<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import Form from "../components/Form.vue"
import Text from "../components/Text.vue"
import Card from "../components/Card.vue"
import img from "../assets/images/default.jpg"
import BannerFullVue from "../components/BannerFull.vue"
import TextHighlighter from "../components/TextHighlighter.vue"

export default defineComponent({
  name: "Home",
  components: {
    Form,
    Text,
    Card,
    BannerFullVue,
    TextHighlighter
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
    <BannerFullVue
      :src="img"
      alt="img default"
      title="titolo banner home"
      buttonText="bottone banner" />
    <Card
      :src="img"
      alt="img default"
      title="titolo card"
      subtitle="subtitle card"
      buttonText="testo bottone"
      :texts="texts" />
    <Card
      :src="img"
      alt="img default"
      title="titolo card"
      subtitle="subtitle card"
      buttonText="testo bottone"
      :isReverse="true"
      :texts="texts" />
    <TextHighlighter
      title="titolo TextHighlighter"
      subtitle="subtitle TextHighlighter"
      buttonText="testo bottone"
      :texts="texts" />
    <Form button="invia" formTitle="form titolo" />
  </div>
</template>

<style scoped lang="scss">
.home {
  text-align: center;
  min-height: $height100vh;
  padding-top: calc(#{$header});
}
</style>
