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
        </modal>
    </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()
const { book } = defineProps(['book'])

const showModal = ref(false)
const users = ref([])

const openModal = async () => {
    const { data } = await useAsyncData('getFollowing', () => 
        $fetch(useRuntimeConfig().apiBase + `/followingUsers`,
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

    await $fetch(useRuntimeConfig().apiBase + `/recommend/${user._id}`,
    {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${useSupabaseToken().value}`
        },
        body: {
            bookId: book
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