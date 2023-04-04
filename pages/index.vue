<template>
    <div class="ml-48">
        <div class="w-2/3 float-left">
            <div>
                <span class="font-semibold text-xl font-sans">Viral in Bulgaria</span>
                <books-browser class="overflow-y-scroll h-80" />
            </div>
            <div class="mt-8">
                <span class="font-semibold text-xl font-sans block">Book Categories</span>
                <div class="mx-6 pt-2 flex flex-nowrap overflow-x-scroll">
                    <GenreSection :genres="bookGenres" />
                </div>
            </div>
            <div v-if="recentlyViewed.length" class="mt-4 overflow-hidden h-80">
                <span class="font-semibold text-xl font-sans block">Recently Viewed</span>
                <div v-for="(book, idx) in recentlyViewed" :key="idx" class="inline-block" >
                    <BookPreview
                        :title="book.title"
                        :book-id="book._id"
                        :cover-img="book.coverImg"
                        :main-genre="book.genres"
                        :liked="book.liked"
                        class="scale-75"
                    />
                </div>
            </div>
        </div>
        <RecommendationSections />
    </div>
</template>

<script setup>
import BooksBrowser from '~/components/books/BooksBrowser.vue'
import BookPreview from "~/components/books/BookPreview.vue"
import GenreSection from '~/components/genres/GenreSection.vue'
import RecommendationSections from '~/components/recommendations/RecommendationSections.vue'

const books = useState('books', () => [])
const recentlyViewed = useState('recentlyViewed', () => [])

if (recentlyViewed.value.length > 4) {
    recentlyViewed.value = recentlyViewed.value.slice(0, 4)
}

// Fetch featured books
const { data: result } = await useAsyncData('home', () => $fetch(useRuntimeConfig().apiBase + `/books/featured`, {
    headers: { 'Authorization': `Bearer ${useSupabaseToken().value}` },
}))

books.value = result.value
</script>