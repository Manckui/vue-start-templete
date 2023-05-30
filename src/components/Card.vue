<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"
import { inView, animate } from "motion"

export default defineComponent({
  name: "Card",
  props: {
    src: String,
    alt: String,
    height: String,
    width: String,
    title: String,
    subtitle: String,
    texts: {
      type: Array,
      default: () => []
    },
    classTitle: String,
    classSubtitle: String,
    classText: String,
    classCard: String
  },
  setup(props) {
    const containerRef = ref(null)
    watchEffect(() => {
      inView(containerRef.value, ({ target }) => {
        const elements = target.querySelectorAll(".animation")
        const img = target.querySelectorAll(".img")

        elements.forEach((el, index) => {
          animate(
            el,
            { transform: "none", opacity: 1 },
            {
              duration: 0.25,
              delay: index * 0.15,
              easing: [0.17, 0.55, 0.55, 1]
            }
          )
        })

        animate(
          img,
          { transform: "none", opacity: 1 },
          {
            duration: 0.25,
            easing: [0.17, 0.55, 0.55, 1]
          }
        )

        return () => {
          elements.forEach((el) => {
            animate(
              el,
              {
                opacity: 0,
                transform: "translateY(2rem)"
              },
              { duration: 0.1 }
            )
          })
          animate(
            img,
            { transform: " scale(.5) translateY(2rem)", opacity: 0 },
            { duration: 0.1 }
          )
        }
      })
    }, [])
    return {
      containerRef
    }
  }
})
</script>

<template>
  <div class="py-4" ref="containerRef">
    <img
      loading="lazy"
      :width="width"
      :height="height"
      :v-lazy="src"
      :srcset="src"
      :src="src"
      :alt="alt"
      :class="classCard"
      class="img" />
    <div class="py-4 space-y-4">
      <h2 :class="classTitle" class="uppercase text-xl animation">
        {{ title }}
      </h2>
      <h3 v-if="subtitle" :class="classSubtitle" class="text-lg animation">
        {{ subtitle }}
      </h3>
      <span class="space-y-4 block">
        <p
          v-for="(item, index) in texts"
          :key="index"
          :class="classText"
          class="text-base animation">
          {{ item.text }}
        </p>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.img {
  transform: scale(0.7) translateY(2rem);
  opacity: 0;
}

.animation {
  transform: translateY(2rem);
  opacity: 0;
}
</style>
