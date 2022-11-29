<template>
    <div>
        <book-preview v-for="(book, idx) in booksData" :key="idx" :title="book.title" />
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
    }
}
</script>