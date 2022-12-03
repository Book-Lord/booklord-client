<script setup>
    const apiBase = useRuntimeConfig().apiBase
    const route = useRoute()

    const { data: bookData } = await useAsyncData('getInfo', () => $fetch(apiBase + `/book/${route.params.book}`) )
</script>

<template>
    <div> 
        <div class="m-3 w-[40rem] inline-block">
            <p class="bold text-5xl">{{ bookData.title }}</p>
            <span class="bold">{{ bookData.author }}</span>
            <p class="text-sm pt-7">{{ bookData.description }}</p>
        </div>
        <div class="float-right m-5 mr-20 inline-block">
            <img :src="bookData.coverImg" alt="">
        </div>
    </div>
</template>