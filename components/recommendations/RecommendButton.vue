<template>
    <div class="inline-block">
        <Button @click="openModal">Recommend</Button>
        <modal v-show="showModal" @close-modal="showModal = false">
            <div v-for="(user, idx) in users" :key="idx">
                <div @click="send(user)" class="p-3 m-3 bg-zinc-200 hover:bg-slate-300 transition-all duration-300 rounded cursor-pointer">
                    <span class="font-bold">{{ user.name }}</span>
                </div>
            </div>
            <span class="text-sm text-gray-400">You can only recommend books to people you follow</span>
            <div class="w-4/5 bottom-5 bg-gray-50 rounded absolute left-1/2 transform -translate-x-1/2">
                <textarea placeholder="Type a message.. (Optional)" v-model="message" class="w-full h-36 border-2 border-gray-300 bg-white px-4 py-2 rounded-lg text-sm focus:outline-none"></textarea>
            </div>
        </modal>
    </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()
const { book } = defineProps(['book'])

const showModal = ref(false)
const users = ref([])
const message = ref('')

const user = useSupabaseUser()

const openModal = async () => {
    if (!user.value) {
        navigateTo('/login')
        return
    }

    const { data } = await useAsyncData('getFollowing', () => 
        $fetch(useRuntimeConfig().apiBase + `/users/following`,
        {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${useSupabaseToken().value}`
            }
        })
        .catch((err) => {
            toast.error('Something went wrong while searching 🔎')

            console.log(err)
            return;
        })
    )

    users.value = data?.value?.data

    showModal.value = true
}

const send = async (user) => {
    await $fetch(useRuntimeConfig().apiBase + `/recommendations`,
    {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${useSupabaseToken().value}`
        },
        body: {
            userId: user.userId,
            bookId: book,
            message: message.value
        }
    }).then( (res) => {
        showModal.value = false

        toast.success(`Recommendation sent to ${user.name}!`)
    }).catch( (err) => {
        showModal.value = false
        const { message } = err.response._data

        toast.error(`${message}`)

        console.log(err)
    })
}


</script>