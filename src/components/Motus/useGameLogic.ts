import type { Letter } from '@/types/motus/Letter';
import type { Row } from '@/types/motus/Row';
import LetterStatus from './LetterStatus';
import type { Grid as GridType } from '@/types/motus/Grid';
import { ref, type Ref } from 'vue';
import type { Motus } from '@/types/motus/Motus';
import wordList from './../../dictionary/motus.json';

export function useGameLogic(motus: Ref<Motus>) {
  const hasError = ref<boolean>(false);
  const winAnimation = ref<boolean>(false);

  const showError = () => {
    hasError.value = true;
    setTimeout(() => {
      hasError.value = false;
    }, 1300);
  };

  const startNewGame = () => {
    const word = pickWord();
    console.log(word);
    console.log(motus.value.history);
    const letter: Letter = {
      status: LetterStatus.CORRECT,
      value: word[0],
    };

    const row: Row = {
      active: true,
      letters: [letter],
    };
    const grid: GridType = {
      rows: [row],
      try: 0,
      word: word,
    };
    if (motus.value.currentGrid.word === '') {
      motus.value = {
        currentGrid: grid,
        history: [],
      } as Motus;
    } else {
      motus.value.history.push(motus.value.currentGrid);
      motus.value.currentGrid = grid;
    }
  };

  const submitWord = () => {
    const currentGrid = motus.value.currentGrid;
    const activeRow = currentGrid.rows.find((row) => row.active);

    if (!activeRow) return;
    if (activeRow.letters.length !== currentGrid.word.length) return;

    const inputValue = activeRow.letters.map((letter) => letter.value).join('');
    if (/^[?]$/.test(inputValue)) {
      return;
    }

    currentGrid.try++;
    if (!wordList[currentGrid.word.length][currentGrid.word[0]].includes(inputValue)) {
      activeRow.letters.splice(1);
      showError();
      return;
    }

    if (inputValue === currentGrid.word) {
      winAnimation.value = true;
      setTimeout(() => {
        winAnimation.value = false;
      }, 2000);
      startNewGame();
      return;
    }

    const evaluateLetterStatus = (grid: GridType, input: string, index: number): LetterStatus => {
      const activeRow = currentGrid.rows.find((row) => row.active);

      if (!activeRow) return LetterStatus.INPUT;
      console.log(grid.word, index, input, grid.word[index] === input);

      if (grid.word[index] === input) {
        return LetterStatus.CORRECT;
      }

      if (grid.word.includes(input)) {
        const countLetterOccurrences = (str: string, letter: string) => {
          return [...str].reduce((count, char) => (char === letter ? count + 1 : count), 0);
        };

        const letterOccurence = countLetterOccurrences(grid.word, input);
        const currentUsage = activeRow.letters
          .slice(0, index)
          .map((letter) => letter.value)
          .join('');
        const currentOccurence = countLetterOccurrences(currentUsage, input);
        console.log(letterOccurence, input, currentUsage, currentOccurence);
        if (letterOccurence > 1) {
          if (letterOccurence > currentOccurence) {
            return LetterStatus.MISPLACED;
          } else {
            return LetterStatus.BAD;
          }
        } else if (letterOccurence === currentOccurence) {
          return LetterStatus.BAD;
        } else {
          return LetterStatus.MISPLACED;
        }
      }

      return LetterStatus.INPUT;
    };

    console.log(
      activeRow.letters.map((letter, index) => ({
        ...letter,
        status: evaluateLetterStatus(currentGrid, letter.value, index),
      })),
    );

    activeRow.letters = activeRow.letters.map((letter, index) => ({
      ...letter,
      status: evaluateLetterStatus(currentGrid, letter.value, index),
    }));

    activeRow.active = false;
    const letter: Letter = {
      status: LetterStatus.CORRECT,
      value: currentGrid.word[0],
    };
    const row: Row = {
      active: true,
      letters: [letter],
    };
    currentGrid.rows.push(row);
  };

  const getRandomElement = (arr: []) => arr[Math.floor(Math.random() * arr.length)];

  const pickWord = () => {
    const randomNumber = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    // const randomNumber = 5;
    const alphabet = 'abcdefghijlmnopqrstuv';
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];

    return getRandomElement(wordList[randomNumber.toString()][letter]);
  };

  return { startNewGame, submitWord, hasError, winAnimation };
}
