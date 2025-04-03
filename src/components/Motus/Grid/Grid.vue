<script setup lang="ts">
import GridRow from './GridRow.vue';


const props = defineProps<{
    word: string
    currentAttempt : number
    attempts: string[]
    input: string|null
}>()

</script>

<template>
    <div class="grid">
        <GridRow 
            v-for="n in 6"
            :key="n"
            :word-length="word.length"
            :word="n === currentAttempt ? input ?? '' : word"
            :is-current-attempt="n === currentAttempt"
            :is-active="n === currentAttempt"
            :attempt="attempts?.[n-1] ?? null"
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
</style>
