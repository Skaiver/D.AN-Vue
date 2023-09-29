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
      isModalOpened: false,
    }
  },
  created() {

  },
  computed: {
    evalIsModalOpened() {
      console.log(this.isModalOpened, "eval")
      if (this.isModalOpened) {
        return true;
      }
      return false;
    }
  },
  methods: {
    toggleModal() {
      this.isModalOpened = !this.isModalOpened;
      this.evalIsModalOpened(this.isModalOpened);
      // TODO wtf -> how to make Modal make update/re-render when var updates
    },
    openModal() {
      this.isModalOpened = true;
    }
  },
});
</script>

<template>
  <main>
    <Modal :isOpened="evalIsModalOpened"/>
    <button @click="toggleModal()">Öffne Modal</button>

    <MonthListing
        :weeks="[
            {id: 1, date: {start: '22-09-2023', end: '29-09-2023'}},
            {id: 2, date: {start: '15-09-2023', end: '22-09-2023'}}
            ]"
        @open-modal="openModal"/>
  </main>
</template>
