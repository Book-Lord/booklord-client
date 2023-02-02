<template>
    <div class="border-2 rounded p-5 w-[46rem]">
        <div class="m-3 w-[40rem] mb-8">
            <p class="bold text-5xl">{{ bookInfo?.title }}</p>
            <span class="bold text-gray-400">{{ bookInfo?.author }}</span>
            <p class="text-sm pt-7">{{ bookInfo?.description }}</p>
        </div>

       <GenreBubble :genres="bookInfo?.genres" />

        <div class="block mt-6">
            <Button class="bg-indigo-300 hover:bg-indigo-400">Save</Button>
            <Button>Update Status</Button>
            <RecommendButton :book="bookInfo._id" />
        </div>
    </div>
</template>

<script setup>
import GenreBubble from './GenreBubble.vue'
import RecommendButton from './RecommendButton.vue';

const { bookInfo } = defineProps(['bookInfo'])
</script>
