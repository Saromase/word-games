<script setup lang="ts">
import type { Letter } from '@/types/motus/Letter';
import LetterStatus from '../../../enum/LetterStatus';

const props = defineProps<{
    letter: Letter|undefined
}>()

const getClass = (status: LetterStatus|null): string[] => {
    const returnValue = ['grid-row-item'];
    if (status === LetterStatus.CORRECT) {
        returnValue.push('grid-row-item__correct');
    } else if (status === LetterStatus.MISPLACED) {
        returnValue.push('grid-row-item__misplaced');
    }

    return returnValue;
}

</script>

<template>
    <div :class="getClass(props.letter === undefined ? null : props.letter?.status)">
        {{ props.letter?.value.toUpperCase()  }}
    </div>
</template>

<style scoped>
    .grid-row-item {
        min-height: 2vh;
        min-width: 8vw;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
        border: 2px solid black;
        background-color: lightgray;
    }

    .grid-row-item__correct {
        background-color: red;
    }

    .grid-row-item__misplaced {
        background-color: orange;
    }
</style>
