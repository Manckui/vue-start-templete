<script>
import { ref, watchEffect, defineComponent } from "vue"
import { inView, animate } from "motion"

export default defineComponent({
  name: "Text",
  props: {
    text: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: "h1"
    },
    class: String
  },
  setup(props) {
    const textChart = [...props.text]
    const text = ref(null)
    watchEffect(() => {
      inView(text.value, ({ target }) => {
        const letter = target.querySelectorAll(".letter")
        letter.forEach((el, index) => {
          animate(
            el,
            { transform: "none", opacity: 1 },
            {
              duration: 0.15,
              delay: index * 0.1,
              easing: [0.17, 0.55, 0.55, 1]
            }
          )
        })
        return () => {
          letter.forEach((el) => {
            animate(
              el,
              {
                opacity: 0,
                transform: "translateY(100%)"
              },
              { duration: 0.1 }
            )
          })
        }
      })
    }, [])
    return {
      textChart,
      text
    }
  }
})
</script>

<template>
  <component :is="tag" ref="textChart" class="overflow-hidden" :class="class">
    <span ref="text">
      <span
        :key="i"
        v-for="(char, i) in textChart"
        class="letter"
        :class="{ 'mx-1': char === ' ' }">
        {{ char }}
      </span>
    </span>
  </component>
</template>

<style scoped lang="scss">
.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
}
</style>
