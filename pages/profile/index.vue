<script setup>
definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()
const client = useSupabaseAuthClient()
const email = computed(() => user.value?.email)

console.log(user.value)

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

        <button @click="client.auth.signOut()" class="mt-20 p-2 font-medium bg-green-500 rounded hover:bg-green-400">Logout</button>
    </div>
</template> 