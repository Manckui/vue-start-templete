<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"

export default defineComponent({
  name: "Footer",
  components: {},
  setup() {
    return {}
  }
})
</script>

<template>
  <div class="footer">
    <p>Footer</p>
  </div>
</template>

<style scoped lang="scss">
.footer {
  text-align: center;
  background-color: $white;
  border-top: solid 1px $black;
}
</style>
