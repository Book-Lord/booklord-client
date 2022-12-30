<script setup>
    const apiBase = useRuntimeConfig().apiBase
    const userId = computed(() => useSupabaseUser()?.value?.id);

    const route = useRoute()

    const booksList = ref([])
    
    console.log(route.query)
    await $fetch(apiBase + `/book/search/`, { 
        method: 'post',
        body: {
            title: route.query.title,
            userId: userId.value || '0'
        }
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