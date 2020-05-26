let form = document.getElementById("form");
let grid = [];
let solveIt = document.getElementById("solveIt");

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

//get all the values of the vertical line of a particular value 
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

//get all the values of one of the 9 boxes 
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
            if (grid[y][x] !== "" && ((grid[y].includes(grid[y][x])) && (getColumn(x, y).includes(grid[y][x])) && (getBoxValues(x, y).includes(grid[y][x])))) {
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

//main function that solves the grid 
let solve = () => {
    if (!(isGridValid())) {
        alert("This grid is not valid, there must be an error");
        return
    };
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


solveIt.addEventListener("click", solve);