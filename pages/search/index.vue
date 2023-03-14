<script setup>
    const title = useState('title', () => '')
    const genres = useState('genres', () => [])
    const fromYear = useState('fromYear', () => '')
    const toYear = useState('toYear', () => '')
    const rating = useState('rating', () => 3)

    // If no filters are applied, go to the explore page
    if (title?.value === '' &&
        genres?.value.length === 0 &&
        fromYear?.value === '' &&
        toYear?.value === '' &&
        rating?.value === 2) {
        navigateTo({
            path: '/explore',
        })
    }

</script>

<template>
    <search-page title="Search" />
</template>