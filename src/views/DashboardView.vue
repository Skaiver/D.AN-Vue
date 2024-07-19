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

onMounted(() => {
  const weeks = weekStore.getWeeks() ?? []
  const sortedWeeks = Sorting(weeks)
  storedWeeks.value = sortedWeeks as Object[]
})

const forceRerender = () => {
  componentKey.value += 1
  const weeks = weekStore.getWeeks() ?? []
  const sortedWeeks = Sorting(weeks)
  storedWeeks.value = sortedWeeks as Object[]
}

EventBus.on('DashboardView.forceRerender', () => {
  forceRerender()
});
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
      v-for="(weeks, monthNumber) in storedWeeks"
      :monthName="monthNumber"
      :weeks="weeks as any"
      :key="componentKey"
    />
  </main>

  <div class="quick-actions">
    <button @click="emitOpenModalEvent()">+</button>
  </div>
</template>
