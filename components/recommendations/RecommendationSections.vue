<template>
    <div class="bg-indigo-50 h-[90vh] float-right w-1/3 rounded-l-lg p-6 overflow-y-scroll">
        <span class="text-xl"><span class="text-purple-500 font-semibold">{{ data?.data.length }}</span> Friends' Recommendations</span>
        <BookRecommendation v-for="(recommendation, idx) in data?.data" :key="idx" :recommendation="recommendation" />
    </div>
</template>

<script setup>
import BookRecommendation from './BookRecommendation.vue'

const { data } = await useAsyncData('getRecommendations', () =>
    $fetch(useRuntimeConfig().apiBase + `/recommendations`,
    {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${useSupabaseToken().value}`
        }
    })
    .catch((err) => {
        console.log(err)
        toast.error('Something went wrong while getting recommendations 👤')

        return;
    })
)

</script>