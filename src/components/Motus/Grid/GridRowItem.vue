<script setup lang="ts">
const props = withDefaults(defineProps<{
    letter: string
    isCorrect: boolean
    isInside: boolean
}>(), {
    letter : '',
    isCorrect: false,
    isInside: false,
})

</script>

<template>
    <div :class="['grid-row-item', isCorrect ? 'grid-row-item__correct' : isInside ? 'grid-row-item__inside' : '']">
        {{ letter.toUpperCase()  }}
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

    .grid-row-item__inside {
        background-color: orange;
    }
</style>
