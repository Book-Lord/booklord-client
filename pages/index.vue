<template>
    <div class="ml-44">
        <div class="w-2/3 float-left">
            <div>
                <span class="font-semibold text-xl font-sans">Viral in Bulgaria</span>
                <books-browser />
            </div>
            <div class="mt-8">
                <span class="font-semibold text-xl font-sans">Book Categories</span>
            </div>
        </div>
        <div class="bg-indigo-50 h-screen float-right w-1/3 rounded-l-lg p-6">
            <span class="font-semibold text-xl font-sans">Friends' Recommendations</span>
            <BookRecommendation title="The Name of the Wind" author="Patrick Rothfuss" coverImg="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586722975l/2767052.jpg" message="The book is fascinating in terms of style and storyline" />
            <BookRecommendation title="The Potter Harry" author="David Goggins" coverImg="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546910265l/2.jpg" message="They had nothing in common until Love gave him the reason for" />
        </div>
    </div>
</template>

<script setup>
const apiBase = useRuntimeConfig().apiBase
const userId = computed(() => useSupabaseUser()?.value?.id);

const books = useState('books', () => [])

const { data: result } = await useAsyncData('home', () => $fetch(apiBase + `/featured/${userId.value || '0'}`) )

books.value = result.value
</script>