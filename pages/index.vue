<template>
   <div>
      <side-bar />
      <div class="ml-80">
         <book-preview />
         <book-preview />
         <book-preview />
         
      </div>
   </div>
</template>

<script>
import BookPreview from '~/components/BookPreview.vue';

export default {
    name: "HomePage",
    components: { BookPreview }
}
</script>
