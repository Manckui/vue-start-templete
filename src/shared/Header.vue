<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import Logo from "../assets/images/svg/logo.svg"
import MenuMobile from "../components/MenuMobile.vue"

export default defineComponent({
  name: "Header",
  components: {
    Logo,
    MenuMobile
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
  <div class="header flex items-center justify-between fixed top-0 z-50 w-full">
    <Logo />
    <MenuMobile />
  </div>
</template>

<style scoped lang="scss">
.header {
  height: $header;
  padding: 0 $gutter;
  background-color: $white;
  border-bottom: solid 1px $black;
}
</style>
