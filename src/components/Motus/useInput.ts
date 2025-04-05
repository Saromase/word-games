import type { Letter } from '@/types/motus/Letter';
import { onMounted, onUnmounted, type Ref } from 'vue';
import LetterStatus from './LetterStatus';
import type { Motus } from '@/types/motus/Motus';

export function useInput(motus: Ref<Motus>, submitWord: () => void) {
  const eraseLastInput = () => {
    const currentGrid = motus.value.currentGrid;
    const activeRow = currentGrid.rows.find((row) => row.active);

    if (!activeRow) return;
    if (activeRow.letters.length === 1) return;

    activeRow.letters.pop();
  };

  const handleInputEvent = (event: KeyboardEvent) => {
    if (/^[a-zA-Z?]$/.test(event.key) || event.key === ' ') {
      updateInput(event.key);
    } else if (event.key === 'Enter') {
      submitWord();
    } else if (event.key === 'Backspace') {
      eraseLastInput();
    }
  };

  const updateInput = (input: string) => {
    const currentGrid = motus.value.currentGrid;
    const activeRow = currentGrid.rows.find((row) => row.active);

    if (!activeRow) return;
    if (currentGrid.word.length === activeRow.letters.length) return;
    if (currentGrid.word[0] === input && activeRow.letters.length === 1) return;

    if (input === ' ') {
      input = '?';
    }

    const letter: Letter = {
      status: LetterStatus.INPUT,
      value: input,
    };
    activeRow.letters.push(letter);
  };

  onMounted(() => {
    window.addEventListener('keyup', handleInputEvent);
  });

  onUnmounted(() => {
    window.removeEventListener('keyup', handleInputEvent);
  });
}
