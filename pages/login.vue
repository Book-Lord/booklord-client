<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()

// Add authentication middleware to the page
definePageMeta({
  middleware: ['auth'],
})

useHead({
  title: 'Login into BookWard',
})


// Define the props that the page accepts
const email_form = ref('')
const password_form = ref('')
const username = ref('')
const is_signUp = ref(false)

const supa_client = useSupabaseClient()
const supa_user = useSupabaseUser()

const apiBase = useRuntimeConfig().apiBase

// Sign up a new user
const signUp = async () => {
  const { data, error } = await supa_client.auth.signUp({
    email: email_form.value,
    password: password_form.value,
  })

  if (error) {
    console.log('error', error)
    toast.error('Something went wrong while signing up 😢\n' + error.message)
  }

  await supa_client
    .from('usernames')
    .insert([{ username: username.value, userid: data.user.id }]);

  const uri = apiBase + `/users`

  await $fetch(uri, { 
  method: 'post',
  body: { 
      userId: data.user.id,
      email: email_form.value,
      username: username.value,
    }
  })

  // Set the cookies & user
  const accessToken = useCookie('sb-access-token')
  const refreshToken = useCookie('sb-refresh-token')
  accessToken.value = data.session?.access_token ?? null
  refreshToken.value = data.session?.refresh_token ?? null
  supa_user.value = data.user
}

// Login an existing user
const login = async () => {
  const { data, error } = await supa_client.auth.signInWithPassword({
    email: email_form.value,
    password: password_form.value,
  })

  if (error) {
    console.log('error', error)
    toast.error('Something went wrong while logging in 😢\n' + error.message)
    return
  }

  // Set the cookies & user
  const accessToken = useCookie('sb-access-token')
  const refreshToken = useCookie('sb-refresh-token')
  accessToken.value = data.session?.access_token ?? null
  refreshToken.value = data.session?.refresh_token ?? null
  supa_user.value = data.user
}

// Redirect to the explore page if the user is already logged in
watchEffect(() => {
  if (supa_user.value) {
    navigateTo('/explore')
  }
})
</script>

<template>
  <div class="max-w-lg mx-auto mt-8">
    <h1 class="text-3xl font-black">{{ is_signUp ? "Register an account" : "Log into your account" }}</h1>
    <form
      class="flex flex-col gap-2 mt-16"
      @submit.prevent="() => (is_signUp ? signUp() : login())"
    >
      <input
        v-model="email_form"
        type="email"
        placeholder="Email"
        class="p-2 rounded bg-charcoal-600"
      />
      <input
        v-model="password_form"
        type="password"
        placeholder="Password"
        class="p-2 rounded bg-charcoal-600"
      />
      <input
        v-if="is_signUp"
        v-model="username"
        type="text"
        placeholder="Username"
        class="p-2 rounded bg-charcoal-600"
      />
      <button
        type="submit"
        class="p-2 font-medium bg-green-500 rounded hover:bg-green-400"
      >
        <span v-if="is_signUp"> Sign up </span>
        <span v-else> Log in </span>
      </button>
    </form>
    <button
      class="w-full mt-8 text-sm text-center underline text-slate-300"
      @click="is_signUp = !is_signUp"
    >
      <span v-if="is_signUp"> Have an account? Log in instead </span>
      <span v-else> Create a new account </span>
    </button>
  </div>
</template>