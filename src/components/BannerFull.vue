<script>
import { defineComponent, watchEffect, ref } from "vue"
import Text from "./Text.vue"
import ButtonFill from "./ButtonFill.vue"
import { inView, animate } from "motion"

export default defineComponent({
  name: "BannerFull",
  components: {
    Text,
    ButtonFill
  },
  props: {
    src: String,
    alt: String,
    height: String,
    width: String,
    classImg: String,
    title: String,
    tagTitle: String,
    classButton: String,
    buttonText: String,
    buttonHref: String,
    buttonTo: String,
    buttonClick: Function
  },
  setup(props) {
    const containerRef = ref(null)
    watchEffect(() => {
      inView(containerRef.value, ({ target }) => {
        const elements = target.querySelectorAll(".animation")
        const img = target.querySelector(".img")

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
            duration: 0.15,
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
  <div class="relative banner" ref="containerRef">
    <img
      loading="lazy"
      :width="width"
      :height="height"
      :v-lazy="src"
      :srcset="src"
      :src="src"
      :alt="alt"
      :class="classImg"
      class="img object-cover h-full" />
    <span
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8">
      <Text
        :tag="tagTitle"
        :text="title"
        class="text-3xl uppercase mb-5 animation" />
      <ButtonFill
        :href="buttonHref"
        :to="buttonTo"
        :click="buttonClick"
        :text="buttonText"
        :class="classButton"
        class="animation" />
    </span>
  </div>
</template>

<style scoped lang="scss">
.banner {
  height: $height100vhHeader;
}
.img {
  transform: scale(0.7) translateY(2rem);
  opacity: 0;
}

.animation {
  transform: translateY(2rem);
  opacity: 0;
}
</style>
