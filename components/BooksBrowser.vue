<template>
    <div class="ml-80">
        <book-preview v-for="(book, idx) in booksData" :key="idx" :title="book.title" />
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "BookBrowser",
    data() {
        return {
            booksData: null
        }
    },
    // TODO: Move it to env variable
    // TODO: Create axios config
    mounted() {
        axios
            .get("http://localhost:8000/api/books")
            .then(response => (this.booksData = response.data))
    }
}
</script>