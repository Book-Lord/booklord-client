<template>
    <div @click="redirectToBook()" class="m-2 p-4 bg-gray-100 hover:scale-105 transition-all cursor-pointer">
        <span> {{ review.content }} </span>
    </div>
</template>

<script setup>
const { review } = defineProps(['review'])

const redirectToBook = () => {
    navigateTo(`/book/${review.bookId}`)
}
</script>