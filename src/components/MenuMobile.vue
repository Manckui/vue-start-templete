<script>
import { ref, defineComponent, computed, onMounted } from "vue"
import gsap from "gsap"
import LanguageSwitch from "./LanguageSwitch.vue"
import Dropdown from "./Dropdown.vue"

export default defineComponent({
  name: "MenuMobile",
  components: {
    LanguageSwitch,
    Dropdown
  },
  setup() {
    const menuOpen = ref(false)
    const menuMobile = ref(null)

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
      animateMenu()
    }

    const animateMenu = () => {
      if (menuOpen.value) {
        gsap.to(menuMobile.value, {
          duration: 0.25,
          x: 0,
          ease: "power2.out"
        })
      } else {
        gsap.to(menuMobile.value, {
          duration: 0.25,
          x: "100%",
          ease: "power2.out"
        })
      }
    }

    return {
      menuOpen,
      menuMobile,
      toggleMenu
    }
  }
})
</script>

<template>
  <div class="relative">
    <button @click="toggleMenu" class="block">
      <div class="text-base uppercase">
        {{ menuOpen ? "Close" : "Menu" }}
      </div>
    </button>
    <div ref="menuMobile" class="menu w-full fixed z-10 left-0">
      <ul class="space-y-4">
        <li>
          <Dropdown
            name="dropdown-1"
            identifier="dropdown-1"
            :links="[
              { name: 'item-1', path: '' },
              { name: 'item-2', path: '' },
              { name: 'item-3', path: '' },
              { name: 'item-4', path: '' }
            ]" />
        </li>
        <li>
          <LanguageSwitch label="cambio lingua" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  height: $height100vh;
  background-color: $gray;
  transform: translateX(100%);
  top: $header;
  padding: $gutter;
}
</style>
