<template>
    <div keep-alive>
        <div v-for="(book, idx) in booksList" :key="idx" class="inline-block">
            <BookPreview
                :title="book.title"
                :book-id="book._id"
                :cover-img="book.coverImg"
                :main-genre="book.genres"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookBrowser',
    props: {
        booksList: {
            type: Array,
            required: true
        }
    }
}
</script>
