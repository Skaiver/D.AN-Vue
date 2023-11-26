<script setup lang="ts">
import {ref, onMounted, onUpdated} from 'vue';
import EventBus from "@/events/EventBus";
import {useWeeksStore} from "@/stores/weeks";

const form = ref({})
const dialog = ref(null)

form.value.name = ""
form.value.year = ""
form.value.content = ""
form.value.department = ""
form.value.date = {}
form.value.date["start"] = ""
form.value.date["end"] = ""

onMounted(() => {
  console.log("2")

  EventBus.on('Modal.loadDialog', (week) => {
    console.log("loading:", week);
    form.value.name = week.name;
    form.value.year = week.year;
    form.value.content = week.content;
    form.value.department = week.department;
    form.value.date = week.date;
    form.value.date["start"] = week.date.start;
    form.value.date["end"] = week.date.end;
    console.log(week.date.start)
  });

  EventBus.on('Modal.openDialog', (a) => {
    dialog.value.showModal();
    // TODO issue: even in "onMounted" dialog ref is null -> how does it work originally? so on fresh page load??
  });

  EventBus.on('Modal.closeDialog', (a) => {
    dialog.value.close();

  });
})

onUpdated(() => {
  console.log("3")
})

function saveWeek(week) {
  const weekStore = useWeeksStore()
  weekStore.storeWeek(week)
}

function closeModal() {
  EventBus.trigger('Modal.closeDialog', 'penis');
}

function triggerSave() {
  console.log(this.form)
  saveWeek(this.form)
  closeModal()
}

</script>

<template>
  <dialog ref="dialog"
  :value="dialog">
    <button @click="closeModal()" autofocus>Close</button>

    <label for="name">Name</label>
    <input type="text" name="name" id="name" v-model="form.name" placeholder="Namen hier eingeben...">

    <label for="year">Ausbildungsjahr</label>
    <input type="number" name="year" id="year" v-model="form.year" placeholder="Jahr hier eingeben...">

    <label for="date_start">Startdatum</label>
    <input type="date" name="date_start" id="date_start" v-model="form.date.start"
           placeholder="Startdatum hier eingeben...">

    <label for="date_end">Enddatum</label>
    <input type="date" name="date_end" id="date_end" v-model="form.date.end" placeholder="Enddatum hier eingeben...">

    <label for="text">Inhalt</label>
    <textarea name="text" id="text" v-model="form.content" placeholder="Inhalte hier..."></textarea>

    <label for="name">Abteilung</label>
    <input type="text" name="department" id="department" v-model="form.department"
           placeholder="Abteilung hier eingeben...">

    <button @click="triggerSave()">Speichern</button>

  </dialog>
</template>

<style scoped>
dialog {
  height: 80%;
  width: 80%;
  margin: 5% auto auto;
}

dialog input, dialog label, dialog textarea {
  display: block;
  width: 75%;
  margin: 0 auto;
}

dialog input {
  height: 24px;
  width: 75%;
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
  background-color: black;
  opacity: 0.75;
}
</style>