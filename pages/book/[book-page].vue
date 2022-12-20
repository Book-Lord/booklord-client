<template>
    <div class="card">
        <div class="m-3 w-[40rem] inline-block">
            <p class="bold text-5xl">{{ bookInfo.title }}</p>
            <span class="bold">{{ bookInfo.author }}</span>
            <p class="text-sm pt-7">{{ bookInfo.description }}</p>
        </div>
        <div class="float-right m-5 mr-20 inline-block">
            <img :src="bookInfo.coverImg" alt="" />
        </div>
        <Reviews :reviews="reviews" />
    </div>
</template>

<script setup>
const { apiBase } = useRuntimeConfig()
const { bookpage } = useRoute().params

const { data } = await useAsyncData('getInfo', () =>
    $fetch(apiBase + `/book/${bookpage}`)
)

const { bookInfo, reviews } = data.value
</script>
