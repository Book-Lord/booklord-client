<template>
    <div>
        <div class="block">
            <SearchBar class="inline-block align-middle" />
            <span v-if="title" class="inline-block text-4xl font-thin ml-60 align-middle"> {{ title }}</span>
        </div>
        <div class="mt-8">
            <div class="inline-block">
                <filter-options keep-alive />
            </div>
            <div class="w-[79%] inline-block float-right p-4">
                <books-browser class="w-4/5 float-right inline-block" />
                <page-navigator class="w-4/5 float-right block" />
            </div>
        </div>
    </div>
</template>

<script setup>
import BooksBrowser from '~/components/books/BooksBrowser.vue'
import PageNavigator from '~/components/PageNavigator.vue'
import SearchBar from '~/components/search/SearchBar.vue'
import FilterOptions from '~/components/filters/FilterOptions.vue'

const { title, page } = defineProps(['title', 'page'])
</script>