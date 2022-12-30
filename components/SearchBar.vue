<template>
    <div class="xl:w-64 w-max m-3">
        <form @submit.prevent="searchByName" class="">
            <input
            v-model="query"
            type="search"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Find your next book"
            autocomplete="off"
            />
        </form>
    </div>
</template>

<script setup>
const apiBase = useRuntimeConfig().apiBase
const userId = computed(() => useSupabaseUser()?.value?.id);

const title = useState('title', () => '');
const books = useState('books', () => [])

const query = ref('')

const searchByName = async () => {
    title.value = query.value

    if (query.value.length > 0)
    {
        await $fetch(apiBase + `/book/search/`, { 
            method: 'post',
            body: {
                title: title.value,
                userId: userId.value || '0'
            }
        }).then( (res) => {
            books.value = res
        })

        return navigateTo({
            path: '/search',
        })
    } else {
        return navigateTo({
            path: '/explore',
        })
    }
}

</script>