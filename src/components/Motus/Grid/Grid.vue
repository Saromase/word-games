<script setup lang="ts">
import GridRow from './GridRow.vue';


const props = defineProps<{
    word: string
    currentAttempt : number
    attempts: string[]
    input: string|null
    class: string
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
            :class="class"
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
