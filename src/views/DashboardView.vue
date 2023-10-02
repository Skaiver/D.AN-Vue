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
    closeModal(args) {
      console.log("view: closing modal!", args)
      this.isModalOpened = false;
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
        @close-modal="closeModal(args)"
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
