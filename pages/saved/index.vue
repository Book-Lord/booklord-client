<template>
    <div>
        <span class="text-3xl font-thin text-gray-400">Saved books</span>
        <books-browser class="overflow-y-scroll h-full" />
    </div>
</template>

<script setup>
import BooksBrowser from '~/components/books/BooksBrowser.vue'

definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()
const userId = computed(() => user.value?.id)
const books = useState('books', () => [])

await $fetch(useRuntimeConfig().apiBase + `/users/info/${userId.value}`, { 
    method: 'get',
    headers: { 'Authorization': `Bearer ${useSupabaseToken().value}` }
}).then( (res) => {
    // Set books state to response
    books.value = res.savedBooks
}).catch( (err) => {
    console.error(err);
})

onMounted(() => {
    if (!user.value) {
        navigateTo('/login')
    }
})
</script>