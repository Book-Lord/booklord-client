<template>
    <div>
        <span class="text-3xl font-thin text-gray-400">Saved books</span>
        <div class="mx-6 pt-2 flex flex-wrap">
            <GenreSection :genres="bookGenres" />
        </div>
    </div>
</template>

<script setup>
import bookGenres from '~~/utils/bookGenres';

</script>