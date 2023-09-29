<script lang="ts">
import {defineComponent} from 'vue'
import type WeekInterface from "@/components/interfaces/WeekInterface";

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
  }
});
</script>

<template>
  <details>
    <summary>Epcot Center</summary>
    <ul>
      <li v-for="week in dataWeeks" v-bind:key="week.id"
          @click="$emit('openModal', week)">
        {{ week.date.start }} - {{ week.date.end }}
      </li>
    </ul>
  </details>
</template>

<style scoped>

</style>