<template>
    <div>
        <div v-for="(book, idx) in booksList" :key="idx" class="inline-block">
            <book-preview :title="book.title" :book-id="book._id" :cover-img="book.coverImg" />
        </div>
    </div>
</template>

<script>
export default {
    name: "BookBrowser",
    props: {
        booksList: Array
    },
    // watch: {
    //     $route (to, from) {
    //         this.$nuxt.refresh();
    //     }
    // },
}
</script>