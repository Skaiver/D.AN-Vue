<template>
  <div v-show="visible" class="toast-wrapper">
    <div :class="['toast', { highlight: justUpdated }]">
      <button class="close-btn" @click="visible = false">×</button>
      <p><strong>Fehlerhafte Felder</strong></p>
      <ul>
        <li v-for="field in messages" :key="field">{{ field }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
  messages: string[]
}>()

const visible = ref(false)
const justUpdated = ref(false)

const messages = ref(props.messages);

watch(
  () => props.messages,
  (newV, oldV) => {
    visible.value = true
    justUpdated.value = false
    requestAnimationFrame(() => {
      justUpdated.value = true
    })
    messages.value = newV
  },
  { deep: true }
)
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}

.toast {
  position: relative;
  background: #f9fafb; /* soft light gray background */
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  overflow: hidden;

  p {
    margin: 0;
  }

  ul {
    margin-top: 0.5rem;
  }
}

.toast.highlight::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  z-index: 0;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    red,
    orange,
    yellow,
    lime,
    aqua,
    blue,
    magenta,
    red
  );
  background-size: 300% 300%;
  animation: border-glow 4s linear infinite;
  mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: destination-out;
  padding: 5px;
  box-sizing: content-box;
}

@keyframes border-glow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.close-btn {
  position: absolute;
  top: 0.7rem;
  right: 0.6rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #333;
}
</style>
