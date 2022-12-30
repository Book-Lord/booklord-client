<script setup>
    const apiBase = useRuntimeConfig().apiBase
    const userId = computed(() => useSupabaseUser()?.value?.id);

    const books = useState('books', () => [])

    const { data: response } = await useAsyncData('explore', () => $fetch(apiBase + `/books/${userId.value || '0'}`) )
    books.value = response
</script>

<template>
    <search-page title="Explore" />
</template>
