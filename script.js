let form = document.getElementById("form");
let grid = [];
let solveButton = document.getElementById("solveButton");
let clearButton = document.getElementById("clearButton");

//exemple available to test the program quickly
let setExemple1 = () => {
    grid = [
        ["3", "", "6", "5", "", "8", "4", "", ""], 
        ["5", "2", "", "", "", "", "", "", ""], 
        ["", "8", "7", "", "", "", "", "3", "1"], 
        ["", "", "3", "", "1", "", "", "8", ""], 
        ["9","", "", "8", "6", "3", "", "", "5"], 
        ["", "5", "", "", "9", "", "6", "", ""], 
        ["1", "3", "", "", "", "", "2", "5", ""], 
        ["", "", "", "", "", "", "", "7", "4"], 
        ["", "", "5", "2", "", "6", "3", "", ""]
    ];
    publishGrid(grid);
}

let setExemple2 = () => {
    grid = [
        ["", "", "", "2", "6", "", "7", "", "1"], 
        ["6", "8", "", "", "7", "", "", "9", ""],
        ["1", "9", "", "", "", "4", "5", "", ""],
        ["8", "2", "", "1", "", "", "", "4", ""],
        ["", "", "4", "6", "", "2", "9", "", ""],
        ["", "5", "", "", "", "3", "", "2", "8"],
        ["", "", "9", "3", "", "", "", "7", "4"],
        ["", "4", "", "", "5", "", "", "3", "6"],
        ["7", "", "3", "", "1", "8", "", "", ""]
    ];
    publishGrid(grid);
}

//create an array of 9 arrays representing the sudoku entered by the user 
let setGrid = () => {
    grid = [];
    let row = [];
    let count = 0;
    for (let cell of form) {
        row.push(cell.value);
        count += 1;
        if (count === 9) {
            count = 0;
            grid.push(row);
            row = [];
        }
    }
}

//clear the grid 
let clearGrid = () => {
    flatGrid = grid.flat();
    flatGrid.forEach((num, index) => {
        form[index].value = "";
    });
}

//get all the values of the row of a cell except itself 
let getRow = (x, y) => {
    let row = [...grid[y]];
    row.splice(x, 1);
    return row;
}

//get all the values of the column of a cell except itself 
let getColumn = (x, y) => {
    let column = [];
    //iterate through every line of the grid and add the value at the index except the one from the line where the value is taken from 
    for (let line of grid) {
        if (line != grid[y]) {
            column.push(line[x]);
        } 
    }
    return column;
}

//get all the values of the box of the cell except itself
let getBoxValues = (x, y) => {
    let boxValues = [];
    //bx = 0 if x is in column 0 to 2, = 1 if it's in column 3 to 5, 2 if it's in column 6 to 8 (columns start from 0)
    let bx = Math.floor(x / 3);
    //same than bx except for y
    let by = Math.floor(y / 3);
    //determines from which box is our cell
    for (let row = by * 3; row < by * 3 + 3; row++) { 
        for (let column = bx * 3; column < bx * 3 + 3; column++) {
            if (!(row === y && column === x)) {
                boxValues.push(grid[row][column]);
            }
        }
    }
    return boxValues;
}

let isGridValid = () => {
    //iterates through each row of the grid 
    for (let y = 0; y < 9; y++) {
        //iterate through each column of the grid
        for (let x = 0; x < 9; x++) {
            //when a cell contains a value, we chack if doesn't already breach one of the three rules of Sudoku 
            if (grid[y][x] !== "" && ((getRow(x, y).includes(grid[y][x])) || (getColumn(x, y).includes(grid[y][x])) || (getBoxValues(x, y).includes(grid[y][x])))) {
                return false;
            }
        }
    }
    return true; 
}

//check if we can put a number in a case 
let possible = (x, y, z) => {

    x = x.toString();
    y = y.toString();
    z = z.toString();
    //checks if our number is not already used in a horizontal line, in a vertical line and in a box
    if (!(grid[y].includes(z)) && !(getColumn(x, y).includes(z)) && !(getBoxValues(x, y).includes(z))) {
        return true;
    }
    else {
        return false;
    }
}

//check if our grid is complete 
let isComplete = () => {
    for (let y = 0; y < 9; y++) {
        //iterate through each column of the grid
        for (let x = 0; x < 9; x++) {
            if (grid[y][x] === "") {
                return false;
            }
        }
    }
    return true;
}

//publish the grid passed as an argument 
let publishGrid = () => {
    flatGrid = grid.flat();
    flatGrid.forEach((num, index) => {
        form[index].value = num;
    });
}

//solves the grid 
let solve = () => {
    //iterate through the lines of the grid 
    for (let y = 0; y < 9; y++) {
        //iterate through each column of the grid
        for (let x = 0; x < 9; x++) {
            //if a case is empty, we can try some numbers
            if (grid[y][x] === "") {
                //our answer must be between 1 to 9 to be correct
                for (let z = 1; z < 10; z++) {
                    if (possible(x, y, z)) {
                        grid[y][x] = z.toString();
                        solve();
                        if (isComplete()) {
                            return grid;
                        }            
                        else {
                            grid[y][x] = "";
                        }
                    }
                }
                //if there is no answer, we go back to our precedent function call and try another number 
                return;
            }
        }
    }
}

//solve then publish the sudoku
let solveAndPublish = () => {
    setGrid();
    if (!(isGridValid())) {
        alert("This grid is not valid, there must be an error");
        return;
    };
    solve();
    publishGrid();
}

solveButton.addEventListener("click", solveAndPublish);
clearButton.addEventListener("click", clearGrid);