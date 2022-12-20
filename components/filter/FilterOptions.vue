<template>
    <div>
        <span class="font-semibold text-xl font-sans w-40 mb-8">Filter options</span>
        
        <div class="text-gray-600">
            <p class="font-semibold py-4">By Genre</p>
            <div class="columns-2">
                <div v-for="(genre, idx) in genres" :key="idx">
                    <genre-option :genre="genre" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GenreOption from './GenreOption.vue'

export default {
    components: {
        GenreOption
    },
    data() {
        return {
            genres: [
                'Action',
                'Fantasy',
                'Fiction',
                'Historical Fiction',
                'Childrens',
                'Poetry'
            ]
        }
    }
}
</script>