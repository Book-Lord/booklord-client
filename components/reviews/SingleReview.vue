<template>
    <div class="mt-5 rounded bg-emerald-50">

        <div class="p-5">
            <!-- <div class="w-1/4"> -->
                <!-- <img class="rounded-full" :src="review.userImg" alt=""> -->
            <!-- </div> -->
            <div class="w-1/6 h-full bg-emerald-500 rounded inline-block">
                <p class="text-white text-center"> {{ (review.rating >= 0 ? '+' : '') }} {{ review.rating }}</p>
            </div>
            <div class="w-3/4 inline-block ml-4">
                <p class="bold text-xl">{{ review.author || 'Anonymous' }}</p>
                <p class="text-sm pt-6">{{ review.content || "No review provided" }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { review } = defineProps(['review'])
</script>