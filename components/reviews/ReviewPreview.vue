<template>
    <div @click="redirectToBook()" class="m-4 p-6 bg-slate-400 text-white hover:scale-105 transition-all cursor-pointer rounded">
        <span> {{ review.content }} </span>
        <span class="block text-xs text-gray-300"> Rated with {{ review.rating }} on {{ getDate() }}</span>
    </div>
</template>

<script setup>
const { review } = defineProps(['review'])

const redirectToBook = () => {
    navigateTo(`/book/${review.bookId}`)
}

const getDate = () => {
    const date = new Date(review.date)
    return date.toLocaleDateString()
}
</script>