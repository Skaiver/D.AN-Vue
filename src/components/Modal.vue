<script setup lang="ts">
import { ref, onMounted, onUpdated, type Ref } from 'vue'
import EventBus from '@/events/EventBus'
import { useWeeksStore } from '@/stores/weeks'
import type { modalFormType } from './interfaces/ModalFormType'

const weekStore = useWeeksStore()

const defultFormObject: modalFormType = {
  name: '',
  year: '',
  content: '',
  department: '',
  isDone: false,
  date: {
    start: '',
    end: ''
  }
}
const form: Ref<modalFormType> = ref(defultFormObject)
const dialog: Ref<HTMLDialogElement | null> = ref(null)

form.value.name = ''
form.value.year = ''
form.value.content = ''
form.value.department = ''
form.value.isDone = false
form.value.date['start'] = ''
form.value.date['end'] = ''

onMounted(() => {
  EventBus.on('Modal.loadDialog', (week: modalFormType) => {
    console.log('loading:', week)
    form.value.name = week.name
    form.value.year = week.year
    form.value.content = week.content
    form.value.department = week.department
    form.value.date = week.date
    form.value.isDone = week.isDone
    form.value.date['start'] = week.date.start
    form.value.date['end'] = week.date.end
  })

  EventBus.on('Modal.openDialog', () => {
    dialog.value?.showModal()
  })

  EventBus.on('Modal.closeDialog', () => {
    dialog.value?.close()
  })
})

onUpdated(() => {})

function saveWeek(week: modalFormType) {
  weekStore.storeWeek(week)
}

function closeModal() {
  EventBus.trigger('Modal.closeDialog', null)
}

function triggerSave() {
  saveWeek(form.value)
  closeModal()
  EventBus.trigger('DashboardView.forceRerender', null);
}
</script>

<template>
  <dialog ref="dialog">
    <label for="name">Name</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="form.name"
      placeholder="Namen hier eingeben..."
    />

    <label for="year">Ausbildungsjahr</label>
    <input
      type="number"
      name="year"
      id="year"
      v-model="form.year"
      placeholder="Jahr hier eingeben..."
    />

    <label for="date_start">Startdatum</label>
    <input
      type="date"
      name="date_start"
      id="date_start"
      v-model="form.date.start"
      placeholder="Startdatum hier eingeben..."
    />

    <label for="date_end">Enddatum</label>
    <input
      type="date"
      name="date_end"
      id="date_end"
      v-model="form.date.end"
      placeholder="Enddatum hier eingeben..."
    />

    <label for="text">Inhalt</label>
    <textarea name="text" id="text" v-model="form.content" placeholder="Inhalte hier..."></textarea>

    <label for="name">Abteilung</label>
    <input
      type="text"
      name="department"
      id="department"
      v-model="form.department"
      placeholder="Abteilung hier eingeben..."
    />

    <label for="isDone">Eintrag abhaken?</label>
    <input
      type="checkbox"
      name="isDone"
      id="isDone"
      v-model="form.isDone"
    />

    <div class="actions">
      <button class="btn btn-danger" @click="closeModal()" autofocus>Close</button>
      <button class="btn btn-success" @click="triggerSave()">Speichern</button>
    </div>
  </dialog>
</template>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

dialog {
  height: 80%;
  width: 80%;
  margin: 5% auto auto;
  background-color: #2f405b;
  color: #6f7fa5;
  border: unset;
}

dialog input,
dialog label,
dialog textarea {
  display: block;
  width: 97%;
  /* margin: 0 auto; */
  background-color: #2f405b;
  border-color: #6f7fa5;
}

dialog input {
  color: white;
  height: 24px;
  width: 95%;
  /* margin-left: auto; */
  /* margin-right: auto; */
  margin-bottom: 0.2rem;
  border: 1px solid black;
  padding: 5px;
  border-radius: 2px;
  background-color: #2f405b;
  border: 1px solid #6f7fa5;
}

dialog input[type="checkbox"] {
  height: 15px;
  aspect-ratio: 1 / 1;
  width: unset;
}

dialog textarea {
  color: white;
  padding: 2px;
  border-radius: 2px;
  border: 1px solid #6f7fa5;
}

dialog::backdrop {
  background-color: black;
  opacity: 0.75;
}
</style>
