<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getStoredSettings } from '@/composables/getStoredSettings'

const name = ref('')
const hasName = ref(false)

onMounted(() => {
  try {
    const rawSettings = getStoredSettings()
    const settings = JSON.parse(rawSettings)
    console.log(settings.name)
    console.log(settings.name.length)
    name.value = settings.name.length >= 1 ? settings.name : 'Malte'
    hasName.value = true;
  } catch (e) {
    name.value = 'Malte'
  }
})
</script>

<template>
  <header>
    <div class="message">
      <h2 v-if="hasName">Hallo {{ name }}</h2>
      <h2 v-else class="tooltip">Hallo {{ name }} <span class="tooltiptext">Änderbar in den Einstellungen 👍</span></h2>
      <p>Hier sind deine Ausbildungsnachweise</p>
    </div>

    <nav>
      <RouterLink to="/">Dashbaord</RouterLink>
      <RouterLink to="/export">Export</RouterLink>
      <RouterLink to="/import">Import</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  font-family: 'Roboto Mono', sans-serif;
  font-weight: 300;
  margin-bottom: 1rem;

  .message {
    h2 {
      font-size: 1.2rem;
      font-weight: 400;
      display: inline-block;
      margin-top: 0;
      margin-bottom: 0;

      @media screen and (min-width: 768px) {
        font-size: 1.5rem;
      }
    }

    p {
      font-size: 1rem;
      font-weight: 300;
      margin-top: 0;
      margin-bottom: 0.5rem;

      @media screen and (min-width: 768px) {
        font-size: 1.2rem;
      }
    }

    margin-bottom: 0.5rem;
    background-color: #4ea1f6;
    color: white;
    padding: 5px 10px;
    border-radius: 5px 5px 0 0;
  }
}

nav {
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 10px;
}

nav a {
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-height: 100px;
  aspect-ratio: 16 / 9;
  background-color: #2f405b;
  border: #649ff0 1px solid;
  border-radius: 4px;
  color: #6f7fa5;
}

@media screen and (min-width: 425px) {
  nav a {
    height: 80px;
    width: 100%;
  }
}

@media screen and (min-width: 768px) {
  nav {
    display: flex;
    justify-content: flex-end;
    gap: 0;
  }

  nav a {
    all: unset;
    display: inline-block;
    padding: 30px 40px;
    border: 1px solid;
    border-radius: 3px;
    background-color: #2f405bd6;

    :not(&:last-of-type) {
      border-right: 0;
    }
  }
}
</style>
