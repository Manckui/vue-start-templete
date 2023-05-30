<script>
import { defineComponent, ref, computed } from "vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  name: "Form",
  props: {
    inputs: {
      type: Array,
      default: () => [
        {
          name: "name",
          label: "name",
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
      type: Function,
      required: true
    },
    formTitle: String
  },
  setup(props) {
    const { t, locale } = useI18n()
    const form = ref([...props.inputs].sort((a, b) => a.position - b.position))

    return {
      t,
      locale,
      form
    }
  }
})
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 py-4">
    <h2 class="text-lg uppercase">{{ formTitle }}</h2>
    <div
      v-for="(input, index) in form"
      :key="index"
      class="flex flex-col space-y-2 items-start">
      <label :for="input.name" class="uppercase text-sm">
        {{ input.label }}
      </label>
      <input
        v-if="input.type !== 'textarea'"
        :name="input.name"
        :type="input.type"
        :id="input.name"
        v-model="input.value"
        :required="input.required"
        :placeholder="input.placeholder"
        class="px-2 text-base" />
      <textarea
        v-else
        :name="input.name"
        :id="input.name"
        v-model="input.value"
        :required="input.required"
        :placeholder="input.placeholder"
        class="px-2 text-base"></textarea>
    </div>
    <button type="submit" class="button px-4 py-2 uppercase">
      {{ button }}
    </button>
  </form>
</template>

<style lang="scss" scoped>
input,
textarea {
  border: solid 1px $black;
  width: 100%;
}

.button {
  background-color: $black;
  color: $white;
}
</style>
