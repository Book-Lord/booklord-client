<script setup>
    const apiBase = useRuntimeConfig().apiBase

    const { data: booksList } = await useAsyncData('explore', () => $fetch(apiBase + `/books`) )
</script>

<template>
    <SearchBar class="block" />
    <div class="mt-8">
        <div class="inline-block">
            <filter-options />
        </div>
        <books-browser class="w-4/5 float-right inline-block" :books-list="booksList" />
    </div>
</template>
