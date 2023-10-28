<script lang="ts">
import {defineComponent} from 'vue';
import EventBus from "@/events/EventBus";

export default defineComponent({
  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      dataKey: 0,
      form: {
        name: "",
        year: "",
        text: ""
      },
      dialog: null
    }
  },

  created() {
    this.name = "ABC"
    this.year = "1"
    this.text = "nichts"
    console.log("1",this.$refs.dialog)

  },
  mounted() {
    // console.log("2",this.$refs.dialog)

    EventBus.on('Modal.openDialog', (a) => {
      console.log(this.$refs.dialog)
      this.$refs.dialog.showModal();
    });

    EventBus.on('Modal.closeDialog', (a) => {
      console.log("ppppenis",a)
      this.$refs.dialog.close();

    });
  },
  updated() {
    console.log("3",this.$refs.dialog)

  },

  watch: {
    isOpened(newValue, oldValue) {
      if (newValue === oldValue) return;
      this.dataKey = newValue;
    },
  },

  computed: {
  },
  methods: {
    storeReference(e) {
      if(e) {
        this.dialog = e;
      }
    },
    clearReference() {
      this.dialog = null;
    },
    closeModal() {
      EventBus.trigger('Modal.closeDialog', 'penis');
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
  <dialog ref="dialog">
    <button @click="closeModal()" autofocus>Close</button>

    <label for="name">Name</label>
    <input type="text" name="name" id="name" v-model="form.name" placeholder="Namen hier eingeben...">

    <label for="year">Ausbildungsjahr</label>
    <input type="number" name="year" id="year" v-model="form.year" placeholder="Jahr hier eingeben...">

    <label for="text">Inhalt</label>
    <textarea name="text" id="text" v-model="form.text" placeholder="Inhalte hier..."></textarea>

    <label for="name">Abteilung</label>
    <input type="text" name="department" id="department" v-model="form.department" placeholder="Abteilung hier eingeben...">


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

dialog::backdrop {
  background-color: red;
  opacity: 0.75;
}
</style>