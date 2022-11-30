<template>
    <div> 
        <div class="m-3 w-[40rem] inline-block">
            <p class="bold text-5xl">{{ bookData.title }}</p>
            <span class="bold">{{ bookData.author }}</span>
            <p class="text-sm pt-7">{{ bookData.description }}</p>
        </div>
        <div class="float-right m-5 mr-20 inline-block">
            <img :src="bookData.coverImg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ params, $http }) {
      const bookId = params.book;
      
      const bookData = await $http.$get(`/book/${bookId}`)

      return { bookData }
    },
    data() {
        return {
            bookData: null,
        }
    },
}
</script>