<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"
import gsap from "gsap"
import LanguageSwitch from "./LanguageSwitch.vue"

export default defineComponent({
  name: "MenuMobile",
  components: {
    LanguageSwitch
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
          duration: 0.3,
          x: 0,
          ease: "power2.out"
        })
      } else {
        gsap.to(menuMobile.value, {
          duration: 0.3,
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
      <div class="burger relative w-8 h-4 flex items-center">
        <span class="bar"></span>
      </div>
    </button>
    <div ref="menuMobile" class="menu w-full fixed z-10 left-0">
      <ul class="list">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <div>
        <LanguageSwitch />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.burger {
  .bar {
    height: 1px;
    width: 100%;
    content: "";
    background-color: $black;
    display: block;
    &::after {
      top: 0;
    }
    &::before {
      bottom: 0;
    }
    &::before,
    &::after {
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: $black;
      content: "";
    }
  }
}

.menu {
  height: $height100vh;
  background-color: $gray;
  transform: translateX(100%);
  top: $header;
  padding: $gutter;
}

.list {
  color: $white;
}
</style>
