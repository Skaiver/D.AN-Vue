<script lang="ts">
import {defineComponent} from 'vue'
import type WeekInterface from "@/components/interfaces/WeekInterface";
import EventBus from "@/events/EventBus";

export default defineComponent({
  props: {
    weeks: {
      type: Array,
      default: [] as WeekInterface[]
    }
  },
  data() {
    return {
      dataWeeks: [] as WeekInterface[]
    }
  },

  created() {
    this.dataWeeks = this.weeks;
  },
  mounted() {
    // console.log(this.dataWeeks)
  },

  watch: {},

  computed: {},

  methods: {
    emitOpenModalEvent(week) {
      EventBus.trigger('Modal.loadDialog', week);
      EventBus.trigger('Modal.openDialog', 'penis');
    }
  }
});
</script>

<template>
  <details>
    <summary>November</summary>
    <ul>
      <li v-for="week in dataWeeks" v-bind:key="week.id"
          @click="emitOpenModalEvent(week)"
      >
        {{ week.date.start }} - {{ week.date.end }}
      </li>
    </ul>
  </details>
</template>

<style scoped>

</style>