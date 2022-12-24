<template>
    <div>
        <div v-if="booksList" class="inline-block">
            <div v-for="(book, idx) in booksList" :key="idx" class="inline-block" >
                <BookPreview
                    :title="book.title"
                    :book-id="book._id"
                    :cover-img="book.coverImg"
                    :main-genre="book.genres"
                    :liked="book.liked"
                />
            </div>
        </div>
        <error-loading class="mr-auto ml-auto float-none" error="Unable to fetch books" v-else/>
    </div>
</template>

<script>
export default {
    name: 'BookBrowser',
    props: {
        booksList: {
            type: Array,
            required: true
        }
    }
}
</script>
