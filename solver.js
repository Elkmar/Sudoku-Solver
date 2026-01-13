/**
 * SudokuSolver class handles the logic for solving Sudoku puzzles.
 * It uses backtracking with the Minimum Remaining Values (MRV) heuristic.
 */
export class SudokuSolver {
    constructor() {
        this.board = null;
    }

    /**
     * Solves the given Sudoku grid.
     * @param {number[][]} grid - 9x9 array of numbers (0 or "" for empty)
     * @returns {number[][] | null} - Solved 9x9 array or null if unsolvable
     */
    solve(grid) {
        // Deep copy the grid to avoid mutating the original until we succeed
        this.board = grid.map(row => row.map(val => {
            const num = parseInt(val, 10);
            return isNaN(num) ? 0 : num;
        }));

        if (this._backtrack()) {
            return this.board;
        }
        return null;
    }

    /**
     * Recursive backtracking function.
     * @returns {boolean} - true if solved, false otherwise
     */
    _backtrack() {
        // Minimum Remaining Values (MRV) heuristic
        // Find the empty cell with the fewest legal moves
        let bestCell = null;
        let minOptions = 10;
        let possibleValuesForBest = [];

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (this.board[r][c] === 0) {
                    const options = this._getValidOptions(r, c);
                    if (options.length === 0) {
                        return false; // No moves possible for this cell, dead end
                    }
                    if (options.length < minOptions) {
                        minOptions = options.length;
                        bestCell = { r, c };
                        possibleValuesForBest = options;
                        if (minOptions === 1) break; // Optimization: can't do better than 1
                    }
                }
            }
            if (minOptions === 1) break;
        }

        if (!bestCell) {
            return true; // No empty cells left, puzzle solved!
        }

        const { r, c } = bestCell;

        // Try each valid option
        for (const num of possibleValuesForBest) {
            this.board[r][c] = num;
            if (this._backtrack()) {
                return true;
            }
            this.board[r][c] = 0; // Backtrack
        }

        return false;
    }

    /**
     * Returns an array of valid numbers (1-9) for a specific cell.
     */
    _getValidOptions(row, col) {
        const used = new Set();

        // Check Row
        for (let c = 0; c < 9; c++) {
            if (this.board[row][c] !== 0) used.add(this.board[row][c]);
        }

        // Check Column
        for (let r = 0; r < 9; r++) {
            if (this.board[r][col] !== 0) used.add(this.board[r][col]);
        }

        // Check 3x3 Box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const val = this.board[startRow + r][startCol + c];
                if (val !== 0) used.add(val);
            }
        }

        const options = [];
        for (let n = 1; n <= 9; n++) {
            if (!used.has(n)) options.push(n);
        }
        return options;
    }

    /**
     * Checks if a board state is valid (no duplicates in rows/cols/boxes).
     */
    isValid(grid) {
        // Quick basic validation
        const board = grid.map(row => row.map(val => {
            const num = parseInt(val, 10);
            return isNaN(num) ? 0 : num;
        }));

        const isValidUnit = (unit) => {
            const seen = new Set();
            for (const val of unit) {
                if (val !== 0) {
                    if (seen.has(val)) return false;
                    seen.add(val);
                }
            }
            return true;
        }

        // Rows
        for (let r = 0; r < 9; r++) {
            if (!isValidUnit(board[r])) return false;
        }

        // Cols
        for (let c = 0; c < 9; c++) {
            const col = [];
            for (let r = 0; r < 9; r++) col.push(board[r][c]);
            if (!isValidUnit(col)) return false;
        }

        // Boxes
        for (let br = 0; br < 3; br++) {
            for (let bc = 0; bc < 3; bc++) {
                const box = [];
                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < 3; c++) {
                        box.push(board[br * 3 + r][bc * 3 + c]);
                    }
                }
                if (!isValidUnit(box)) return false;
            }
        }

        return true;
    }
}
