<script setup>
    const apiBase = useRuntimeConfig().apiBase
    const user = useSupabaseUser()
    const userId = computed(() => user?.value?.id);

    const { data: booksList } = await useAsyncData('explore', () => $fetch(apiBase + `/books/${userId.value || ''}`) )

    console.log(booksList.value)
</script>

<template>
    <SearchBar class="block" />
    <div class="mt-8">
        <div class="inline-block">
            <filter-options />
        </div>
        <div class="w-4/5 inline-block float-right">
            <div v-if="booksList">
                <books-browser class="w-4/5 float-right inline-block" :books-list="booksList" />
            </div>
            <error-loading class="mr-auto ml-auto float-none" error="Unable to fetch books" v-else/>
        </div>
    </div>
</template>
