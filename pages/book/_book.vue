<template>
    <div>
        <p class="left-0">Book!</p>
        <p>{{ bookId }}</p>
    </div>
</template>

<script>
export default {
    asyncData({ params }) {
      const bookId = params.book;
      
      return { bookId }
    }
}
</script>