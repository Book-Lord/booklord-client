<script setup>
    const title = useState('title', () => '')

    if (title?.value === '') {
        navigateTo({
            path: '/explore',
        })
    }

</script>

<template>
    <search-page />
</template>