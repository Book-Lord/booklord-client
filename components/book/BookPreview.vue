<template>
    <nuxt-link :to="'/book/' + bookId">
        <div class="p-2 inline-block align-top">
            <div
                class="p-4 bg-white shadow rounded relative hover:scale-110 hover:z-10 transition duration-300"
            >
                <div
                    class="box-border h-72 w-48 bg-slate-400 rounded bg-cover"
                    :style="{ 'background-image': 'url(' + coverImg + ')' }"
                />
                <div
                    class="box-border w-8 h-8 bg-white hover:bg-purple-500 absolute top-5 right-5 rounded flex justify-center transition duration-300 group"
                >
                    <LoveButton :is-liked="false" :book-id="bookId" />
                </div>
                <span
                    class="block p-2 w-48 text-center font-semibold text-base truncate"
                >
                    {{ title }}
                </span>
                <span class="block p-2 text-purple-500 text-center font-mono text-sm">{{
                    mainGenre ? mainGenre[0] : ''
                }}</span>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
import LoveButton from '~/components/book/LoveButton.vue'

export default {
    name: 'BookPreview',
    components: {
        LoveButton
    },
    props: {
        title: {
            type: String,
            required: true
        },
        mainGenre: {
            type: Array,
            required: false
        },
        bookId: {
            type: String,
            required: true
        },
        coverImg: {
            type: String,
            required: true
        }
    }
}
</script>
