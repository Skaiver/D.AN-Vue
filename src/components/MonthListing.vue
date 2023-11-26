<script setup lang="ts">
import {ref} from 'vue'
import type WeekInterface from "@/components/interfaces/WeekInterface";
import EventBus from "@/events/EventBus";

const props = defineProps({
  weeks: {type: Array, required: true},
})

const dataWeeks = ref([] as WeekInterface[])
dataWeeks.value = props.weeks as WeekInterface[];

function emitOpenModalEvent(week) {
  EventBus.trigger('Modal.loadDialog', week);
  EventBus.trigger('Modal.openDialog', 'penis');
}

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