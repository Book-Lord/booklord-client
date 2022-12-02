<template>
   <books-browser :books-list="booksList" />
</template>

<script>
export default {
    name: "Explore",
    data() {
        return {
            booksList: null,
        }
    },
    async fetch() {
      this.booksList = await this.$http.$get(`/books`)
    },
}
</script>
