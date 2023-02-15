import { defineNuxtPlugin } from '#app'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import * as pkg from "vue-toastification"

const { useToast } = pkg

export default defineNuxtPlugin((nuxtApp) => {
    const options = {
        position: 'bottom-left'
    }

    nuxtApp.vueApp.use(Toast, options)
})