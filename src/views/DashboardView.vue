<script lang="ts">
import Modal from "@/components/Modal.vue";

import {defineComponent} from 'vue'

export default defineComponent({
  components: {
    Modal
  },
  props: {
    propIsModalOpened: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isModalOpened: false,
    }
  },
  mounted() {
    this.isModalOpened = this.propIsModalOpened;
  },
  methods: {
    toggleModal() {
      this.isModalOpened = !this.isModalOpened;
    }
  },
});
</script>

<template>
  <main>
    <Modal :open="isModalOpened"/>
    <button @click="toggleModal()">test</button>
  </main>
</template>
