<script setup>
    const apiBase = useRuntimeConfig().apiBase
    const route = useRoute()

    const booksList = ref([])
    
    await $fetch(apiBase + `/book/search`, { 
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