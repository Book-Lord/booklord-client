<template>
    <div class="bg-red-300 hover:bg-red-400 p-6 rounded-lg w-1/4 text-center transition duration-300">
        <span class="font-semibold text-red-800 align-middle transition cursor-default"> {{ error }} </span>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: String,
            required: true
        }
    }
}
</script>

