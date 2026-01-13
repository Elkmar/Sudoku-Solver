export class SudokuUI {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.inputs = [];
    }

    /**
     * initializes the 9x9 grid in the DOM.
     */
    initGrid() {
        this.container.innerHTML = '';
        this.container.style.display = 'grid';
        this.container.style.gridTemplateColumns = 'repeat(9, 1fr)';
        this.container.style.gap = '0';

        for (let r = 0; r < 9; r++) {
            const rowInputs = [];
            for (let c = 0; c < 9; c++) {
                const input = document.createElement('input');
                input.type = 'number'; // text might be better to prevent spinners, but number enforces digits
                input.inputMode = 'numeric';
                input.pattern = '[1-9]*';
                input.min = 1;
                input.max = 9;
                input.className = 'sudoku-cell';
                input.id = `cell-${r}-${c}`;

                // Styling borders for 3x3 grids
                if (c % 3 === 2 && c !== 8) input.classList.add('border-right');
                if (r % 3 === 2 && r !== 8) input.classList.add('border-bottom');
                if (c === 0) input.classList.add('border-left');
                if (r === 0) input.classList.add('border-top');

                // Event Listeners
                input.addEventListener('keydown', (e) => this.handleKeyNavigation(e, r, c));
                input.addEventListener('input', (e) => this.handleInput(e));

                this.container.appendChild(input);
                rowInputs.push(input);
            }
            this.inputs.push(rowInputs);
        }
    }

    /**
     * Reads the current state of the grid from the DOM.
     * @returns {number[][]} 9x9 array of numbers (0 for empty)
     */
    getGrid() {
        return this.inputs.map(row => row.map(input => {
            const val = parseInt(input.value, 10);
            return (isNaN(val) || val < 1 || val > 9) ? 0 : val;
        }));
    }

    /**
     * Updates the DOM with a given grid state.
     * @param {number[][]} grid 
     */
    setGrid(grid) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const val = grid[r][c];
                this.inputs[r][c].value = val === 0 ? '' : val;
            }
        }
    }

    clearGrid() {
        this.inputs.forEach(row => row.forEach(input => input.value = ''));
    }

    handleInput(e) {
        const input = e.target;
        const val = input.value;
        if (val.length > 1) {
            input.value = val.slice(-1); // Only allow single digit
        }
        if (val === '0') {
            input.value = '';
        }
    }

    handleKeyNavigation(e, r, c) {
        let newR = r;
        let newC = c;

        switch (e.key) {
            case 'ArrowUp': newR = r - 1; break;
            case 'ArrowDown': newR = r + 1; break;
            case 'ArrowLeft': newC = c - 1; break;
            case 'ArrowRight': newC = c + 1; break;
            default: return;
        }

        if (newR >= 0 && newR < 9 && newC >= 0 && newC < 9) {
            e.preventDefault();
            this.inputs[newR][newC].focus();
        }
    }
}
