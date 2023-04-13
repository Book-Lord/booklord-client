<script setup>
import UserPreview from '~~/components/users/UserPreview.vue';
import ReviewsReview from '~~/components/reviews/ReviewPreview.vue';

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
const topGenres = ref(null)
const showFollowing = ref(true)

// Get additional user info
await $fetch(uri, { 
    method: 'get',
    headers: { 'Authorization': `Bearer ${useSupabaseToken().value}` }
}).then( (res) => {
    userInfo.value = res
    books.value = res.savedBooks
    topGenres.value = res.topGenres
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
        <div class="m-8">
            <div class="bg-indigo-100 rounded p-8">
                <span class="text-3xl font-thin">{{ userInfo?.name + "'s profile" }}</span>
                <div class="mt-4" v-if="email">
                    <p>Email: {{ email }}</p>
                </div>

                <div v-if="userId">
                    <p>UUID: {{ userId }}</p>
                </div>
            </div>
            <div class="grid gap-4 grid-cols-3 grid-rows-1 mt-8 max-h-[50vh] relative">
                <div class="m-4 bg-indigo-100 rounded p-8 overflow-y-scroll">
                    <span class="text-3xl font-thin bg-indigo-100">Reviews</span>
                    <div>
                        <div v-for="review in userInfo?.reviews" :key="review._id">
                            <ReviewsReview :review="review" />
                        </div>
                    </div>
                </div>
                <div class="m-4 bg-indigo-100 rounded p-8 overflow-y-scroll">
                    <span class="text-3xl font-thin">Most Liked Genres</span>
                    <div>
                        <div v-for="(genre, idx) in topGenres" :key="idx" class="m-2 mt-8 text-xl">
                            <span class="capitalize">{{ (idx + 1) }}. {{ genre }}</span>
                        </div>
                    </div>
                </div>
                <div class="m-4 bg-indigo-100 rounded p-8 overflow-y-scroll">
                    <div v-if="showFollowing">
                        <span @click="showFollowing = !showFollowing" class="text-3xl font-thin cursor-pointer">Following</span>
                        <div>
                            <div v-for="user in userInfo?.following" :key="user._id">
                                <UserPreview
                                :username="user.name"
                                :userId="user.userId"
                                :hideFollowing="true"
                                />
                            </div>
                        </div>
                    </div>
                    <div v-if="!showFollowing">
                        <span @click="showFollowing = !showFollowing" class="text-3xl font-thin cursor-pointer">Followers</span>
                        <div>
                            <div v-for="user in userInfo?.followers" :key="user._id">
                                <UserPreview
                                :username="user.name"
                                :userId="user.userId"
                                :hideFollowing="true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <br>
        <button @click="logOut" class="mt-20 p-2 font-medium bg-red-300 rounded hover:bg-red-200 transition-all">Logout</button>
    </div>
</template> 