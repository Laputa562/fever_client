<template>
  <div class="accordion text-white">
    <div
      @click="filter()"
      class="flex flex-row px-4 hover:bg-[#3a3a3a] gap-2 rounded-[6px] mx-4 py-2 font-domine"
      :class="{ 'bg-[#2c2c2c]': active }"
    >
      <div @click.stop="toggle()" class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 transition-transform duration-300 ease-in-out"
          :class="{ 'rotate-90': expanded }"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
      <span>{{ name }}</span>
    </div>

    <transition name="accordion">
      <div v-show="expanded" class="accordion-content overflow-hidden">
        <slot name="content" :expanded="expanded"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const expanded = ref(false)

const props = defineProps({
  id: Number,
  name: String,
  subName: String,
  active: Boolean,
  subs: { type: Array, default: () => [] },
})

const emit = defineEmits(['set-active'])

const toggle = () => {
  expanded.value = !expanded.value
}
const filter = () => {
  emit('set-active', `group:${props.id}`)
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition:
    max-height 450ms ease,
    opacity 400ms ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>
