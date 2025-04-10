<script setup lang="ts">
import { computed, ref } from 'vue'
import Grid from './Grid/Grid.vue'

import MotusWinAnimation from './MotusWinAnimation.vue'
import type { Motus } from '@/types/motus/Motus'
import { useGameLogic } from './useGameLogic'
import { useInput } from './useInput'
import Keyboard from './Keyboard/Keyboard.vue'
import LetterStatus from '@/enum/LetterStatus'

const motus = ref<Motus>({ currentGrid: { rows: [], try: 0, word: '' }, keyboard: [], history: [] })

const { startNewGame, submitWord, hasError, winAnimation } = useGameLogic(motus)

useInput(motus, submitWord)

const corrects = computed(() => {
  return motus.value.currentGrid.rows.flatMap((row) => row.letters.filter((letter) => letter.status === LetterStatus.CORRECT).map((letter) => letter.value.toUpperCase()))
})

const disabled = computed(() => {
  return motus.value.currentGrid.rows.flatMap((row) => row.letters.filter((letter) => letter.status === LetterStatus.BAD).map((letter) => letter.value.toUpperCase()))
})

const misplaced = computed(() => {
  return motus.value.currentGrid.rows.flatMap((row) => row.letters.filter((letter) => letter.status === LetterStatus.MISPLACED).map((letter) => letter.value.toUpperCase()))
})

startNewGame()
</script>

<template>
  <div class="greetings">
    <MotusWinAnimation v-if="winAnimation" />
    <h1 class="green">Motus</h1>
    <Grid :class="{ shake: hasError }" :grid="motus.currentGrid" />
    <Keyboard layout="AZERTY" :corrects :disabled :misplaced />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
</style>
