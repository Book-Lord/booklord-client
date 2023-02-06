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
        </div>
        <RecommendationSections />
    </div>
</template>

<script setup>
import bookGenres from '~~/utils/bookGenres';

const apiBase = useRuntimeConfig().apiBase
const userId = computed(() => useSupabaseUser()?.value?.id);

const books = useState('books', () => [])

const { data: result } = await useAsyncData('home', () => $fetch(apiBase + `/featured/${userId.value || '0'}`) )

books.value = result.value
</script>