<template>
  <div class="accordion text-white">
    <div
      @click="filter()"
      class="flex flex-row px-4 dark:hover:bg-[#3a3a3a] hover:bg-[#b1b1b1] gap-2 text-[#000000] items-center dark:text-[#fff] rounded-[6px] mx-4 py-2 font-domine active:scale-99 hover:scale-101 transition-transform duration-80 ease-out active:opacity-85"
      :class="{ 'bg-[#bdbdbd] dark:bg-[#2c2c2c]': active }"
    >
      <div
        @click.stop="toggle()"
        class="hover:bg-[#a5a5a5] dark:hover:bg-[#808080] rounded-[6px] p-0.5"
      >
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
    max-height 550ms ease,
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
