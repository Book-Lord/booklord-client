<template>
    <div>
        <div class="p-2 inline-block align-top">
            <div
                class="p-4 bg-white shadow rounded relative hover:scale-110 hover:z-10 transition duration-300"
            >
                <nuxt-link :to="'/book/' + bookId">
                    <div
                    class="box-border h-52 w-36 bg-slate-400 rounded-lg bg-cover"
                    :style="{ 'background-image': 'url(' + coverImg + ')' }"
                    />
                </nuxt-link>
                <div
                    class="box-border w-8 h-8 bg-white hover:bg-purple-500 absolute top-5 right-5 rounded flex justify-center transition duration-300 group"
                >
                    <BookLoveButton :is-liked="liked || false" :book-id="bookId" />
                </div>
                <span
                    class="block p-2 w-36 text-center font-semibold text-sm truncate"
                >
                    {{ title }}
                </span>
                <span class="block text-purple-500 text-center font-mono text-[0.7rem] truncate">{{
                    mainGenre ? capitalizeFirstLetter(mainGenre[0]) : ''
                }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import BookLoveButton from '~/components/book/BookLoveButton.vue'

export default {
    name: 'BookPreview',
    components: {
        BookLoveButton
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
        },
        liked: {
            type: Boolean,
            required: false
        }
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        }
    }
}
</script>
