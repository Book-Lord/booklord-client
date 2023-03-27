<template>
    <div>
        <div v-if="books?.length" class="inline-block">
            <div v-for="(book, idx) in books" :key="idx" class="inline-block" >
                <BookPreview
                    :title="book.title"
                    :book-id="book._id"
                    :cover-img="book.coverImg"
                    :main-genre="book.genres"
                    :liked="book.liked"
                />
            </div>
        </div>
        <div v-else-if="!books?.length" class="text-center mt-40">
            <span class="text-gray-600 font-semibold">No books found with the selected filters.</span>
        </div>
        <error-loading class="mr-auto ml-auto float-none" error="Unable to fetch books" v-else/>
    </div>
</template>

<script setup>
import BookPreview from "./BookPreview.vue"

const books = useState('books', () => [])
</script>
