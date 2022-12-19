<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const email_form = ref('')
const password_form = ref('')
const is_signUp = ref(false)

const supa_client = useSupabaseClient()
const supa_user = useSupabaseUser()

const signUp = async () => {
  const { error } = await supa_client.auth.signUp({
    email: email_form.value,
    password: password_form.value,
  })

  console.log('error', error)
}

const login = async () => {
  const { error } = await supa_client.auth.signInWithPassword({
    email: email_form.value,
    password: password_form.value,
  })

  if (error) {
    console.log('error', error)
    return
  }
}

watchEffect(() => {
  if (supa_user.value) {
    navigateTo('/explore')
  }
})
</script>

<template>
  <div class="max-w-lg mx-auto mt-8">
    <h1 class="text-3xl font-black">Log into your account</h1>
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
