<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import md5 from 'md5'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)

async function login() {
  if (username.value != '' && password.value != '') {
    loading.value = true
    const api_key = md5(`${username.value}:${password.value}`)
    try {
      const body = new URLSearchParams({
        api_key: api_key,
      })
      const res = await fetch('/fever?api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      const data = await res.json()
      if (data.auth == 1) {
        localStorage.setItem('fever_api_key', api_key)
        router.replace('/')
      } else {
        console.log('Login Failed')
      }
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }
}
</script>
<template>
  <div
    class="h-screen flex bg-[#D9D9D9] dark:bg-[#1F1F1F] justify-center items-center md:justify-start"
  >
    <div
      class="animate-slide-in-left shadow-xl 0.5s ease-out forwards md:h-screen md:w-[22vw] min-w-sm max-w-md min-h-76 md:max-w-md bg-[#1F1F1F] dark:bg-[#0B0B0B] rounded-[14px] md:rounded-none md:rounded-tr-[14px] md:rounded-br-[14px] flex justify-center items-center flex-col px-12 gap-[20px]"
    >
      <h1 class="font-domine text-white text-3xl font-semibold">Log in</h1>
      <form @submit.prevent="login">
        <BaseInput v-model="username" :disabled="loading" placeholder="Username" />
        <BaseInput v-model="password" :disabled="loading" type="password" placeholder="Password" />
        <BaseButton type="submit" class="mt-4 w-full">
          {{ loading ? 'Logging in…' : 'Log in' }}</BaseButton
        >
      </form>
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
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='grain'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' seed='7'/></filter><rect width='100%' height='100%' filter='url(%23grain)' opacity='0.15'/></svg>");
  background-repeat: repeat;
}
</style>
