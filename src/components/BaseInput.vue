<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-full px-3 py-1 rounded-[8px] bg-[#D9D9D9] border-2 border-[#1F1F1F] focus:outline-none focus:border-[#D9D9D9]"
  />
</template>

<script setup>
defineProps({
  modelValue: String,
  type: { type: String, default: 'text' },
  placeholder: String,
})
defineEmits(['update:modelValue'])
</script>
