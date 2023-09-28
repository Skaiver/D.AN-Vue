<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Dashbaord</RouterLink>
      <RouterLink to="/export">Export</RouterLink>
      <RouterLink to="/import">Import</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
    </nav>
  </header>

  <RouterView/>
</template>

<style scoped>

</style>
