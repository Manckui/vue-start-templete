<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { paths } from "../paths.js"

export default defineComponent({
  name: "LanguageSwitch",
  setup() {
    const { t, locale } = useI18n()
    const router = useRouter()

    const changeLanguage = (lang) => {
      const currentPath = router.currentRoute.value.path
      const basePath = currentPath.slice(3)

      const matchingAlias = Object.entries(paths).find(([, translations]) => {
        return (
          translations[locale.value].path === basePath ||
          (basePath.startsWith("/") &&
            translations[locale.value].path === basePath.slice(1))
        )
      })

      let newPath
      if (matchingAlias) {
        newPath = `/${lang}${matchingAlias[1][lang].path}`
      } else {
        newPath = `/${lang}${basePath}`
      }

      locale.value = lang
      router.push(newPath)
    }
    const langs = [
      {
        name: "IT",
        click: () => changeLanguage("it")
      },
      {
        name: "EN",
        click: () => changeLanguage("en")
      }
    ]
    return {
      t,
      locale,
      langs,
      changeLanguage
    }
  }
})
</script>

<template>
  <div>
    <div class="space-x-4">
      <button v-for="(lang, i) in langs" :key="`Lang${i}`" @click="lang.click">
        {{ lang.name }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  text-align: center;
  height: $header;
}
</style>
