<script>
import { ref, computed, defineComponent } from "vue"
import gsap from "gsap"
import { useI18n } from "vue-i18n"
export default defineComponent({
  name: "Dropdown",
  props: {
    identifier: String,
    name: String,
    links: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { t, locale } = useI18n()

    const dropdownOpen = ref(false)
    const dropdownClass = props.identifier

    function toggleDropdown() {
      if (!dropdownOpen.value) {
        props.links.forEach((_, index) => {
          gsap.from(`.${dropdownClass}-item-${index}`, {
            opacity: 0,
            delay: 0.1 + index * 0.1,
            duration: 0.25,
            ease: "power3.in"
          })
        })
      } else {
        props.links.forEach((_, index) => {
          gsap.to(`.${dropdownClass}-item-${index}`, {
            opacity: 1,
            ease: "power3.in"
          })
        })
      }
      gsap.to(`.${dropdownClass}-menu`, {
        paddingBottom: dropdownOpen.value ? 0 : 5,
        paddingTop: dropdownOpen.value ? 0 : 5,
        height: dropdownOpen.value ? 0 : "auto",
        opacity: dropdownOpen.value ? 0 : 1,
        duration: 0.25,
        animation: "power3.in"
      })
      dropdownOpen.value = !dropdownOpen.value
    }
    return {
      t,
      locale,
      dropdownOpen,
      toggleDropdown,
      dropdownClass
    }
  }
})
</script>

<template>
  <div>
    <button @click="toggleDropdown" class="uppercase text-base">
      {{ name }}
    </button>
    <ul :class="dropdownClass + '-menu' + ' dropdown-menu'">
      <li
        v-for="(link, index) in links"
        :key="index"
        :class="dropdownClass + '-item-' + index + ' uppercase text-base'">
        <router-link :to="{ path: link.path }">
          {{ link.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.dropdown-menu {
  height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>
