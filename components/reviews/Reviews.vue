<template>
    <div class="m-3 mt-10 inline-block">
        <p class="text-4xl font-thin">Reviews</p>
        <div class="mt-5">
            <button @click="showModal = !showModal" class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-8 rounded">Create a review</button>
            <modal v-show="showModal" @close-modal="showModal = false">
                <div class="p-4">
                    <form @submit.prevent="sendReview">
                        <h2 class="text-lg font-semibold mb-4">Add a Review</h2>
                        <div class="flex items-center mb-4">
                            <label class="text-sm font-medium mr-2">Rate this book</label>
                            <div class="w-full h-2 bg-gray-300 rounded-full relative">
                                <div class="h-2 bg-purple-500 rounded-full" :style="{ width: `${rating * 10}%` }"></div>
                                <input v-model="rating" type="range" min="0" max="10" class="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full">
                            </div>
                            <span class="text-sm font-medium ml-2">{{ rating }}</span>
                            <input v-model="rating" type="range" min="0" max="10" class="sr-only">
                        </div>
                        <div class="mb-4">
                            <label class="text-sm font-medium mb-2">Leave a review below:</label>
                            <textarea placeholder="I think..." v-model="reviewContent" class="w-full h-36 border-2 border-gray-300 bg-white px-4 py-2 rounded-lg text-sm focus:outline-none"></textarea>
                        </div>
                        <button class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-8 rounded-full self-center">Send</button>
                    </form>
                </div>
                    <!-- <div>
                        <label for="medium-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating ({{ (rating / 10).toFixed(0) }})</label>
                        <input v-model="rating" id="medium-range" type="range" class="h-2 mr-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                    </div>                -->
            </modal>
        </div>
        <div class="rounded bg-gray-50 mt-3 max-w-4xl max-h-screen overflow-y-scroll">
            <div class="sticky top-0 p-3 bg-gray-50 rounded">
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

    const showModal = ref(false)
    
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

        await $fetch(apiBase + `/books/${book}/reviews`, {
            method: 'post',
            headers: { 'Authorization': `Bearer ${useSupabaseToken().value}` },
            body: {
                rating: rating.value,
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
        }).finally( () => {
            showModal.value = false
        })
    }
</script>