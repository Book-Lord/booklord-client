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
            booksList: null,
            title: null,
        }
    },
    watch: {
        $route (to, from) {
            this.title = this.$route.query.title;
        }
    },
    created() {
        this.title = this.$route.query.title;
    },
}
</script>