<script>
import { ref, defineComponent, watchEffect, onMounted } from "vue"
import { inView, animate } from "motion"
import ButtonFill from "./ButtonFill.vue"
import Text from "./Text.vue"

export default defineComponent({
  name: "TextHighlighter",
  components: {
    ButtonFill,
    Text
  },
  props: {
    class: String,
    title: String,
    subtitle: String,
    texts: {
      type: Array,
      default: () => []
    },
    classTitle: String,
    classSubtitle: String,
    classText: String,
    classButton: String,
    buttonText: String,
    buttonHref: String,
    buttonTo: String,
    buttonClick: Function,
    classTextButton: String,
    tagTitle: String,
    showTextAnimated: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const containerRef = ref(null)
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
    }, [])
    return {
      containerRef
    }
  }
})
</script>

<template>
  <div class="py-4" ref="containerRef" :class="class">
    <div class="p-8 space-y-6 text-container animation">
      <Text
        v-if="showTextAnimated"
        :class="classTitle"
        :tag="tagTitle"
        :text="title"
        class="uppercase text-xl animation" />
      <h2 class="uppercase text-xl animation" :class="classTitle" v-else>
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
        class="animation button" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.animation {
  transform: translateY(2rem);
  opacity: 0;
}

.text-container {
  background: $gray;
}

.button {
  background: $black;
  color: $white;
}
</style>
