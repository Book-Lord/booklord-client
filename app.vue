<template>
  <div>
      <div class="m-auto p-6 bg-gray-50 h-24 fixed">
          <SideBar />
      </div>
      <div class="pl-80 pt-12">
          <NuxtPage :key="$route.fullPath" keep-alive />
      </div>
  </div>
</template>

<script>
export default {
}
</script>