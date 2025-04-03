import fs from 'fs';
import readline from 'readline';

const filePath = './scripts/dictionary/kaikki.org-dictionary-French-words.jsonl';

const wordGroups = {};

const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const parseDictionary = async () => {
    try {
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

        for await (const line of rl) {
            if (!line.trim()) continue;
            const entry = JSON.parse(line);
            let word = entry.word;

            if (word.length > 4 && word.length < 11 && entry.pos !== 'name' && !word.includes(" ") && !word.includes("-")) {
                word = removeAccents(word);
                const length = word.length;
                const firstLetter = word[0].toLowerCase();

                if (!wordGroups[length]) wordGroups[length] = {};
                if (!wordGroups[length][firstLetter]) wordGroups[length][firstLetter] = [];

                wordGroups[length][firstLetter].push(word);
            }
        }

        fs.writeFileSync('public/dictionary/motus.json', JSON.stringify(wordGroups, null, 2));

        console.log("✅ Fichier JSONL parsé et sauvegardé !");
    } catch (error) {
        console.error("❌ Erreur lors du parsing :", error);
    }
};
parseDictionary();
