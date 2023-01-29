<template>
    <div>
        <span>Friends</span>
        <div class="xl:w-64 w-max m-3">
            <form @submit.prevent="searchByUsername" class="">
                <input
                v-model="usernameQuery"
                type="search"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Find your friends"
                autocomplete="off"
                />
            </form>
        </div>
        <div>
            <span v-for="(user, idx) in users" :key="idx" class="inline-block" >
                <UserPreview
                    :username="user.name"
                    :userId="user.userId"
                />
            </span>
        </div>
    </div>
</template>

<script setup>
import UserPreview from '~~/components/users/UserPreview.vue';

const usersState = useState('users', () => [])

const usernameQuery = ref('')
const users = ref(usersState.value)

const searchByUsername = async () => {
    if (usernameQuery.value.length > 0)
    {       
        const username = usernameQuery.value.trim()

        const { data } = await useAsyncData('getUsers', () => 
            $fetch(useRuntimeConfig().apiBase + `/searchUsers/${username}`)
        )
        
        users.value = data?.value
        usersState.value = data?.value

        console.log(users?.value[0])
    }
    else
    {
        users.value = []
        usersState.value = []
    }
}

</script>