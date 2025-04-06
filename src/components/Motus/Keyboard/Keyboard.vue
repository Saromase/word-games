<script setup lang="ts">
import type { Keyboard, KeyboardLayout, KeyboardLetter } from '@/types/motus/Keyboard'
import { computed } from 'vue'

const props = defineProps<{
  corrects: KeyboardLetter[]
  misplaced: KeyboardLetter[]
  disabled: KeyboardLetter[]
  layout: KeyboardLayout
}>()

const layout_params = {
  AZERTY: 'AZERTYUIOPQSDFGHJKLMWXCVBN',
  QWERTY: 'QWERTYUIOPASDFGHJKLZXCVBNM',
  QWERTZ: 'QWERTZUIOPASDFGHJKLYXCVBNM',
} as const satisfies Record<KeyboardLayout, string>

const layout = computed(() => {
  const keyboard = [[], [], []] as Keyboard
  const letters = [...layout_params[props.layout]] as KeyboardLetter[]

  return letters.reduce<Keyboard>((out, letter, index) => {
    if (index < 10) {
      out[0].push(letter)
    } else if (index < 20) {
      out[1].push(letter)
    } else {
      out[2].push(letter)
    }
    return out
  }, keyboard)
})
</script>

<template>
  <div class="keyboard">
    <div class="row" v-for="(row, key) in layout" :key>
      <div
        :class="[
          'letter',
          misplaced.includes(letter) ? 'misplaced' : '',
          corrects.includes(letter) ? 'correct' : '',
          disabled.includes(letter) ? 'disabled' : '',
        ]"
        v-for="letter in row"
        :key="letter"
      >
        {{ letter }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 20px;
}

.row {
  display: flex;
  gap: 5px;
}

.letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 18px;
  text-align: center;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  cursor: pointer;
  border-radius: 5px;
}

.correct {
  background-color: red;
}

.misplaced {
  background-color: orange;
}

.disabled {
  background-color: gainsboro;
}

.letter:hover {
  background-color: #ddd;
}
</style>
