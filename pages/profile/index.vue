<script setup>
definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()
const client = useSupabaseAuthClient()
const email = computed(() => user.value?.email)
const userId = computed(() => user.value?.id)
const apiBase = useRuntimeConfig().apiBase

const uri = apiBase + `/users/${userId.value}`
const userInfo = ref(null)

await $fetch(uri, { 
    method: 'post',
    body: { email: user.value?.email }
}).then( (res) => {
    console.log(res)
    userInfo.value = res
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
        <p class="mt-4">Welcome to your profile page</p>
        <p class="mt-4">Your email is:</p>
        <p>{{ email }}</p>
        <p>{{ userId }}</p>
        <br>
        <p>{{ userInfo }}</p>

        <button @click="logOut" class="mt-20 p-2 font-medium bg-green-500 rounded hover:bg-green-400">Logout</button>
    </div>
</template> 