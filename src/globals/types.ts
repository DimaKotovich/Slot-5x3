export type SymbolId = number;

export interface SpinResult {
    matrix: SymbolId[][];
    win: number;
}

export interface SlotState {
    balance: number;
    bet: number;
    lastWin: number;
}