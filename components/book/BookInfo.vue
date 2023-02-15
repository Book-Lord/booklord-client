<template>
    <div class="border-2 rounded p-5 w-[46rem]">
        <div class="m-3 w-[40rem] mb-8">
            <p class="bold text-5xl">{{ bookInfo?.title }}</p>
            <span class="bold text-gray-400">{{ bookInfo?.author }}</span>
            <p class="text-sm pt-7">{{ bookInfo?.description }}</p>
        </div>

       <GenreBubble :genres="bookInfo?.genres" />

        <div class="block mt-6">
            <Button @click="toggleLike" class="bg-indigo-300 hover:bg-indigo-400"> {{ liked ? 'Saved' : 'Save' }}</Button>
            <RecommendButton :book="bookInfo._id" />
        </div>
    </div>
</template>

<script setup>
import GenreBubble from './GenreBubble.vue'
import RecommendButton from './RecommendButton.vue';
import toastObj from 'vue-toastification'
const { useToast } = toastObj;
const toast = useToast()

const user = useSupabaseUser()

const { bookInfo, saved } = defineProps(['bookInfo', 'saved'])

const liked = ref(saved)

const toggleLike = async () => {
    if (!user.value) {
        navigateTo('/login')
        return
    }

    await $fetch(useRuntimeConfig().apiBase + `/saveBook`, {
        method: 'post',
        headers: { 'Authorization': `Bearer ${useSupabaseToken().value}` },
        body: {
            bookId: bookInfo._id
        }
    }).then( (res) => {
        console.log(res)

        if (res.success) {
            liked.value = !liked.value
        }
        
        if (!liked.value) {
            toast.success("Book was removed from your favourites 😢")
            return
        }

        toast.success("Book was added to your favourites ❤️")
    }).catch ((err) => {
        console.error(err)
        
        toast.error("Failed to save book 😢")
    })
}
</script>
