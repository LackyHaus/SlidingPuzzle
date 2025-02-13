import { BoardState } from '../state/boardState';

export class GameEngine {
    private boardState: BoardState;

    constructor(rows: number, cols: number) {
        this.boardState = new BoardState(rows, cols);
    }

    /**
     * Пытается выполнить перемещение клетки (row, col), если рядом с ней находится пустая (представлена максимальным числом).
     */
    AttemptMove(row: number, col: number): void {
        const board = this.boardState.getGameBoardRef().value;
        const max = this.boardState.getMaximumValue();
        const directions = [
            [-1, 0], // вверх
            [1, 0],  // вниз
            [0, -1], // влево
            [0, 1]   // вправо
        ];

        const Size = this.boardState.getGameBoardSize();
        for (const [dx, dy] of directions) {
            
            if (dy === 0) {
                for (let checkRows = 0; checkRows < Size[0]; checkRows++) {
                    let airRow = row + dx * checkRows;
                    let airCol = col + dy;
                    if (airRow >= 0 && airRow < Size[0] && airCol >= 0 && airCol < Size[1]) {
                        if (board[airRow][airCol] === max) {
                            let bodyRow;
                            let bodyCol = col + dy;
                            while (checkRows > 0) {
                                bodyRow = row + dx * (checkRows - 1);
                                airRow = row + dx * checkRows;
                                this.boardState.swapCells(bodyRow, bodyCol, airRow, airCol);
                                checkRows--;
                            }
                            break;
                        }
                    }
                }
            }

            if (dx === 0) {
                for (let checkCols = 0; checkCols < Size[1]; checkCols++) {
                    let airRow = row + dx;
                    let airCol = col + dy * checkCols;
                    if (airRow >= 0 && airRow < Size[0] && airCol >= 0 && airCol < Size[1]) {
                        if (board[airRow][airCol] === max) {
                            let bodyRow = row + dx;
                            let bodyCol;
                            while (checkCols > 0) {
                                bodyCol = col + dy * (checkCols - 1);
                                airCol = col + dy * checkCols;
                                this.boardState.swapCells(bodyRow, bodyCol, airRow, airCol);
                                checkCols--;
                            }
                            break;
                        }
                    }
                }
            }

        }
    }

    getBoard() {
        return this.boardState.getGameBoardRef();
    }

    getBoardMaxValue(): number {
        return this.boardState.getMaximumValue();
    }
}