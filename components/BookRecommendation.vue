<template>
    <div class="h-36 bg-white rounded-xl mt-6 p-3">
        <div class="flex">
            <div
            class="box-border h-16 w-16 bg-slate-400 rounded-lg bg-cover flex-none"
            :style="{ 'background-image': 'url(' + coverImg + ')' }"
            />
            <div class="pl-3">
                <span class="font-semibold text-lg pl-1">{{ title }}</span>
                <div>
                    <span class="text-gray-400 text-sm ml-2">by {{ author }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        coverImg: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: false,
            default: ''
        },
    }
}
</script>