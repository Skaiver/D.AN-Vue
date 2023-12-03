<script setup lang="ts">
import EventBus from "@/events/EventBus";
import {computed, ref} from "vue";

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
        monthName="September"
        :weeks="[
            {isDone: true, name: 'Klaus Kleber', department: 'Dev 1', content: '2', year: '69', date: {start: '2023-09-22', end: '2023-09-29'}},
            {isDone: false, name: 'Jon Doe', department: 'Dev 2', content: '3', year: '42', date: {start: '2023-09-22', end: '2023-09-29'}}
            ]"

    />

    <MonthListing
        monthName="August"
        :weeks="[
            {isDone: true, name: 'Klaus Kleber', department: 'Dev 1', content: '2', year: '69', date: {start: '2023-08-22', end: '2023-08-29'}},
            {isDone: false, name: 'Jon Doe', department: 'Dev 2', content: '3', year: '42', date: {start: '2023-08-22', end: '2023-08-29'}}
            ]"

    />
  </main>
</template>
