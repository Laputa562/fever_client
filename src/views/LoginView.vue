<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
const username = ref('')
</script>
<template>
  <div class="h-screen flex bg-[#D9D9D9] dark:bg-[#1F1F1F]">
    <div
      class="animate-slide-in-left shadow-xl 0.5s ease-out forwards h-screen w-[22vw] max-w-md bg-[#1F1F1F] dark:bg-[#111111] rounded-tr-[14px] rounded-br-[14px] flex justify-center items-center flex-col px-12 gap-[20px]"
    >
      <h1 class="font-domine text-white text-3xl font-semibold">Log in</h1>
      <BaseInput v-model="username" placeholder="Username" />
      <BaseInput v-model="password" type="password" placeholder="Password" />
      <button
        class="font-domine mt-4 bg-[#D9D9D9] text-[#1F1F1F] py-2 w-full rounded-[14px] text-[17px] hover:bg-[#cccaca] active:scale-99 transition-transform duration-80 ease-out active:opacity-85"
      >
        Log in
      </button>
    </div>
  </div>
</template>
<style>
@keyframes slide-in-left {
  from {
    transform: translateX(-40px);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.6s ease-out forwards;
}
</style>
