<template>
    <div class="card">
        <BookInfo :book-info="bookInfo" :saved="saved" class="inline-block" />

        <div class="float-right m-5 mr-20 inline-block">
            <img :src="bookInfo.coverImg" alt="" />
        </div>

        <Reviews :reviews="reviews" :book="bookpage" :keyPhrases="keyPhrases" />
        <SimilarBooks :similar-books="similarBooks" />
    </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import SimilarBooks from '~~/components/books/SimilarBooks.vue';
import BookInfo from '~/components/books/BookInfo.vue'

const toast = useToast()
const { bookpage } = useRoute().params

const { data } = await useAsyncData('getInfo', () =>
    $fetch(useRuntimeConfig().apiBase + `/book/${bookpage}`,
    {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${useSupabaseToken().value}`
        }
    })
    .catch((err) => {
        console.log(err)
        toast.error('Something went wrong while opening the book 📖')

        return;
    })
)

const { bookInfo, reviews, similarBooks, saved, keyPhrases } = data?.value

const updateRecentlyViewed = () => {
    const recentlyViewed = useState('recentlyViewed', () => [])

    if (recentlyViewed.value.length > 4)
        recentlyViewed.value.shift()

    if (recentlyViewed.value.find((book) => book.bookId == bookInfo.bookId))
        return

    recentlyViewed.value.push(bookInfo)
}

updateRecentlyViewed()
</script>
