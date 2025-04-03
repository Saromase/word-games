<script setup lang="ts">
import GridRowItem from './GridRowItem.vue';

const props = defineProps<{
    wordLength: number,
    word: string
    isActive: boolean
    attempt: string|null
}>()

const isInside = (index: number) => {
    if (
        props.attempt?.[index - 1]
        && props.word.includes(props.attempt[index-1])
    ) {
        return true;
    }
    return false
};

const isCorrect = (index: number) => {
    if (index > props.word.length) {
        return false;
    }
    if (props.isActive && index === 1 ){
        return true
    }

    if (props.attempt?.[index - 1] === props.word[index - 1]) {
        return true
    }

    return false;
};

console.log(props.attempt)
</script>

<template>
    <div class="grid-row">
        <GridRowItem
            v-for="n in wordLength"
            :key="n"
            :letter="attempt ? attempt[n-1]: isActive && n === 1 ? word[0] : isActive  ? word[n -1] : ''"
            :is-correct="isCorrect(n)"
            :is-inside="isInside(n)"
        />
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
