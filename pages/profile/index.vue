<script setup>
definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()
const client = useSupabaseAuthClient()
const email = computed(() => user.value?.email)
const userId = computed(() => user.value?.id)
const apiBase = useRuntimeConfig().apiBase

const books = useState('books', () => [])

const uri = apiBase + `/users/${userId.value}`
const userInfo = ref(null)

await $fetch(uri, { 
    method: 'post',
    body: { 
        userId: userId.value,
        email: user.value?.email 
    }
}).then( (res) => {
    userInfo.value = res
    console.log(res)
    books.value = res.savedBooks
}).catch( (err) => {
    console.error(err);
})

const logOut = () => {
    client.auth.signOut()

    navigateTo('/explore')
}


onMounted(() => {
    if (!user.value) {
        navigateTo('/login')
    }
})
</script>

<template>
    <div>
        <h1 class="text-3xl font-black">Profile</h1>

        <div v-if="email">
            <p>{{ email }}</p>
        </div>
        <error-loading error="Unable to get user email" v-else />

        <div v-if="userId">
            <p>{{ userId }}</p>
        </div>
        <error-loading error="Unable to get user ID" v-else />

        <div>
            <span>{{  userInfo.reviews }}</span>
        </div>
        <br>
        <span class="text-3xl font-thin text-gray-400">Saved books</span>
        <books-browser />

        <button @click="logOut" class="mt-20 p-2 font-medium bg-green-500 rounded hover:bg-green-400">Logout</button>
    </div>
</template> 