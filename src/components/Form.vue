<script>
import { defineComponent, ref, reactive, watchEffect } from "vue"
import { useI18n } from "vue-i18n"
import Text from "./Text.vue"
import ButtonFill from "./ButtonFill.vue"
import { inView, animate } from "motion"

export default defineComponent({
  name: "Form",
  components: {
    Text,
    ButtonFill
  },
  props: {
    inputs: {
      type: Array,
      default: () => [
        {
          name: "name",
          label: "first name",
          type: "text",
          required: true,
          placeholder: "first name",
          position: 1
        },
        {
          name: "email",
          label: "email",
          type: "email",
          required: true,
          placeholder: "email",
          position: 2
        },
        {
          name: "message",
          label: "message",
          type: "textarea",
          required: false,
          placeholder: "type your message here...",
          position: 3
        }
      ]
    },
    button: {
      type: String,
      default: "Submit"
    },
    handleSubmit: {
      type: Function
    },
    formTitle: String,
    click: Function,
    showTextAnimated: {
      type: Boolean,
      default: true
    },
    classTitle: String
  },
  setup(props) {
    const { t, locale } = useI18n()
    const form = ref([...props.inputs].sort((a, b) => a.position - b.position))
    const isInputModified = reactive(
      form.value.reduce((acc, cur) => ({ ...acc, [cur.name]: false }), {})
    )

    const onInput = (inputName, inputValue) => {
      isInputModified[inputName] = inputValue !== ""
    }

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
      t,
      locale,
      form,
      isInputModified,
      onInput,
      containerRef
    }
  }
})
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="space-y-10 p-8"
    ref="containerRef">
    <Text
      tag="h2"
      :text="formTitle"
      class="text-lg uppercase animation"
      :class="classTitle"
      v-if="showTextAnimated" />
    <h2 class="text-lg uppercase animation" :class="classTitle" v-else>
      {{ formTitle }}
    </h2>
    <div
      v-for="(input, index) in form"
      :key="index"
      class="flex flex-col space-y-2 items-start relative animation">
      <label
        :for="input.name"
        class="text-base uppercase"
        :class="{ 'visible-label': isInputModified[input.name] }">
        <span>
          {{ input.label }}
        </span>
      </label>
      <input
        v-if="input.type !== 'textarea'"
        @input="onInput(input.name, $event.target.value)"
        :name="input.name"
        :type="input.type"
        :id="input.name"
        v-model="input.value"
        :required="input.required"
        :placeholder="input.placeholder"
        class="text-base uppercase" />
      <textarea
        v-else
        :name="input.name"
        :id="input.name"
        v-model="input.value"
        :required="input.required"
        :placeholder="input.placeholder"
        class="p-2 text-base uppercase"></textarea>
    </div>
    <ButtonFill :click="click" :text="button" type="submit" class="animation" />
  </form>
</template>

<style lang="scss" scoped>
textarea {
  border: solid 1px $black;
  width: 100%;
  min-height: 6rem;
}

input {
  border-bottom: solid 1px $black;
  width: 100%;
}

.visible-label {
  opacity: 1;
  bottom: 100%;
}

label {
  position: absolute;
  bottom: 0;
  opacity: 0;
  transition: all 0.25s ease-in-out;
}

.animation {
  opacity: 0;
  transform: translateY(2rem);
}
</style>
