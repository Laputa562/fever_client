<script setup>
import { ref, watch } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
const username = ref('')
</script>
<template>
  <div class="h-screen flex bg-[#D9D9D9]">
    <div
      class="animate-slide-in-left shadow-xl 0.5s ease-out forwards h-screen w-[22vw] max-w-md bg-[#1F1F1F] rounded-tr-[14px] rounded-br-[14px] flex justify-center items-center flex-col px-12 gap-[20px]"
    >
      <h1 class="text-white text-2xl font-semibold">Sign in</h1>
      <BaseInput v-model="username" placeholder="Username" />
      <BaseInput v-model="password" type="password" placeholder="Password" />
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
