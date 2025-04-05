<script setup lang="ts">
import type { Grid as GridType } from '@/types/motus/Grid';
import Grid from '../Grid/Grid.vue';


const props = defineProps<{
    grids: GridType[]
}>()

</script>

<template>
    <div class="history">
        <Grid 
            v-for="grid in grids"
            :grid="grid"
        />
    </div>
</template>

<style scoped>

</style>
