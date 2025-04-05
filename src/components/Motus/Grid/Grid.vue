<script setup lang="ts">
import type { Grid } from '@/types/motus/Grid';
import GridRow from './GridRow.vue';


const props = defineProps<{
    class: string
    grid: Grid
}>()

console.log(props.grid)
</script>

<template>
    <div class="grid">
        <GridRow 
            v-for="n in 6"
            :key="n"
            :class="props.class"
            :row="props.grid.rows[n-1]"
            :size="props.grid.word.length"

        />
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
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
}

.shake {
  animation: shake 1s ease-in-out;
}

</style>
