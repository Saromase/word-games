import type { Grid } from "./Grid";
import type { Letter } from "./Letter";

export type Motus = {
    currentGrid: Grid
    keyboard: Letter[]
    history: Grid[]
};
