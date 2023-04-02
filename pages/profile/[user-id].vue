<script setup>
import { useToast } from 'vue-toastification'
const toast = useToast()
const { userid } = useRoute().params
const userInfo = ref(null)
const books = ref(null)
const uri = useRuntimeConfig().apiBase + `/users/info/get/${userid}`

await $fetch(uri, { 
    method: 'get',
}).then( (res) => {
    userInfo.value = res
    books.value = res.savedBooks
}).catch( (err) => {
    console.error(err);
    toast.error('Failed retrieving data: Invalid user 🔎')

    userInfo.value = null
})

</script>

<template>
    <div>
        <span class="text-3xl font-thin text-gray-400">{{ userInfo?.name + "'s profile" }}</span>
        <br><br>
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
    </div>
</template>