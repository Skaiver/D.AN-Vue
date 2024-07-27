<script setup lang="ts">
import { getStoredData } from "@/composables/getStoredData";
import { saveAs } from 'file-saver'


function exportAsJson() {
  const data = JSON.parse(getStoredData());
  saveAs(new Blob([data as BlobPart]), "data.json");
}
</script>

<template>
  <main>
    <h1>Vorhandene Daten exportieren</h1>

    <button type="button" @click="exportAsJson()">Als JSON herunterladen</button>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
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
