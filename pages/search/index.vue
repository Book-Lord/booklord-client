<script setup>
    const apiBase = useRuntimeConfig().apiBase
    const userId = computed(() => useSupabaseUser()?.value?.id);

    const route = useRoute()

    const booksList = ref([])
    
    await $fetch(apiBase + `/book/search/${userId.value || '0'}`, { 
        method: 'post',
        body: { title: route.query.title }
    }).then( (res) => {
        booksList.value = res
    })


</script>

<template>
    <div>
        <SearchBar />
        <books-browser :books-list="booksList" />
    </div>
</template>