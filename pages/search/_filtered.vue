<template>
    <div>
        <books-browser :books-list="booksList" />
    </div>
</template>

<script>
export default {
    async asyncData({ $http, query }) {      
      const booksList = await $http.$post('/book/search', { title: query.title });
      
      return { booksList }
    },
    data() {
        return {
            booksList: [],
        }
    },
    // watchQuery: true,
}
</script>