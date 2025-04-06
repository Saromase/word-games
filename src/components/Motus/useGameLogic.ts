import type { Letter } from '@/types/motus/Letter';
import type { Row } from '@/types/motus/Row';
import LetterStatus from '@/enum/LetterStatus';
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

  const initKeyboard = (): Letter[] => {
    const alphabet = [];
    for (let i = 65; i <= 90; i++) {
      alphabet.push({
        status : LetterStatus.INPUT,
        value: String.fromCharCode(i)
      }); // Convertit le code ASCII en lettre
    }

    return alphabet
  }

  const startNewGame = () => {
    const word = pickWord();
    console.log(word);
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
        keyboard: initKeyboard(),
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

      if (grid.word[index] === input) {
        return LetterStatus.CORRECT;
      }

      if (grid.word.includes(input)) {
        const countLetterOccurrences = (str: string, letter: string) => {
          return [...str].reduce((count, char) => (char === letter ? count + 1 : count), 0);
        };

        const wordInput = activeRow.letters.map((letter) => letter.value)
        const wordOccurence = countLetterOccurrences(grid.word, input);
        const actuallyOccurence = countLetterOccurrences(wordInput.slice(0, index).join(''), input);
        const wordInputOccurence = countLetterOccurrences(wordInput.join(''), input);

        if (wordOccurence > 1) {
          if (wordOccurence > actuallyOccurence) {
            return LetterStatus.MISPLACED;
          } else {
            return LetterStatus.BAD;
          }
        } else if (wordOccurence === actuallyOccurence) {
          return LetterStatus.BAD;
        } else if (wordInputOccurence > wordOccurence) {
          return LetterStatus.BAD;
        } else {
          return LetterStatus.MISPLACED;
        }
      }
      return LetterStatus.BAD;
    };

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
    const alphabet = 'abcdefghijlmnopqrstuv';
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];

    return getRandomElement(wordList[randomNumber.toString()][letter]);
  };

  return { startNewGame, submitWord, hasError, winAnimation };
}
