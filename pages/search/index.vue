<script setup>
    const apiBase = useRuntimeConfig().apiBase
    const userId = computed(() => useSupabaseUser()?.value?.id);

    const route = useRoute()

    const booksList = ref([])
    
    const title = useState('title')
    console.log(title.value)

    await $fetch(apiBase + `/book/search/`, { 
        method: 'post',
        body: {
            title: title.value || '',
            userId: userId.value || '0'
        }
    }).then( (res) => {
        booksList.value = res
    })

    // TODO: use state 

</script>

<template>
    <div>
        <SearchBar />
        <books-browser :books-list="booksList" />
    </div>
</template>