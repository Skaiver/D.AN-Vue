<script setup lang="ts">
import EventBus from "@/events/EventBus";
import {computed, ref} from "vue";
import { useWeeksStore } from '@/stores/weeks'
import { Sorting } from '@/composables/sorting'

const weekStore = useWeeksStore()

const componentKey = ref(0)

function getWeeks(): Array<Object> {
  return weekStore.getWeeks() ?? [];
}

function getSortedWeeks(): Array<Object> {
  const weeks = getWeeks();
  const sortedWeeks = Sorting(weeks);
  
  return sortedWeeks;
}

function getSortedWeeksOfMonth(monthNumber: number): Array<Object> {
  return getSortedWeeks()[monthNumber];

}

function emitOpenModalEvent(){
  EventBus.trigger('Modal.openDialog', null);
}


</script>

<script lang="ts">
import MonthListing from "@/components/MonthListing.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    MonthListing,
    Modal
  },
};
</script>

<template>
  <main>
    <Modal
        :key="componentKey"
    />

    <MonthListing 
        v-for="(month, index) in getSortedWeeks()"
        :monthName="index"
        :weeks="getSortedWeeksOfMonth(index)"
    />

  </main>

  <div class="quick-actions">
    <button @click="emitOpenModalEvent()">+</button>
  </div>
</template>
