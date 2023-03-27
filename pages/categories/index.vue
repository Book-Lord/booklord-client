<template>
    <div>
        <span class="text-3xl font-thin text-gray-400">Book Categories</span>
        <div class="mx-6 pt-2 flex flex-wrap">
            <GenreSection :genres="bookGenres" />
        </div>
    </div>
</template>

<script setup>
import GenreSection from '~/components/genres/GenreSection.vue'
</script>