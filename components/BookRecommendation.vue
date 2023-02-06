<template>
    <NuxtLink @click="acknowledgeRecommendation" :to="'/book/' + book._id">
        <div class="h-32 bg-white rounded-xl mt-6 p-3">
        <div class="flex">
            <div
            class="box-border h-16 w-16 bg-slate-400 rounded-lg bg-cover flex-none"
            :style="{ 'background-image': 'url(' + book?.coverImg + ')' }"
            />
            <div class="pl-3">
                <div class="relative">
                    <span class="font-semibold text-lg pl-1 truncate w-2/5 inline-block">{{ book?.title }}</span>
                </div>
                <div class="relative">
                    <span class="text-gray-400 text-sm ml-2 truncate w-2/5 inline-block">by {{ book?.author }}</span>
                </div>
            </div>
        </div>
        <div class="pt-3 relative">
            <div class="w-4/5 truncate inline-block">
                <span>{{ recommendation?.message || book?.description || "No message given." }}</span>
            </div>
            <div class="inline-block float-right rounded-full bg-gray-300 w-8 h-8">

            </div>
        </div>
    </div>
    </NuxtLink>
</template>

<script setup>
const { recommendation } = defineProps(['recommendation'])
const { book } = recommendation;

const acknowledgeRecommendation = async () => {
    await useAsyncData('ack', () =>
        $fetch(useRuntimeConfig().apiBase + `/recommendation/acknowledge/${recommendation._id}`,
        {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${useSupabaseToken().value}`
            }
        })
        .catch((err) => {
            console.log(err)
            return;
        })
    )
}
</script>