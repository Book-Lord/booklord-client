<template>
    <div class="card">
        <BookInfo :book-info="bookInfo" class="inline-block" />
        <div class="float-right m-5 mr-20 inline-block">
            <img :src="bookInfo.coverImg" alt="" />
        </div>
        <Reviews :reviews="reviews" :book="bookpage" />
        <div>
            <span class="text-3xl font-thin text-gray-400 block">Similar Books</span>
            <div class="inline-block">
                <div v-for="(book, idx) in similarBooks" :key="idx" class="inline-block" >
                    <BookPreview
                        :title="book.title"
                        :book-id="book._id"
                        :cover-img="book.coverImg"
                        :main-genre="book.genres"
                        :liked="book.liked"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { apiBase } = useRuntimeConfig()
const { bookpage } = useRoute().params

const { data } = await useAsyncData('getInfo', () =>
    $fetch(apiBase + `/book/${bookpage}`)
)

const { bookInfo, reviews, similarBooks } = data.value
</script>
