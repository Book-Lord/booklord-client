<template>
    <div>
        <li>
            <NuxtLink :to="navigation" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <slot/>
                </svg>
                <span  class="flex-1 ml-3 whitespace-nowrap">{{ title }}</span>
                <span v-if="newSection" class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">New!</span>
                <span v-if="notifications > 0" class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
            </NuxtLink>
        </li>
    </div>
</template>

<script>
export default {
    name: 'SideBarLink',
    props: {
        title: {
            type: String,
            required: true
        },
        navigation: {
            type: String,
            required: true
        },
        notifications: {
            type: Number,
            required: false,
            default: 0
        },
        newSection: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>