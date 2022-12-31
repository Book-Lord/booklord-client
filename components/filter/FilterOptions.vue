<template>
    <div>
        <span class="font-semibold text-xl font-sans w-40 mb-8">Filter options</span>
        <div class="text-gray-600">
            <div>
                <p class="font-semibold py-4">By Genre</p>
                <div class="columns-2">
                    <div v-for="(genre, idx) in genres" :key="idx">
                        <filter-option category="genres" :option="genre" />
                    </div>
                </div>
            </div>
            <div>
                <p class="font-semibold py-4">Publish Year</p>
                <div class="mb-3 ">
                    <input
                    type="number"
                    v-model="fromYear"
                    class="mb-4 block form-control px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                    id="fromYeat"
                    placeholder="From Year"
                    />
                    <input
                    type="number"
                    v-model="toYear"
                    class="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                    id="toYear"
                    placeholder="End Year"
                    />
                </div>
            </div>
            <div>
                <p class="font-semibold py-4">By Rating</p>
                <div class="columns-2">
                    <div v-for="(rating, idx) in ratings" :key="idx">
                        <filter-option category="rating" :option="rating" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import FilterOption from './FilterOption.vue'

const genres = [
    'Fiction',
    'Fantasy',
    'Classics',
    'Childrens',
    'Poetry',
    'Novels',
    'Historical Fiction',
    'Science Fiction',
    'Philosophy',
    'France',
    'Teen',
    'Adult'
]

const ratings = [
    'Decent (+3)',
    'Good (+4)',
    'Fantastic (+4.5)',
    'Unmatched (5)'
]

const fromYearState = useState('fromYear', () => '')
const toYearState = useState('toYear', () => '')

const fromYear = ref(fromYearState.value)
const toYear = ref(toYearState.value)

watch(fromYear, (val) => {
    fromYearState.value = val
})

watch(toYear, (val) => {
    toYearState.value = val
})

</script>