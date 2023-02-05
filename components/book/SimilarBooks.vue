<template>
    <span class="mt-4 text-3xl font-thin text-gray-400 block">Similar Books</span>
    <div class="inline-block">
        <div v-for="(book, idx) in similarBooks" :key="idx" class="inline-block" >
            <BookPreview
                :title="book.title"
                :book-id="book._id"
                :cover-img="book.coverImg"
                :main-genre="book.genres"
                :liked="book.liked"
            />
        </div>
    </div>
</template>

<script setup>
const { similarBooks } = defineProps(['similarBooks'])
</script>