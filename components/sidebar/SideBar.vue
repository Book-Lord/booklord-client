<!-- TODO: export it to nuxt layout -->
<script setup>
const user = useSupabaseUser()

const email = computed(() => user.value?.email)

</script>

<template>    
    <div :class="{ 'w-76': sidebarToggle, 'w-12': !sidebarToggle, }" class="absolute transition-all duration-300 shadow rounded mt-3 overflow-x-clip">
      <div :class="{ 'px-6': sidebarToggle, 'px-1': !sidebarToggle, }" class=" overflow-hidden h-[90vh] flex flex-col py-4 bg-gray-50 rounded dark:bg-gray-800 transition-all duration-300">
         <span :class="{ 'text-gray-50': !sidebarToggle }" class="text-center font-bold text-3xl py-6 transition-all duration-300">Book<span class="text-purple-500">ward</span></span>
         <ul class="space-y-2">
            <SideBarLink title="Home" navigation="/">
               <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </SideBarLink>

            <SideBarLink title="Explore" navigation="/explore">
               <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </SideBarLink>

            <SideBarLink title="Categories" navigation="/" :newSection="true">
               <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
            </SideBarLink>

            <SideBarLink title="Friends" navigation="/" :notifications="3">
               <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </SideBarLink>

            <SideBarLink title="Saved Books" navigation="/">
               <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path>
            </SideBarLink>

            <SideBarLink title="Preferences" navigation="/profile">
               <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path>
            </SideBarLink>
         </ul>
         <div v-if="sidebarToggle" class="object-none object-bottom">
            <p class="text-gray-300"> {{ email }}</p>
         </div>
         <div v-if="sidebarToggle" class="abosulte mt-auto">
            <span class="font-medium m-2 text-gray-400">Currently reading</span>
            <br/>
            <div class="h-14 bg-white w-70 mt-2 shadow transition-all duration-300 rounded-md">
               <!-- <span class="font-semibold">The Princess Bride</span> -->
            </div>
         </div>
      </div>
    </div>
</template>

<script>
import SideBarLink from '~/components/sidebar/SideBarLink.vue'

export default {
   data() {
      return {
         sidebarToggle: false
      }
   },
   components: {
      SideBarLink
   },
   mounted() {
      if (this.$route.path === '/')
      {
         this.sidebarToggle = true;
      } 
      else {
         this.sidebarToggle = false;
      }
   },
   watch: {
      $route(to, from) {
         if (to.path === '/')
         {
            this.sidebarToggle = true;
         } 
         else {
            this.sidebarToggle = false;
         }
      },
   },
}
</script>
