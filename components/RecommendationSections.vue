<template>
    <div class="bg-indigo-50 h-screen float-right w-1/3 rounded-l-lg p-6">
        <span class="font-semibold text-xl font-sans">Friends' Recommendations</span>
        <BookRecommendation v-for="(recommendation, idx) in data?.data" :key="idx" :recommendation="recommendation" />
    </div>
</template>

<script setup>

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