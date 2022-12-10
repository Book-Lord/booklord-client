<script setup>
    const apiBase = useRuntimeConfig().apiBase

    const { data: booksList } = await useAsyncData('explore', () => $fetch(apiBase + `/books`) )
</script>

<template>
    <SearchBar />
    <books-browser :books-list="booksList" />
</template>
