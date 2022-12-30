<template>
    <div v-for="(genre, idx) in genres" :key="idx" class="inline-block overflow-clip">
        <span class="inline-block text-gray-500 p-2 m-1 rounded bg-indigo-100">{{ genre }}</span>
    </div>
</template>

<script setup>
const { genres } = defineProps(['genres'])
</script>