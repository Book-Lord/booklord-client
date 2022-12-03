<script setup>
    const apiBase = useRuntimeConfig().apiBase
    const route = useRoute()

    const booksList = await $fetch(apiBase + `/book/search`, { 
        method: 'post',
        body: { title: route.query.title }
    })
</script>

<template>
    <div>
        <books-browser :books-list="booksList" />
    </div>
</template>