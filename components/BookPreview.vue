<template>
    <nuxt-link :to="'/book/' + bookId">
        <div class="box-border inline-block mt-4 mr-4 h-72 w-48 p-4 border-4 rounded" :style="{ 'background-image': 'url(' + coverImg + ')' }">
            <p class="center">{{ title }}</p>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    name: "BookPreview",
    props: {
        title: String,
        bookId: String,
        coverImg: String
    },
}
</script>