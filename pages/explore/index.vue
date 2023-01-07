<script setup>
    const apiBase = useRuntimeConfig().apiBase
    const userId = computed(() => useSupabaseUser()?.value?.id);

    const books = useState('books', () => [])
    const page = useState('page', () => 1)

    // const { data: response } = await useAsyncData('explore', () => $fetch(apiBase + `/books/${userId.value || '0'}`) )
    // books.value = response.value
    const getData = async () => {
        await $fetch(apiBase + `/books/${page.value}`, {
            method: 'post',
            body: {
                userId: userId.value || '0'
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
