<template>
    <div class="m-auto p-6 bg-gray-50 h-24 w-screen fixed z-10">
        <span class="text-center font-bold text-3xl">Bookward</span>
        <div class="xl:w-96 float-right">
            <input
            id="exampleSearch"

            type="search"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Find a book"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "TopBar"
}
</script>