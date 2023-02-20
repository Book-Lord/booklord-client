<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :fill="liked ? 'red' : 'none'"
        viewBox="0 0 24 24"
        stroke-width="2.0"
        :stroke="liked ? 'red' : 'grey'"
        class="w-5 align-bottom group-hover:stroke-white transition duration-300 z-50 cursor-pointer"
        @click="toggleLike"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
    </svg>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()

const { bookId, isLiked } = defineProps(['bookId', 'isLiked'])

const user = useSupabaseUser()

const liked = ref(isLiked)

const toggleLike = async () => {
    if (!user.value) {
        navigateTo('/login')
        return
    }

    await $fetch(useRuntimeConfig().apiBase + `/users/${bookId}/books/saved`, {
        method: 'post',
        headers: { 'Authorization': `Bearer ${useSupabaseToken().value}` },
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
