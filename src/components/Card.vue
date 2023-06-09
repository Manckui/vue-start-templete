<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"
import { inView, animate } from "motion"
import ButtonFill from "./ButtonFill.vue"

export default defineComponent({
  name: "Card",
  components: {
    ButtonFill
  },
  props: {
    src: String,
    alt: String,
    height: String,
    width: String,
    title: String,
    classImg: String,
    subtitle: String,
    texts: {
      type: Array,
      default: () => []
    },
    classTitle: String,
    classSubtitle: String,
    classText: String,
    classCard: String,
    isReverse: {
      type: Boolean,
      default: false
    },
    classButton: String,
    buttonText: String,
    buttonHref: String,
    buttonTo: String,
    buttonClick: Function
  },
  setup(props) {
    const containerRef = ref(null)
    const imgRef = ref(null)
    watchEffect(() => {
      inView(containerRef.value, ({ target }) => {
        const elements = target.querySelectorAll(".animation")

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
        }
      })
      inView(imgRef.value, ({ target }) => {
        animate(
          target,
          { transform: "none", opacity: 1 },
          {
            duration: 0.25,
            easing: [0.17, 0.55, 0.55, 1]
          }
        )

        return () => {
          animate(
            target,
            { transform: " scale(.5) translateY(2rem)", opacity: 0 },
            { duration: 0.1 }
          )
        }
      })
    }, [])
    return {
      containerRef,
      imgRef
    }
  }
})
</script>

<template>
  <div
    :class="isReverse ? 'grid-cols-2-reverse' : 'md:grid-cols-2 ' + classCard"
    class="py-4 md:grid md:px-8">
    <img
      ref="imgRef"
      loading="lazy"
      :width="width"
      :height="height"
      :v-lazy="src"
      :srcset="src"
      :src="src"
      :alt="alt"
      :class="classImg"
      class="img" />
    <div
      class="p-8 space-y-6"
      :class="isReverse ? ' md:pr-4  md:text-right' : 'md:pl-4 md:text-left'"
      ref="containerRef">
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
      <ButtonFill
        :href="buttonHref"
        :to="buttonTo"
        :click="buttonClick"
        :text="buttonText"
        :class="classButton"
        class="animation" />
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

.grid-cols-2-reverse {
  grid-template-columns: 1fr 1fr;
  direction: rtl;
}
</style>
