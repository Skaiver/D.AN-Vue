<script lang="ts">
import Modal from "@/components/Modal.vue";
import MonthListing from "@/components/MonthListing.vue";

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
  computed: {},
  methods: {
    forceRerender() {
      console.log("ff")
      this.componentKey += 1;
    },
    toggleModal() {
      this.isModalOpened = !this.isModalOpened;
    },
    openModal() {
      this.isModalOpened = true;
    },
    closeModal() {
      console.log("view: closing modal!")
      this.isModalOpened = true;
      this.forceRerender();
    }
  },
});
</script>

<template>
  <main>
    <Modal
        :key="componentKey"
        v-bind:isOpened="isModalOpened"
        @close-modal="closeModal()"
    />
    <button @click="toggleModal()">Öffne Modal</button>

    <MonthListing
        :weeks="[
            {id: 1, date: {start: '22-09-2023', end: '29-09-2023'}},
            {id: 2, date: {start: '15-09-2023', end: '22-09-2023'}}
            ]"
        @open-modal="openModal"/>
  </main>
</template>
