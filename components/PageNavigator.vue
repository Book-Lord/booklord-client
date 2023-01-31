<template>
    <div class="p-6">
        <Button v-if="page != 1" @click="previousPage">Previous page</Button>
        <span class="p-4">Page {{ page }}</span>
        <Button @click="nextPage">Next page</Button>
    </div>
</template>

<script setup>
const page = useState('page', () => 1)  

const nextPage = () => {
    page.value++
}

const previousPage = () => {
    if (page.value > 1) {
        page.value--
    }
}
</script>