<script setup lang="ts">
import { ref } from 'vue'
import { setStoredData } from "@/composables/setStoredData";


const jsonText = ref("")

function importFromJsonText() {
  setStoredData(jsonText.value)
}
</script>

<template>
  <main>
    <h1>Vorhandene Daten überschreiben</h1>

    <textarea v-model="jsonText" cols="30" rows="10"></textarea>

    <button type="button" @click="importFromJsonText()">Überschreiben</button>
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
