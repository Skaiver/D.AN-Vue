<script setup lang="ts">
import { ref } from 'vue'
import { setStoredSettings } from '@/composables/setStoredSettings'
import { setStoredData } from '@/composables/setStoredData'

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

function deleteData() {
  setStoredData([])
  setStoredSettings({})
}
</script>

<template>
  <main>
    <h1>Einstellungen</h1>

    <form action="">
      <label for="name">Name: </label>
      <input v-model="name" type="text" name="name" id="name" />

      <label for="department">Abteilung: </label>
      <input v-model="department" type="text" name="department" id="department" />

      <label for="year">Jahr: </label>
      <input v-model="year" type="number" name="year" id="year" />

      <button type="button" class="btn" @click="updateSettings()">Speichern</button>
    </form>

    <button class="btn btn-danger" @click="deleteData()">Daten löschen</button>
  </main>
</template>

<style scoped>
main {
  h1 {
    text-align: center;
  }

  form {
    margin: auto;
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 768px) {
      width: 480px;
    }

    input {
      border: 1px solid #4ea1f6;
      border-radius: 3px;
      padding: 5px 2px;
      margin-bottom: 0.6rem;
      background-color: #2f405bcc;
    }

    input:-internal-autofill-selected {
      background-color: #2f405bcc !important;
    }

    button {
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

  button {
    margin-top: 1rem;
  }
}
</style>
