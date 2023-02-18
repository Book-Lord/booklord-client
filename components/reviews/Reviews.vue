<template>
    <div class="m-3 mt-10 inline-block">
        <p class="text-4xl font-thin">Reviews</p>
        <div class="mt-5">
            <form @submit.prevent="sendReview">
                <input v-model="reviewContent" class="border-2 border-gray-300 bg-white h-10 mx-4 pr-16 rounded-lg text-sm focus:outline-none" type="text" name="review" placeholder="Add a review" autocomplete="off" />
                <div class="inline-block">
                    <label for="medium-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating ({{ (rating / 10).toFixed(0) }})</label>
                    <input v-model="rating" id="medium-range" type="range" class="h-2 mr-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                </div>
                <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-8 rounded">Add Review</button>
            </form>
        </div>
        <div class="rounded bg-gray-50 mt-3 max-w-4xl max-h-screen overflow-y-scroll">
            <div class="sticky top-0 p-3 bg-gray-50">
                <p class="text-2xl font-thin">Key Phrases</p>
                <div v-if="keyPhrases?.length > 0" class="flex flex-wrap">
                    <div v-for="(phrase, idx) in keyPhrases" :key="idx" class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">
                        {{ phrase }}
                    </div>
                </div>
                <div v-else>
                    <p class="text-gray-500">No enough reviews provided to generate key phrases.</p>
                </div>
            </div>
            <div v-for="(review, idx) in reviews" :key="idx" >
                <SingleReview :review="review" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import SingleReview from './SingleReview.vue';
    import { useToast } from 'vue-toastification'

    const toast = useToast()

    const { reviews, book, keyPhrases } = defineProps(['reviews', 'book', 'keyPhrases'])

    const userId = computed(() => useSupabaseUser().value?.id)

    const { apiBase } = useRuntimeConfig()

    const reviewContent = ref('')
    const rating = ref(0)
    
    const sendReview = async () => {
        if (!userId.value) {
            navigateTo('/login')
            return
        }

        if (rating.value == 0) {
            toast.error('Please provide a rating ⭐️')
            return
        }

        if (reviewContent.value.length < 10) {
            toast.error('Please provide a review with at least 10 characters 📝')
            return
        }

        await $fetch(apiBase + `/reviews`, {
            method: 'post',
            headers: { 'Authorization': `Bearer ${useSupabaseToken().value}` },
            body: {
                bookId: book,
                rating: (rating.value / 10).toFixed(0),
                content: reviewContent.value
            }
        }).then( (res) => {
            // Pushes to the front of the array
            reviews.unshift(res)

            reviewContent.value = ''

            toast.success('Review added successfully 🎉')
        }).catch( (err) => {
            console.error(err);

            toast.error('Failed to add review 😢')
        })  
    }
</script>