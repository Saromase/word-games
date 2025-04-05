<script setup lang="ts">
import { ref } from 'vue'
import Grid from './Grid/Grid.vue'
// import type { Grid as GridType } from '@/types/motus/Grid'

import MotusWinAnimation from './MotusWinAnimation.vue'
import type { Motus } from '@/types/motus/Motus'
import { useGameLogic } from './useGameLogic'
import { useInput } from './useInput'
import Keyboard from './Keyboard/Keyboard.vue'

const motus = ref<Motus>({ currentGrid: { rows: [], try: 0, word: '' }, keyboard: [], history: [] })

// const currentGrid = ref<GridType>()
// const history = ref<GridType[]>([])

const { startNewGame, submitWord, hasError, winAnimation } = useGameLogic(motus)

useInput(motus, submitWord)

startNewGame()
console.log(motus.value.keyboard)
</script>

<template>
  <div class="greetings">
    <MotusWinAnimation v-if="winAnimation" />
    <h1 class="green">Motus</h1>
    <Grid :class="{ shake: hasError }" :grid="motus.currentGrid" />
    <Keyboard layout="AZERTY"/>
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
