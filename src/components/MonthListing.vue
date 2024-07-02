<script setup lang="ts">
import {ref} from 'vue'
import type WeekInterface from "@/components/interfaces/WeekInterface";
import EventBus from "@/events/EventBus";
import type { modalFormType } from './interfaces/ModalFormType';

const props = defineProps({
  weeks: {type: Array, required: true},
  monthName: {type: String, required: true},
})

const dataWeeks = ref([] as WeekInterface[])
dataWeeks.value = props.weeks as WeekInterface[];

function emitOpenModalEvent(week: WeekInterface) {
  EventBus.trigger('Modal.loadDialog', week);
  EventBus.trigger('Modal.openDialog', null);
}

function formatDate(s: string) {
  let ms = Date.parse(s);
  let date = new Date(ms);
  return date.getDate() + ".";
}

function getYearOfDate(s: string){
  let ms = Date.parse(s);
  let date = new Date(ms);
  return date.getFullYear();
}

</script>

<template>
  <details class="month-listing">
    <summary>{{ props.monthName }} {{ getYearOfDate(dataWeeks[0]?.date?.start) }}</summary>
    <ul>
      <li v-for="week in dataWeeks" v-bind:key="week.id"
          :data-checked="week.isDone ?? false"
          @click="emitOpenModalEvent(week)">
        {{ formatDate(week.date.start) }} - {{ formatDate(week.date.end) }}
      </li>
    </ul>
  </details>
</template>

<style scoped>
.month-listing {
  position: relative;
  margin-bottom: 0.3rem;
}

.month-listing summary {
  background-color: #2f405b;
  padding: 15px 10px;
  border-radius: 3px;
}

.month-listing ul {
  text-decoration: none;
  list-style: none;
  margin-top: 0.3rem;
  padding-left: 20px;
}

.month-listing ul li {
  position: relative;
  background-color: #2f405b;
  padding: 15px 10px;
  margin-bottom: 0.2rem;
  border-radius: 3px;
}

.month-listing ul li::before {
  left: 0;
  padding-right: 20px;
  width: 15px;
  height: 15px;
  display: inline-block;
  vertical-align: top;
}

.month-listing ul li[data-checked='true']::before {
  content: url("/media/icons/check.svg");
}

.month-listing ul li[data-checked='false']::before {
  content: url("/media/icons/close.svg");
}

.month-listing ul li::after {
  content: url("/media/icons/file-arrow-down.svg");
  position: absolute;
  right: 0;
  padding-right: 20px;
  width: 15px;
}
</style>