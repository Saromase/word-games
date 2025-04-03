<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Grid from './Grid/Grid.vue';

const word = ref<string>("");
const input = ref<string>("");
const lastGames = ref<{ [key: string]: string[] }>({});
const attempts = ref<string[]>([]);
const currentAttempt = ref<number>(1)

const handleInputEvent = (event: KeyboardEvent) => {
  if (/^[a-zA-Z]$/.test(event.key)) {
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

  currentAttempt.value++
  attempts.value.push(currentTry)

  if (currentTry === word.value) {
    alert('you win !!!')
    startNewGame()
  }
}

const startNewGame = () => {

}

const updateInput = (letter: string) => {
  if (input.value.length === word.value.length) return;

  if (letter === word.value[0]) return;

  input.value += letter
}

const eraseLastInput = () => {
  if (input.value.length <= 1) {
    return
  }

  input.value = input.value.slice(0, -1)
}

const pickWord = () => {
  const list = [
    ''
  ]
  return 'mercredi'
}

onMounted(() => {
    word.value = pickWord()
    input.value = word.value[0]
    window.addEventListener('keyup', handleInputEvent);
});

onUnmounted(() => {
    window.removeEventListener('keyup', handleInputEvent);
});
</script>

<template>
  <div class="greetings">
    <h1 class="green">Motus</h1>
    <Grid :word="word" :current-attempt="currentAttempt" :input="input" :attempts="attempts"/>
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
