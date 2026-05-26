<script setup>
import BaseAccordion from '@/components/BaseAccordion.vue'
import { ref, onMounted, computed } from 'vue'

const groups = ref([])
const feeds = ref([])
const feeds_groups = ref([])
const favicons = ref([])
const fontsReady = ref(false)

const faviconAndFeedId = computed(() => {
  return new Map(favicons.value.map((f) => [Number(f.id), `data:${f.data}`]))
})

const items = computed(() => {
  const feedById = new Map(feeds.value.map((f) => [Number(f.id), f]))
  const groupNameById = new Map(groups.value.map((g) => [Number(g.id), g.title]))

  return (feeds_groups.value ?? []).map((g) => {
    const groupId = Number(g.group_id)

    const feedIds = String(g.feed_ids)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number)

    const groupFeeds = feedIds
      .map((feedId) => {
        const feed = feedById.get(feedId)
        if (!feed) return null
        return {
          id: feedId,
          name: feed.title ?? feed.name ?? `Feed ${feedId}`,
          favicon_id: feed.favicon_id,
          site_url: feed.site_url,
        }
      })
      .filter(Boolean)

    return {
      id: groupId,
      name: groupNameById.get(groupId),
      feeds: groupFeeds,
    }
  })
})

async function get_groups() {
  try {
    const body = new URLSearchParams({
      api_key: localStorage.getItem('fever_api_key'),
    })
    const res = await fetch('/fever?api&groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    const data = await res.json()
    groups.value = data.groups ?? []
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}
onMounted(async () => {
  get_groups()
  get_feeds()
  get_favicons()
  await document.fonts.ready
  fontsReady.value = true
})
async function get_favicons() {
  try {
    const body = new URLSearchParams({
      api_key: localStorage.getItem('fever_api_key'),
    })
    const res = await fetch('/fever?api&favicons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    const data = await res.json()
    favicons.value = data.favicons ?? []
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}
async function get_feeds() {
  try {
    const body = new URLSearchParams({
      api_key: localStorage.getItem('fever_api_key'),
    })
    const res = await fetch('/fever?api&feeds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    const data = await res.json()
    feeds.value = data.feeds ?? []
    feeds_groups.value = data.feeds_groups ?? []
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}

const activeId = ref(null)
const setActive = (id) => {
  activeId.value = activeId.value === id ? null : id
}
</script>

<template>
  <div
    class="h-screen flex bg-[#D9D9D9] dark:bg-[#1F1F1F] justify-center items-center md:justify-start"
  >
    <div
      class="animate-slide-in-left shadow-xl 0.5s ease-out forwards md:h-screen md:w-[22vw] min-w-sm max-w-md min-h-76 md:max-w-md bg-[#1F1F1F] dark:bg-[#0B0B0B] rounded-[14px] md:rounded-none md:rounded-tr-[14px] md:rounded-br-[14px] flex flex-col gap-[20px] overflow-y-auto"
    >
      <h1 class="px-8 pt-26 dark:text-[#FFFFFF] font-domine text-[22px] opacity-60">Feeds</h1>
      <BaseAccordion
        v-for="group in items"
        :key="group.id"
        :id="group.id"
        :name="group.name"
        :active="activeId === `group:${group.id}`"
        @set-active="setActive"
        class="rounded-[6px] select-none cursor-pointer"
      >
        <template #content>
          <div
            v-for="feed in group.feeds"
            :key="feed.id"
            :id="feed.id"
            class="select-none cursor-pointer text-sm flex flex-row mx-18 py-1 gap-4 pl-2 rounded-[6px] hover:bg-[#3a3a3a] font-domine"
            :active="activeId === `feed:${feed.id}`"
            :class="{ 'bg-[#2c2c2c]': activeId === `feed:${feed.id}` }"
            @click.stop.prevent="
              () => {
                get_groups()
                setActive(`feed:${feed.id}`)
              }
            "
          >
            <img :src="faviconAndFeedId.get(feed.favicon_id)" class="w-6 h-6 rounded-[6px]" />
            <div class="opacity-60">{{ feed.name }}</div>
          </div>
        </template>
      </BaseAccordion>
    </div>
  </div>
</template>
