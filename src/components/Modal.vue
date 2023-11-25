<script setup lang="ts">
import {ref, onMounted, onUpdated} from 'vue';
import EventBus from "@/events/EventBus";
import {useWeeksStore} from "@/stores/weeks";

const form = ref({})
const dialog = ref(null)

form.value.name = "ABC"
form.value.year = "1"
form.value.text = "nichts"

onMounted(() => {
  console.log("2")

  EventBus.on('Modal.loadDialog', (week) => {
    form.value.name = week.name;
  });

  EventBus.on('Modal.openDialog', (a) => {
    console.log(dialog.value)
    dialog.value.showModal();
  });

  EventBus.on('Modal.closeDialog', (a) => {
    console.log("ppppenis", a)
    dialog.value.close();

  });
})

onUpdated(() => {
  console.log("3")
})

function saveWeek(week) {
  const weekStore = useWeeksStore()
  weekStore.storeWeek(week)
  console.log(weekStore.weeks)
}

function closeModal() {
  EventBus.trigger('Modal.closeDialog', 'penis');
}

function triggerSave() {
  console.log(this.form)
  saveWeek(this.form) // TODO make sure only right object gets saved
  // TODO make isValidWeekObject method
  // TODO interface?
}

function submit() {
  // stuff here
}

</script>

<template>
  <dialog ref="dialog">
    <button @click="closeModal()" autofocus>Close</button>

    <label for="name">Name</label>
    <input type="text" name="name" id="name" v-model="form.name" placeholder="Namen hier eingeben...">

    <label for="year">Ausbildungsjahr</label>
    <input type="number" name="year" id="year" v-model="form.year" placeholder="Jahr hier eingeben...">

    <label for="text">Inhalt</label>
    <textarea name="text" id="text" v-model="form.text" placeholder="Inhalte hier..."></textarea>

    <label for="name">Abteilung</label>
    <input type="text" name="department" id="department" v-model="form.department"
           placeholder="Abteilung hier eingeben...">


  </dialog>
  <button @click="triggerSave()">Ergebnisse</button>
</template>

<style scoped>
dialog {
  height: 70%;
  width: 50%;
  margin: 5% auto auto;
}

dialog input, dialog label, dialog textarea {
  display: block;
  width: 50%;
  margin: 0 auto;
}

dialog input {
  height: 24px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2%;
  border: 1px solid black;
  padding: 5px;
  border-radius: 2px;
}

dialog textarea {
  border: 1px solid black;
  padding: 2px;
  border-radius: 2px;
}

dialog::backdrop {
  background-color: red;
  opacity: 0.75;
}
</style>