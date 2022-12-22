<template>
    <div class="card">
        <BookInfo :book-info="bookInfo" class="inline-block" />
        <div class="float-right m-5 mr-20 inline-block">
            <img :src="bookInfo.coverImg" alt="" />
        </div>
        <Reviews :reviews="reviews" :book="bookpage" />
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
