import { SudokuSolver } from './solver.js';
import { SudokuUI } from './ui.js';

const ui = new SudokuUI('sudoku-board');
const solver = new SudokuSolver();

// Initialize the grid
ui.initGrid();

// Button Elements
const solveBtn = document.getElementById('solveButton');
const clearBtn = document.getElementById('clearButton');
const generateBtn = document.getElementById('generateButton');

// Event Listeners
solveBtn.addEventListener('click', () => {
    const grid = ui.getGrid();

    // Check if grid is valid before solving (optional, but good UX)
    if (!solver.isValid(grid)) {
        alert("The current grid is invalid (duplicates found). Please check your numbers.");
        return;
    }

    const solvedGrid = solver.solve(grid);
    if (solvedGrid) {
        ui.setGrid(solvedGrid);
    } else {
        alert("This Sudoku puzzle is unsolvable.");
    }
});

clearBtn.addEventListener('click', () => {
    ui.clearGrid();
});

generateBtn.addEventListener('click', () => {
    // Hardcoded example (can be expanded later)
    const example = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    ui.setGrid(example);
});