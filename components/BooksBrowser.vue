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
// import axios from 'axios'

export default {
    name: "BookBrowser",
    data() {
        return {
            booksData: null,
        }
    },
    // TODO: Move it to env variable
    // create fetch config?
    async fetch() {
      this.booksData = await fetch(
        'http://localhost:8000/api/books'
      ).then(res => res.json())
    },

}
</script>