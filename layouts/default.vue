<template>
    <div>
        <div class="m-auto p-6 bg-gray-50 h-24 w-screen fixed z-10">
            <span class="text-center font-bold text-3xl">Bookward</span>
            <search-bar />
        </div>
        <div class="pt-24">
            <side-bar />
            <Nuxt keep-alive class="pl-80" />
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>