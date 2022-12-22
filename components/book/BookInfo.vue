<template>
    <div class="border-2 rounded p-5">
        <div class="m-3 w-[40rem] mb-8">
            <p class="bold text-5xl">{{ bookInfo.title }}</p>
            <span class="bold text-gray-400">{{ bookInfo.author }}</span>
            <p class="text-sm pt-7">{{ bookInfo.description }}</p>
        </div>
        <Button class="bg-indigo-300 hover:bg-indigo-400">
            Save
        </Button>
        <Button>
            Update Status
        </Button>
        <Button>
            Recommend
        </Button>
    </div>
</template>

<script>
export default {
    props: {
        bookInfo: {
            type: Object,
            required: true
        }
    }
}
</script>