<template>
  <button
    class="bg-[#D9D9D9] text-[#1F1F1F] py-2 px-4 rounded-[14px] text-[17px] hover:bg-[#cccaca] active:scale-99 hover:scale-101 transition-transform duration-80 ease-out active:opacity-85"
    :type="type"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>
<script setup>
const props = defineProps({
  variant: { type: String, default: 'primary' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])

function onClick(event) {
  if (props.disabled) return
  emit('click', event)
}
</script>
