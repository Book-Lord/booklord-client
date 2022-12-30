<script setup>
    const title = useState('title', () => '')
    const genres = useState('genres', () => [])

    if (title?.value === '' && genres?.value.length === 0) {
        navigateTo({
            path: '/explore',
        })
    }

</script>

<template>
    <search-page title="Search" />
</template>