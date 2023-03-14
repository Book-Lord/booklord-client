<template>
    <div>
        <span class="text-3xl font-thin text-gray-400">Social</span>

        <div class="xl:w-64 w-max m-3">
            <form @submit.prevent="searchByUsername" class="">
                <input
                v-model="usernameQuery"
                type="search"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search"
                autocomplete="off"
                />
            </form>
        </div>
        <div>
            <span v-for="(user, idx) in users" :key="idx" class="inline-block" >
                <UserPreview
                    :username="user.name"
                    :userId="user.userId"
                    :isFollowing="user?.isFollowing"
                />
            </span>
        </div>
        <div v-if="users.length == 0" class="block ml-auto mr-auto text-center mt-28">
            <img src="~/assets/search.png" class="w-1/4 ml-auto mr-auto" />
            <span class="text-2xl font-mono">Search for your friends...</span>
        </div>
    </div>
</template>

<script setup>
import UserPreview from '~~/components/users/UserPreview.vue';
import { useToast } from 'vue-toastification'

const toast = useToast()

const usersState = useState('users', () => [])

const usernameQuery = ref('')
const users = ref(usersState.value)

const searchByUsername = async () => {
    // If the query is empty, clear the users list
    if (usernameQuery.value.length < 1)
    {
        users.value = []
        usersState.value = []

        return
    }
      
    // Format the query
    const username = usernameQuery.value.trim()

    // Send the request
    const { data } = await useAsyncData('getUsers', () => 
        $fetch(useRuntimeConfig().apiBase + `/users/search?username=${username}`,
        {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${useSupabaseToken().value}`
            }
        })
        .catch((err) => {
            toast.error('Something went wrong while searching 🔎')
            console.log(err)
            })
    )

    if (data?.value.length == 0)
        toast.info('No users found with that username 🤷‍♂️')
    
    // Set the state
    users.value = data?.value
    usersState.value = data?.value
}

</script>