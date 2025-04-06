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

const { startNewGame, submitWord, hasError, winAnimation, getLettersByStatus } = useGameLogic(motus)

useInput(motus, submitWord)



const corrects = computed(() => getLettersByStatus(LetterStatus.CORRECT));
const disabled = computed(() => getLettersByStatus(LetterStatus.BAD));
const misplaced = computed(() =>getLettersByStatus(LetterStatus.MISPLACED));

startNewGame()
</script>

<template>
  <div class="game">
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
  text-align: center;
}

h3 {
  font-size: 1.2rem;
  text-align: center;
}

</style>
