<template>
    <div v-if="!$fetchState.pending">
        <div>
            <div v-for="(book, idx) in booksData" :key="idx" class="inline-block">
                <book-preview :title="book.title" :book-id="book._id" :cover-img="book.coverImg" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BookBrowser",
    props: {
        booksList: Array
    },
    data() {
        return {
            booksData: null,
        }
    },
    async fetch() {
        if (this.booksList != null) {
            this.booksData = this.booksList
        } else {
            this.booksData = await this.$http.$get('/books');
        }
    },
}
</script>