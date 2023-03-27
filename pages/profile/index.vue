<script setup>
definePageMeta({
  middleware: ['auth']
})

// Define page's state
const user = useSupabaseUser()
const client = useSupabaseAuthClient()
const email = computed(() => user.value?.email)
const userId = computed(() => user.value?.id)

const books = useState('books', () => [])

const uri = useRuntimeConfig().apiBase + `/users/info/${userId.value}`
const userInfo = ref(null)

// Get additional user info
await $fetch(uri, { 
    method: 'get',
    headers: { 'Authorization': `Bearer ${useSupabaseToken().value}` }
}).then( (res) => {
    userInfo.value = res
    books.value = res.savedBooks
}).catch( (err) => {
    console.error(err);
})

const logOut = () => {
    client.auth.signOut()

    navigateTo('/explore')
}

// Redirect to login if user is not authenticated
onMounted(() => {
    if (!user.value) {
        navigateTo('/login')
    }
})
</script>

<template>
    <div> 
        <span class="text-3xl font-thin text-gray-400">{{ userInfo?.name + "'s profile" }}</span>

        <div v-if="email">
            <p>Email: {{ email }}</p>
        </div>
        <error-loading error="Unable to get user email" v-else />

        <div v-if="userId">
            <p>UUID: {{ userId }}</p>
        </div>
        <error-loading error="Unable to get user ID" v-else />
        <br>
        <div>
            <span class="text-3xl font-thin">Reviews: </span>
            <div>
                <div v-for="review in userInfo?.reviews" :key="review._id">
                    <span>{{ review.content }}</span>
                </div>
            </div>
            <!-- <span>{{ userInfo?.reviews }}</span> -->
        </div>
        <br>
        <div>
            <span class="text-3xl font-thin">Following: </span>
            <div>
                <div v-for="user in userInfo?.following" :key="user._id">
                    <span>{{ user.name }} - {{ user.email }}</span>
                </div>
            </div>
        </div>
        <br>
        <div>
            <span class="text-3xl font-thin">Followers: </span>
            <div>
                <div v-for="user in userInfo?.followers" :key="user._id">
                    <span>{{ user.name }} - {{ user.email }}</span>
                </div>
            </div>
        </div>
        <br>

        <button @click="logOut" class="mt-20 p-2 font-medium bg-green-500 rounded hover:bg-green-400">Logout</button>
    </div>
</template> 