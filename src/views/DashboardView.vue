<script setup lang="ts">
import EventBus from '@/events/EventBus'
import { computed, ref, onUpdated, onMounted, watch } from 'vue'
import { useWeeksStore } from '@/stores/weeks'
import { Sorting } from '@/composables/Sorting'

const weekStore = useWeeksStore()

const componentKey = ref(0)
const storedWeeks = ref([] as Object[])

function emitOpenModalEvent() {
  EventBus.trigger('Modal.openDialog', null)
}

function hasWeeks() {
  return storedWeeks.value === ([] as Object[])
}

onMounted(() => {
  const weeks = weekStore.getWeeks() ?? []
  const sortedWeeks = Sorting(weeks)
  storedWeeks.value = sortedWeeks as Object[]
  console.log(storedWeeks.value)
})

const forceRerender = () => {
  componentKey.value += 1
  const weeks = weekStore.getWeeks() ?? []
  const sortedWeeks = Sorting(weeks)
  storedWeeks.value = sortedWeeks as Object[]
}

EventBus.on('DashboardView.forceRerender', () => {
  forceRerender()
})
</script>

<script lang="ts">
import MonthListing from '@/components/MonthListing.vue'
import Modal from '@/components/Modal.vue'

export default {
  components: {
    MonthListing,
    Modal
  }
}
</script>

<template>
  <main>
    <Modal :key="componentKey" />

    <MonthListing
      v-if="hasWeeks()"
      v-for="(weeks, monthNumber) in storedWeeks"
      :monthName="monthNumber"
      :weeks="weeks as any"
      :key="componentKey"
    />
    <div v-else>
      <div class="do-work-message">
        <h3>Ziemlich tote Hose hier...</h3>
        <p>Hast du nicht ein paar Berichtshefte zu schreiben?</p>
        <small>Tipp: Drücke auf das Plus unten rechts</small>
      </div>
    </div>
  </main>

  <div class="quick-actions">
    <button @click="emitOpenModalEvent()">+</button>
  </div>
</template>

<style scoped>
.do-work-message {
  background-color: #2f405b;
  border: 1px solid #4ea1f6;
  border-radius: 4px;
  padding: 5px 10px;

  @media screen and (min-width: 768px) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 450px;
  }

  @media screen and (min-width: 1024px) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 750px;
  }

  h3 {
    margin: 0;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
