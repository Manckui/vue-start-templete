<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  name: "ContactUs",
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
  <div class="ContactUs">
    <h1>{{ t("router.contact.path") }}</h1>
  </div>
</template>

<style scoped lang="scss">
.ContactUs {
  text-align: center;
  min-height: $height100vhHeader;
  background-color: $gray;
}
</style>
