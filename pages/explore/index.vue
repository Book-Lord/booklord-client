<script setup>
import SearchPage from "~/components/search/SearchPage.vue"

const books = useState('books', () => [])
const page = useState('page', () => 1)

// Fetch books depending on the page
const getData = async () => {
    await $fetch(useRuntimeConfig().apiBase + `/books?page=${page.value}`, {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${useSupabaseToken().value}`
        }
    }).then( (res) => {
        books.value = res
    })
}

await getData()

// Scroll to the top of the page when the page is changed
watch(page, async () => {
    await getData()

    window.scrollTo(0, 0)
})
</script>

<template>
    <search-page title="Explore" :page="page" />
</template>
