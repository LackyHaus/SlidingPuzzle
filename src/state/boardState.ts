import { ref } from 'vue';
import type { GameBoardType } from '../types';

export class BoardState {
    private gameBoard = ref<GameBoardType>([]);
    private rows: number;
    private cols: number;

    constructor(rows: number, cols: number) {
        this.initializeGameBoard(rows, cols);
        this.rows = rows;
        this.cols = cols;
    }


    initializeGameBoard(rows: number, cols: number) {
        let counter = 1;
        this.gameBoard.value = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => counter++)
        );
    }

    swapCells(row1: number, col1: number, row2: number, col2: number) {
        const board = this.gameBoard.value;
        [board[row1][col1], board[row2][col2]] = [board[row2][col2], board[row1][col1]];
    }

    getGameBoardRef() {
        return this.gameBoard;
    }

    getMaximumValue(): number {
        return this.gameBoard.value.flat().reduce((acc, x) => Math.max(acc, x), 0);
    }

    getGameBoardSize(): [number, number] {
        return [this.rows, this.cols];
    }
}