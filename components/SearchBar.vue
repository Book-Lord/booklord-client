<template>
    <div class="xl:w-96 float-right">
        <form @submit.prevent="searchByName">
            <input
            id="exampleSearch"
            v-model="query"
            type="search"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Find a book"
            />
        </form>
    </div>
</template>

<script>
export default {
    name: "SearchBar",
    data() {
        return {
            query: ""
        }
    },
    watch: {
        $route (to, from){
            this.query = "";
        }
    },
    methods: {
        searchByName() {
            if (this.query.length > 0)
            {
                this.$router.push({path: 'search', query: {title: this.query}});
            } else 
            {
                this.$router.push({path: 'explore'});
            }
        }
    },
}
</script>