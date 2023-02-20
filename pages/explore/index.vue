<script setup>
    const books = useState('books', () => [])
    const page = useState('page', () => 1)

    const getData = async () => {
        await $fetch(useRuntimeConfig().apiBase + `/books?page=${page.value}`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${useSupabaseToken().value}`
            }
        }).then( (res) => {
            books.value = res
        })
    }
    
    await getData()

    watch(page, async () => {
        await getData()

        window.scrollTo(0, 0)
    })
</script>

<template>
    <search-page title="Explore" :page="page" />
</template>
