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
  computed: {
    getIsModalOpened(){
      return this.isModalOpened;
    }
  },
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
      this.isModalOpened = false;
      console.log("view: closing modal!")
      this.forceRerender();
    }
  },
});
</script>

<template>
  <main>
    <Modal
        :key="componentKey"
        :isOpened="getIsModalOpened"
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
