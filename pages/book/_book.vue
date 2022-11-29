<template>
    <div v-if="!$fetchState.pending">
        <div class="mt-5"> 
            <div class="m-3 w-2/5 fixed">
                <p class="bold text-5xl">{{ bookData.title }}</p>
                <span class="bold">{{ bookData.author }}</span>
                <p class="text-sm pt-7">{{ bookData.description }}</p>
            </div>
            <div class="float-right m-5 mr-20">
                <img :src="bookData.coverImg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    asyncData({ params }) {
      const bookId = params.book;

      return { bookId }
    },
    data() {
        return {
            bookData: null,
        }
    },
    async fetch() {
      this.bookData = await fetch(
        'http://localhost:8000/api/book/' + this.bookId
      ).then(res => res.json())
    }
}
</script>