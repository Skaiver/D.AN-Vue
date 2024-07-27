<script setup lang="ts">
import { ref } from 'vue'
import { setStoredSettings } from "@/composables/setStoredSettings";


const name = ref(null)
const year = ref(null)
const department = ref(null)

function updateSettings() {
  const data = {
    name: name.value,
    year: year.value,
    department: department.value
  }
  setStoredSettings(data)
}
</script>

<template>
  <main>
    <h1>Einstellungen</h1>

    <input v-model="department" type="text" name="" id="">
    <input v-model="name" type="text" name="" id="">
    <input v-model="year" type="number" name="" id="">

    <button type="button" @click="updateSettings()">Speichern</button>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
  }

  textarea {
    all: unset;
    background-color: #2f405bd6;
    border: 1px solid #4ea1f6;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-bottom: 1rem;
  }

  button {
    all: unset;
    width: 200px;
    height: 30px;
    background-color: #2f405bd6;
    border: 1px solid #4ea1f6;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    line-height: 1.9;
    margin: auto;
  }
}
</style>
