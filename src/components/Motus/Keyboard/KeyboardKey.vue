<script setup lang="ts">

import type { Letter } from '@/types/motus/Letter';
import LetterStatus from '@/enum/LetterStatus';


const props = defineProps<{
  letter: Letter
}>()

console.log(props.letter)

const getClass = (status: LetterStatus) => {
  if (status === LetterStatus.BAD) {
    return 'bad';
  } else if (status === LetterStatus.CORRECT) {
    return 'correct';
  } else if (status === LetterStatus.MISPLACED) {
    return 'misplaced';
  } else {
    return '';
  }
};
</script>

<template>
  <button :class="['key', getClass(letter.status)]">{{letter.value}}</button>
</template>

<style scoped>
.key {
  width: 50px;
  height: 50px;
  font-size: 18px;
  text-align: center;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  cursor: pointer;
  border-radius: 5px;
}

.key:hover {
  background-color: #ddd;
}

.correct {
  background-color: red;
}

.bad {
  background-color: lightgray;
}

.misplaced {
  background-color: orange;
}
</style>
