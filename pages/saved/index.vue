<template>
    <div>
        <span class="text-3xl font-thin text-gray-400">Saved books</span>
        <books-browser class="overflow-y-scroll h-full" />
    </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()
const userId = computed(() => user.value?.id)
const books = useState('books', () => [])

const uri = useRuntimeConfig().apiBase + `/users/${userId.value}`

await $fetch(uri, { 
    method: 'post',
    body: { 
        userId: userId.value,
    }
}).then( (res) => {
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