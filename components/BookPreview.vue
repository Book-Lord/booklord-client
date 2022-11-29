<template>
    <nuxt-link :to="'/book/' + bookId">
        <div class="p-2 inline-block align-top">
            <div class="p-2 bg-slate-100 rounded">
                <div class="box-border h-72 w-48 bg-slate-400 rounded bg-cover" :style="{ 'background-image': 'url(' + coverImg + ')' }" />
                <span class="p-2 block w-48 text-center font-medium">{{ title }}</span>
            </div>
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