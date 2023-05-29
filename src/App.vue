<script>
import { defineComponent } from "vue"
import Header from "./shared/Header.vue"
import Footer from "./shared/Footer.vue"

export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer
  },
  setup() {
    return {}
  }
})
</script>

<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<style scoped lang="scss"></style>
