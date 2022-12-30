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
import { ref, watch } from 'vue'

const query = ref('')

const title = useState('title', () => '');

watch(query, () => {
    // useState('title', () => query.value)
    title.value = query.value
})

const searchByName = () => {
    

    if (query.value.length > 0)
    {
        return navigateTo({
            path: '/search',
            query: {
                title: query.value,
            }
        })
    } else 
    {
        return navigateTo({
            path: '/explore',
        })
    }
}

</script>