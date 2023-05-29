import { screens } from "./theme"
import { ref, onMounted } from "vue"
import { useEventListener } from "@vueuse/core"

export const useBreakpoint = () => {
  const matches = ref({})

  const update = () => {
    if (typeof window === "undefined") {
      return
    }

    Object.entries(screens).forEach(([name, size]) => {
      let mediaQuery
      if (typeof size === "string") {
        mediaQuery = `(min-width: ${size})`
      } else {
        if (size.max && size.min) {
          mediaQuery = `(max-width: ${size.max}) and (min-width: ${size.min})`
        } else {
          mediaQuery = `(max-width: ${size.max})`
        }
      }
      matches.value[name] = window.matchMedia(mediaQuery).matches
    })
  }

  onMounted(() => {
    update()
    useEventListener("resize", update, { passive: true })
  })

  return matches
}
