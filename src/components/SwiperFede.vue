<script>
import { defineComponent, ref, watchEffect } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/swiper-bundle.css"
import SwiperCore, { Autoplay, EffectFade } from "swiper/core"
SwiperCore.use([Autoplay, EffectFade])

export default defineComponent({
  name: "SwiperFede",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    images: {
      type: Array,
      default: () => []
    },
    width: String,
    height: String
  },
  setup(props) {
    const images = props.images

    return {
      images
    }
  }
})
</script>

<template>
  <div>
    <swiper
      :effect="'fade'"
      :autoplay="{ delay: 1000, disableOnInteraction: false }"
      :loop="true"
      :speed="1000"
      :slides-per-view="1">
      <swiper-slide v-for="(img, index) in images" :key="index">
        <img
          loading="lazy"
          :width="width"
          :height="height"
          :v-lazy="img.src"
          :srcset="img.src"
          :src="img.src"
          :alt="img.alt"
          class="w-full h-full object-cover" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped></style>
