<script setup lang="ts">
import EventBus from "@/events/EventBus";
import {computed, ref} from "vue";
import { useWeeksStore } from '@/stores/weeks'
import { Sorting } from '@/composables/sorting'

const weekStore = useWeeksStore()

const componentKey = ref(0)
const isModalOpened = ref(false)

const getIsModalOpened = computed(() => {
  return isModalOpened;
})

function toggleModal() {
  if (isModalOpened.value) {
    EventBus.trigger('Modal.closeDialog');
  } else {
    EventBus.trigger('Modal.openDialog');

  }
}

function getWeeks(): Array<Object> {
  return weekStore.getWeeks() ?? [];
}

function getSortedWeeks(): Array<Object> {
  const weeks = getWeeks();
  const sortedWeeks = Sorting(weeks);
  console.log(sortedWeeks);
  
  return sortedWeeks;
}

function getSortedWeeksOfMonth(monthNumber: number): Array<Object> {
  return getSortedWeeks()[monthNumber];

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
</template>
