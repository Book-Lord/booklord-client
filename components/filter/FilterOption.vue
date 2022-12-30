<template>
    <div class="flex items-center mb-4">
        <input id="default-checkbox" type="checkbox" v-model="checked" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ option }}</label>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const { category, option } = defineProps(['category', 'option'])

const categoryState = useState(category, () => [])

const checked = ref(categoryState.value.includes(option))

watch(checked, () => {
    if (checked.value && !categoryState.value.includes(option)) {
        
        categoryState.value.push(option)

    } else if (!checked.value && categoryState.value.includes(option)) {

        categoryState.value.splice(categoryState.value.indexOf(option), 1)
        
    }
})
</script>