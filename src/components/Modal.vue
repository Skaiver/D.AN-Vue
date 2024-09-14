<script setup lang="ts">
import { ref, onMounted, onUpdated, type Ref } from 'vue'
import EventBus from '@/events/EventBus'
import { useWeeksStore } from '@/stores/weeks'
import type { modalFormType } from './interfaces/ModalFormType'
import ModalForm from '@/components/classes/ModalForm'

const weekStore = useWeeksStore()

const form: Ref<ModalForm> = ref(ModalForm.getNew())
const dialog: Ref<HTMLDialogElement | null> = ref(null)

onMounted(() => {
  EventBus.on('Modal.loadDialog', (week: modalFormType) => {
    console.log('loading:', week)
    // form.value.name = week.name
    // form.value.year = week.year
    // form.value.companyContent = week.companyContent
    // form.value.companyLearnings = week.companyLearnings
    // form.value.schoolContent = week.schoolContent
    // form.value.date = week.date
    // form.value.isDone = week.isDone
    // form.value.date['start'] = week.date.start
    // form.value.date['end'] = week.date.end

    // Dynamische Zuweisung der Werte aus week zu form.value
    Object.keys(ModalForm.getNew()).forEach((key) => {
      if (key !== 'date') {
        // Direkte Zuweisung für einfache Felder
        (form.value as any)[key] = (week as any)[key];
      } else {
        // Spezielle Behandlung für das date-Objekt
        form.value.date = { ...week.date } // Kopiere das date-Objekt
        form.value.date.start = week.date.start
        form.value.date.end = week.date.end
      }
    })
  })

  EventBus.on('Modal.openDialog', () => {
    dialog.value?.showModal()
  })

  EventBus.on('Modal.closeDialog', () => {
    dialog.value?.close()
  })
})

onUpdated(() => {})

function saveWeek(week: ModalForm) {
  weekStore.storeWeek(week)
}

function closeModal() {
  EventBus.trigger('Modal.closeDialog', null)
}

function triggerSave() {
  saveWeek(form.value)
  closeModal()
  EventBus.trigger('DashboardView.forceRerender', null)
}
</script>

<template>
  <dialog ref="dialog">
    <h2>Ausbildungsnachweis (Wöchentlich)</h2>

    <div class="first-row">
      <div>
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model="form.name"
          placeholder="Namen hier eingeben..."
        />
      </div>

      <div>
        <label for="year">Ausbildungsjahr</label>
        <input
          type="number"
          name="year"
          id="year"
          v-model="form.year"
          placeholder="Jahr hier eingeben..."
        />
      </div>

      <div>
        <label for="date_start">Startdatum</label>
        <input
          type="date"
          name="date_start"
          id="date_start"
          v-model="form.date.start"
          placeholder="Startdatum hier eingeben..."
        />
      </div>

      <div>
        <label for="date_end">Enddatum</label>
        <input
          type="date"
          name="date_end"
          id="date_end"
          v-model="form.date.end"
          placeholder="Enddatum hier eingeben..."
        />
      </div>
    </div>

    <div class="second-row">
      <div>
        <label for="text">Betriebliche Tätigkeiten</label>
        <textarea
          name="text"
          id="text"
          v-model="form.companyContent"
          placeholder="Inhalte hier..."
        ></textarea>
      </div>

      <div>
        <label for="text">Betriebliche Schulungen</label>
        <textarea
          name="text"
          id="text"
          v-model="form.companyLearnings"
          placeholder="Inhalte hier..."
        ></textarea>
      </div>

      <div>
        <label for="text">Berufsschulunterricht</label>
        <textarea
          name="text"
          id="text"
          v-model="form.schoolContent"
          placeholder="Inhalte hier..."
        ></textarea>
      </div>
    </div>

    <div class="checkbox-div">
      <label for="isDone">Eintrag abhaken?</label>
      <input type="checkbox" name="isDone" id="isDone" v-model="form.isDone" />
    </div>

    <div class="actions">
      <button class="btn btn-abort" @click="closeModal()">Close</button>
      <button class="btn btn-save" @click="triggerSave()">Wocheneintrag speichern</button>
    </div>
  </dialog>
</template>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.checkbox-div {
  display: flex;
  justify-content: right;
  label {
    width: unset;
  }
}

dialog {
  --border-radius: 3px;
  height: 80%;
  width: 80%;
  margin: 5% auto auto;
  background-color: #2f405b;
  color: #6f7fa5;
  border: unset;
  border-radius: 5px;

  @media screen and (min-width: 768px) {
    --border-radius: 7px;
    width: 90%;
  }
}

dialog h2 {
  margin: 0;
  margin-bottom: 1rem;
  color: white;
  font-weight: 300;
}

dialog input,
dialog label,
dialog textarea {
  display: block;
  width: 97%;
  background-color: #2f405b;
  border-color: #6f7fa5;
}

dialog input {
  color: white;
  height: 24px;
  width: 95%;
  margin-bottom: 0.2rem;
  border: 1px solid black;
  padding: 5px 7px;
  border-radius: var(--border-radius);
  background-color: #2f405b;
  border: 2px solid #6f7fa5;
  &::placeholder {
    color: white;
  }
}

dialog input[type='checkbox'] {
  height: 15px;
  aspect-ratio: 1 / 1;
  width: unset;
}


dialog textarea {
  color: white;
  padding: 2px;
  border-radius: var(--border-radius);
  border: 2px solid #6f7fa5;
}

.first-row {
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 10px;

    div {
      width: 25%;
    }

    label {
      margin-bottom: 5px;
      width: 100%;
    }

    label,
    input {
      display: block;
    }

    input {
      padding: 5px 10px;
      padding-right: 0;
    }
  }
}

.second-row {
  @media screen and (min-width: 768px) {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px; /* Passe den Wert nach Bedarf an */

    > div {
      width: 100%;
    }

    textarea {
      width: 99%;
      min-height: 200px;
      padding: 5px 10px;
      padding-right: 0;

      &::placeholder {
        color: white;
      }
    }
  }
}

dialog::backdrop {
  background-color: black;
  opacity: 0.45;
}
</style>
