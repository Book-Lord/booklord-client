<template>
    <div v-if="review.userId" class="mt-5 rounded bg-emerald-50">
        <div class="p-5 flex">
            <div class="w-1/6 h-full bg-emerald-500 rounded inline-block float-left">
                <!-- If rating is present -> format it with a plus sign  -->
                <p class="text-white text-center"> {{ (review.rating >= 0 ? '+' : '') }} {{ review.rating }}</p>
            </div>
            <div  class="w-3/4 inline-block ml-4 float-right">
                <p class="bold text-xl">{{ review.userId['name'] || 'Anonymous' }}</p>

                <div>
                    <p class="text-sm pt-6" v-if="review.content.length <= 200">
                        {{ review.content || "No review provided" }}
                    </p>
                    <div v-else>
                        <div v-if="!showFullReview">
                            <p class="text-sm pt-6 overflow-hidden h-32">
                                {{ review.content || "No review provided" }}
                            </p>
                            <button class="text-blue-300 text-sm hover:underline" @click="showFullReview = true">
                                Read more
                            </button>
                        </div>
                        <div v-else>
                            <p class="text-sm pt-6">
                                {{ review.content || "No review provided" }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <error-loading error="Unable to load review." />
    </div>
</template>

<script setup>
    const { review } = defineProps(['review'])
    
    // Define variable for read-more button
    const showFullReview = ref(false)
</script>