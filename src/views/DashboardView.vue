<script lang="ts">
import Modal from "@/components/Modal.vue";
import MonthListing from "@/components/MonthListing.vue";
import EventBus from "@/events/EventBus";

import {defineComponent} from 'vue'

export default defineComponent({
  components: {
    MonthListing,
    Modal
  },
  data() {
    return {
      componentKey: 0,
      isModalOpened: false,
    }
  },
  created() {

  },
  computed: {
    getIsModalOpened() {
      return this.isModalOpened;
    }
  },
  methods: {
    forceRerender() {
      console.log("ff")
      this.componentKey += 1;
    },
    toggleModal() {
      if (this.isModalOpened) {
        EventBus.trigger('Modal.closeDialog', 'penis');
      } else {
        EventBus.trigger('Modal.openDialog', 'penis');

      }
      // this.forceRerender();
    },
  },
});
</script>

<template>
  <main>
    <Modal
        :key="componentKey"
        :isOpened="getIsModalOpened"
    />
    <button @click="toggleModal()">Toggle Modal</button>

    <MonthListing
        :weeks="[
            {id: 1, name: 'Klaus Kleber', date: {start: '22-09-2023', end: '29-09-2023'}},
            {id: 2, name: 'Jon Doe', date: {start: '15-09-2023', end: '22-09-2023'}}
            ]"

    />
  </main>
</template>
