<script setup lang="ts">
import type { Row } from '@/types/motus/Row'
import GridRowItem from './GridRowItem.vue'

const props = defineProps<{
  row: Row | undefined
  size: number
}>()
console.log(props.row)
console.log(props.size)
</script>

<template>
  <div class="grid-row">
    <GridRowItem v-for="n in props.size" :key="n" :letter="props.row?.letters[n - 1]" />
  </div>
</template>

<style scoped>
.grid-row {
  min-height: 10vh;
  min-width: 40vw;
  display: flex;
  gap: 5px;
}
</style>
