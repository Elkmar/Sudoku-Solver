# Modern Sudoku Solver

A clean, fast, and responsive web-based Sudoku solver. This project uses a backtracking algorithm optimized with the **Minimum Remaining Values (MRV)** heuristic to solve puzzles efficiently.

## 🚀 Features

-   **Fast Solver**: Capable of solving hardest puzzles instantly using an optimized backtracking algorithm.
-   **Modern UI**: Built with CSS Grid and Flexbox for a clean, responsive layout.
-   **Interactive**:
    -   Input validation (prevents non-numeric input).
    -   Arrow key navigation support.
    -   Example generator for quick testing.
    -   Clear visual distinction for valid/invalid states (basic validation).

## 🛠️ Technologies Used

-   **HTML5**: Semantic structure.
-   **CSS3**: Modern styling with Variables, Grid, and Flexbox.
-   **JavaScript (ES6+)**: Modular architecture (`solver.js`, `ui.js`, `script.js`).

## 📦 structure

```
.
├── index.html      # Main entry point
├── style.css       # Styling and layout
├── script.js       # App initialization and event wiring
├── solver.js       # Core solving logic (Backtracking + MRV)
└── ui.js           # DOM manipulation and grid management
```

## 🏁 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Elkmar/Sudoku-Solver.git
    cd Sudoku-Solver
    ```

2.  **Run the application**:
    Since this project uses ES6 Modules, you need to serve it via a local server (opening `index.html` directly might cause CORS errors).

    If you have Python installed:
    ```bash
    python3 -m http.server 8080
    ```
    Then open [http://localhost:8080](http://localhost:8080) in your browser.

    Or using VS Code: Use the "Live Server" extension.

## 🧠 Algorithm Details

The solver uses a **Recursive Backtracking** approach:
1.  Finds an empty cell.
2.  **Optimization (MRV)**: Instead of picking the *first* empty cell, it picks the cell with the *fewest* possible valid numbers. This drastically reduces the search tree depth.
3.  Tries valid numbers (1-9).
4.  Recursively attempts to solve the rest of the grid.
5.  Backtracks if a dead end is reached.
