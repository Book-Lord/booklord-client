<script setup>
    const apiBase = useRuntimeConfig().apiBase
    const userId = computed(() => useSupabaseUser()?.value?.id);

    const { data: booksList } = await useAsyncData('explore', () => $fetch(apiBase + `/books/${userId.value || '0'}`) )
</script>

<template>
    <SearchBar class="block" />
    <div class="mt-8">
        <div class="inline-block">
            <filter-options />
        </div>
        <div class="w-4/5 inline-block float-right p-4">
            <books-browser class="w-4/5 float-right inline-block" :books-list="booksList" />
        </div>
    </div>
</template>
