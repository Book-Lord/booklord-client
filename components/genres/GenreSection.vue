<template>
    <div v-for="(genre, idx) in genres" :key="idx" class="p-3">
        <div @click="gotoGanre(genre)" class="bg-stone-600 rounded p-6 drop-shadow-md w-40 
        cursor-pointer text-center">
            <span class="font-medium text-white"> {{ genre }} </span>
        </div>
    </div>
</template>

<script setup>
const { genres } = defineProps(['genres'])

const genresState = useState('genres', () => [])
const books = useState('books', () => [])

const gotoGanre = async (genre) => {
    genresState.value = [genre]

    await $fetch(useRuntimeConfig().apiBase + `/book/search/`, { 
        method: 'post',
        headers: { 'Authorization': `Bearer ${useSupabaseToken().value}` },
        body: {
            title: '',
            genres: genresState.value,
        }
    }).then( (res) => {
        books.value = res
    })

    navigateTo({
        path: '/search',
    })
}

</script>