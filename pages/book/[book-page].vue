<template>
    <div class="card">
        <BookInfo :book-info="bookInfo" :saved="saved" class="inline-block" />

        <div class="float-right m-5 mr-20 inline-block">
            <img :src="bookInfo.coverImg" alt="" />
        </div>

        <Reviews :reviews="reviews" :book="bookpage" />
        <SimilarBooks :similar-books="similarBooks" />
    </div>
</template>

<script setup>
import toastt from 'vue-toastification'
import SimilarBooks from '~~/components/book/SimilarBooks.vue';

const { useToast } = toastt;
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

const { bookInfo, reviews, similarBooks, saved } = data.value
</script>
