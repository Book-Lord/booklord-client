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
        <div class="rounded bg-gray-50 p-3 mt-3">
            <div v-for="(review, idx) in reviews" :key="idx" >
                <SingleReview :review="review" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import SingleReview from './SingleReview.vue';
    import toastObj from 'vue-toastification'
    const { useToast } = toastObj;

    const toast = useToast()

    const { reviews, book } = defineProps(['reviews', 'book'])

    const userId = computed(() => useSupabaseUser().value?.id)
    const email = computed(() => useSupabaseUser().value?.email)

    const { apiBase } = useRuntimeConfig()

    const reviewContent = ref('')
    const rating = ref(50)
    
    const sendReview = async () => {
        if (!userId.value) {
            navigateTo('/login')
            return
        }

        await $fetch(apiBase + `/reviews`, {
            method: 'post',
            body: {
                bookId: book,
                userId: userId.value,
                email: email.value,
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