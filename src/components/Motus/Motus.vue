<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Grid from './Grid/Grid.vue';

import wordList from './../../dictionary/motus.json'
import MotusWinAnimation from './MotusWinAnimation.vue';


const word = ref<string>("");
const input = ref<string>("");
const className = ref<string>("");
const lastGames = ref<{ [key: string]: string[] }>({});
const attempts = ref<string[]>([]);
const currentAttempt = ref<number>(1)
const winAnimation = ref<boolean>(true)


const handleInputEvent = (event: KeyboardEvent) => {
  if (/^[a-zA-Z]$/.test(event.key) || event.key === " ") {
    updateInput(event.key)
  } else if (event.key === "Enter") {
    submitWord()
  } else if (event.key === "Backspace") {
    eraseLastInput()
  } else if (event.key === " ") {
    console.log("Espace pressé !");
  }
};

const submitWord = () => {
  if (input.value.length !== word.value.length) {
    return
  }

  const currentTry = input.value
  input.value = word.value[0]

  if (!wordList[word.value.length][word.value[0]].includes(currentTry)) {
    shake()
    return
  }
  currentAttempt.value++
  attempts.value.push(currentTry)

  if (currentTry === word.value) {
    winAnimation.value = true
    setTimeout(() => {
      winAnimation.value = false;
    }, 2000);
    startNewGame()
  }
}

const shake = () => {
  className.value = "shake"
  setTimeout(() => {
    className.value = "";
  }, 1300);
}

const startNewGame = () => {
  word.value = pickWord()
  console.log(word.value)
  input.value = word.value[0]
  currentAttempt.value = 1;
  attempts.value = []
}

const updateInput = (letter: string) => {
  if (input.value.length === word.value.length) return;

  if (letter === word.value[0] && input.value.length === 1) return;

  input.value += letter
}

const eraseLastInput = () => {
  if (input.value.length <= 1) {
    return
  }

  input.value = input.value.slice(0, -1)
}

const getRandomElement = (arr: []) => arr[Math.floor(Math.random() * arr.length)];

const pickWord = () => {
  //const randomNumber = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
  const randomNumber = 5;
  const alphabet = "abcdefghijlmnopqrstuv";
  const letter = alphabet[Math.floor(Math.random() * alphabet.length)];

  return getRandomElement(wordList[randomNumber.toString()][letter])
}
const wordGroups = ref<Record<number, string[]>>({});

onMounted(() => {
  startNewGame()
  window.addEventListener('keyup', handleInputEvent);
});

onUnmounted(() => {
  window.removeEventListener('keyup', handleInputEvent);
});
</script>

<template>
  <div class="greetings">
    <MotusWinAnimation v-if="winAnimation"/>
    <h1 class="green">Motus</h1>
    <Grid :class="className" :word="word" :current-attempt="currentAttempt" :input="input" :attempts="attempts" />
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
