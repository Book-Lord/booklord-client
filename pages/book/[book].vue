<script setup>
    const user = useSupabaseUser()
    const client = useSupabaseAuthClient()

    const userId = computed(() => user.value?.id)
    const apiBase = useRuntimeConfig().apiBase
    const route = useRoute()

    const { data: data } = await useAsyncData('getInfo', () => $fetch(apiBase + `/book/${route.params.book}`) )
    const bookData = data.value.bookInfo
    const reviews = data.value.reviews
    
    const reviewContent = ref('')
    const sendReview = async () => {
        const { data: newReview } = await $fetch(apiBase + `/reviews`, {
            method: 'post',
            body: {
                bookId: route.params.book,
                userId: userId.value,
                rating: 3,
                content: reviewContent.value
            }
        })
        console.log(newReview)
        reviewContent.value = ''
    }
</script>

<template>
    <div> 
        <div class="m-3 w-[40rem] inline-block">
            <p class="bold text-5xl">{{ bookData.title }}</p>
            <span class="bold">{{ bookData.author }}</span>
            <p class="text-sm pt-7">{{ bookData.description }}</p>
        </div>
        <div class="float-right m-5 mr-20 inline-block">
            <img :src="bookData.coverImg" alt="">
        </div>
        <div class="m-3 w-[40rem] inline-block">
            <p class="bold text-3xl">Reviews</p>
            <div class="mt-5">
                <button @click="sendReview" class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">Add Review</button>
                <input v-model="reviewContent" class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" type="text" name="review" placeholder="Add a review" autocomplete="off" />
            </div>
            <div v-for="(review, idx) in reviews" :key="idx" >
                <div class="mt-5">
                    <div class="flex mt-5">
                        <div class="w-1/4">
                            <!-- <img class="rounded-full" :src="review.userImg" alt=""> -->
                        </div>
                        <div class="w-3/4">
                            <p class="bold">{{ getAuthorEmail(review.userId) }}</p>
                            <p class="text-sm">{{ review.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>