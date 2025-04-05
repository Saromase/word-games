<script setup lang="ts">
import type { Grid } from '@/types/motus/Grid'
import GridRow from './GridRow.vue'

defineProps<{
  grid: Grid
}>()
</script>

<template>
  <div class="grid">
    <GridRow v-for="key in 6" :key :row="grid.rows[key - 1]" :size="grid.word.length" />
  </div>
</template>

<style scoped>
.grid {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
}

.shake {
  animation: shake 1s ease-in-out;
}

@media prefer-reduced-motion {
  .shake {
    animation: none;
  }
}
</style>
