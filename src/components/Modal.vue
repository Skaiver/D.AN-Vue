<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      dataIsOpened: false,
      form: {
        name: "",
        year: "",
        text: ""
      }
    }
  },

  created() {
    this.name = "ABC"
    this.year = "1"
    this.text = "nichts"
    this.dataIsOpened = this.isOpened;
  },
  mounted() {
  },

  watch: {
    isOpened(newValue, oldValue) {
      if(newValue === oldValue) return;
      console.log("new: ",newValue)
      this.dataIsOpened = newValue;
    },
  },

  computed: {},
  methods: {
    handleFocusOut() {
      console.log(this.dataIsOpened)
      if(this.dataIsOpened) {
        this.hideModal();
      }
    },
    showModal() {
      document.querySelector('dialog')?.setAttribute("open", "");
    },
    hideModal() {
      document.querySelector('dialog')?.removeAttribute("open",);
    },
    toggleModal() {
      this.dataIsOpened = !this.dataIsOpened;
    },
    getCurrentFormValues() {
      console.log(this.form)
    },
    submit() {
      // stuff here
    }
  }
});
</script>

<template>
  <dialog :open="isOpened" v-click-outside="handleFocusOut">
    <label for="name">Name</label>
    <input type="text" name="name" id="name" v-model="form.name" placeholder="Namen hier eingeben...">

    <label for="year">Ausbildungsjahr</label>
    <input type="number" name="year" id="year" v-model="form.year" placeholder="Jahr hier eingeben...">

    <label for="text">Inhalt</label>
    <textarea name="text" id="text" v-model="form.text" placeholder="Inhalte hier..."></textarea>


  </dialog>
  <button @click="getCurrentFormValues()">Ergebnisse</button>
</template>

<style scoped>
dialog {
  height: 70%;
  width: 50%;
  margin: 5% auto auto;
}

dialog input, dialog label, dialog textarea {
  display: block;
  width: 50%;
  margin: 0 auto;
}

dialog input {
  height: 24px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2%;
  border: 1px solid black;
  padding: 5px;
  border-radius: 2px;
}

dialog textarea {
  border: 1px solid black;
  padding: 2px;
  border-radius: 2px;
}
</style>