solveIt = document.getElementById("solveIt");

let solve = () => {
    // get all the numbers entered in the grid
    let A1 = document.getElementById("A1").value;
    let A2 = document.getElementById("A2").value;
    let A3 = document.getElementById("A3").value;
    let A4 = document.getElementById("A4").value;
    let A5 = document.getElementById("A5").value;
    let A6 = document.getElementById("A6").value;
    let A7 = document.getElementById("A7").value;
    let A8 = document.getElementById("A8").value;
    let A9 = document.getElementById("A9").value;
    let B1 = document.getElementById("B1").value;
    let B2 = document.getElementById("B2").value;
    let B3 = document.getElementById("B3").value;
    let B4 = document.getElementById("B4").value;
    let B5 = document.getElementById("B5").value;
    let B6 = document.getElementById("B6").value;
    let B7 = document.getElementById("B7").value;
    let B8 = document.getElementById("B8").value;
    let B9 = document.getElementById("B9").value;
    let C1 = document.getElementById("C1").value;
    let C2 = document.getElementById("C2").value;
    let C3 = document.getElementById("C3").value;
    let C4 = document.getElementById("C4").value;
    let C5 = document.getElementById("C5").value;
    let C6 = document.getElementById("C6").value;
    let C7 = document.getElementById("C7").value;
    let C8 = document.getElementById("C8").value;
    let C9 = document.getElementById("C9").value;
    let D1 = document.getElementById("D1").value;
    let D2 = document.getElementById("D2").value;
    let D3 = document.getElementById("D3").value;
    let D4 = document.getElementById("D4").value;
    let D5 = document.getElementById("D5").value;
    let D6 = document.getElementById("D6").value;
    let D7 = document.getElementById("D7").value;
    let D8 = document.getElementById("D8").value;
    let D9 = document.getElementById("D9").value;
    let E1 = document.getElementById("E1").value;
    let E2 = document.getElementById("E2").value;
    let E3 = document.getElementById("E3").value;
    let E4 = document.getElementById("E4").value;
    let E5 = document.getElementById("E5").value;
    let E6 = document.getElementById("E6").value;
    let E7 = document.getElementById("E7").value;
    let E8 = document.getElementById("E8").value;
    let E9 = document.getElementById("E9").value;
    let F1 = document.getElementById("F1").value;
    let F2 = document.getElementById("F2").value;
    let F3 = document.getElementById("F3").value;
    let F4 = document.getElementById("F4").value;
    let F5 = document.getElementById("F5").value;
    let F6 = document.getElementById("F6").value;
    let F7 = document.getElementById("F7").value;
    let F8 = document.getElementById("F8").value;
    let F9 = document.getElementById("F9").value;
    let G1 = document.getElementById("G1").value;
    let G2 = document.getElementById("G2").value;
    let G3 = document.getElementById("G3").value;
    let G4 = document.getElementById("G4").value;
    let G5 = document.getElementById("G5").value;
    let G6 = document.getElementById("G6").value;
    let G7 = document.getElementById("G7").value;
    let G8 = document.getElementById("G8").value;
    let G9 = document.getElementById("G9").value;
    let H1 = document.getElementById("H1").value;
    let H2 = document.getElementById("H2").value;
    let H3 = document.getElementById("H3").value;
    let H4 = document.getElementById("H4").value;
    let H5 = document.getElementById("H5").value;
    let H6 = document.getElementById("H6").value;
    let H7 = document.getElementById("H7").value;
    let H8 = document.getElementById("H8").value;
    let H9 = document.getElementById("H9").value;
    let I1 = document.getElementById("I1").value;
    let I2 = document.getElementById("I2").value;
    let I3 = document.getElementById("I3").value;
    let I4 = document.getElementById("I4").value;
    let I5 = document.getElementById("I5").value;
    let I6 = document.getElementById("I6").value;
    let I7 = document.getElementById("I7").value;
    let I8 = document.getElementById("I8").value;
    let I9 = document.getElementById("I9").value;

    // group all numbers in arrays
    let line1 = [A1, A2, A3, A4, A5, A6, A7, A8, A9];
    let line2 = [B1, B2, B3, B4, B5, B6, B7, B8, B9];
    let line3 = [C1, C2, C3, C4, C5, C6, C7, C8, C9];
    let line4 = [D1, D2, D3, D4, D5, D6, D7, D8, D9];
    let line5 = [E1, E2, E3, E4, E5, E6, E7, E8, E9];
    let line6 = [F1, F2, F3, F4, F5, F6, F7, F8, F9];
    let line7 = [G1, G2, G3, G4, G5, G6, G7, G8, G9];
    let line8 = [H1, H2, H3, H4, H5, H6, H7, H8, H9];
    let line9 = [I1, I2, I3, I4, I5, I6, I7, I8, I9];

    // group all arrays in a grid
    let grid = [line1, line2, line3, line4, line5, line6, line7, line8, line9];

    //get all the values of the vertical line of a particular value 
    let getVerticalLine = (num, horizontalLine) => {
        //get the index of the value in order take every value at this index in every line
        index = horizontalLine.indexOf(num);
        verticalLine = [];
        //iterate through every line of the grid and add the value at the index except the one from the line where the value is taken from 
        for (line of grid) {
            if (line != horizontalLine) {
                verticalLine.push(line[index]);
            } 
        }
        return verticalLine;
    }

    let getSquareValues = (num, horizontalLine) => {
        //get the index of the value in order to determine from which of the 9 squares our value is part of
        index = horizontalLine.indexOf(num);
        //get the index of our line in order to determine from which of the 9 squares our value is part of 
        lineIndex = grid.indexOf(horizontalLine);
        squareValue = [];

        //check in which square our value is and crrate an array with each value from the square except our own
        if (index < 3 && lineIndex < 3) {
            //iterate through line 1 to 3
            for (line = 0; line < 3; line++) {
                //iterate through columns 1 to 3
                for (column = 0; column < 3; column++) {
                    //check that we don't include our own value
                    if (!(line === lineIndex && column === index)) {
                        squareValue.push(grid[line][column]);
                    }
                }
            }
            return squareValue;  
        } else if (index < 6 && lineIndex < 3) {
            //iterate through line 1 to 3
            for (line = 0; line < 3; line++) {
                //iterate through columns 4 to 6
                for (column = 3; column < 6; column++) {
                    //check that we don't include our own value
                    if (!(line === lineIndex && column === index)) {
                        squareValue.push(grid[line][column]);
                    }
                }
            } 
            return squareValue;
        } else if (index < 9 && lineIndex < 3) {
            //iterate through line 1 to 3
            for (line = 0; line < 3; line++) {
                //iterate through columns 6 to 9
                for (column = 6; column < 9; column++) {
                    //check that we don't include our own value
                    if (!(line === lineIndex && column === index)) {
                        squareValue.push(grid[line][column]);
                    }
                }
            }
            return squareValue;
        } else if (index < 3 && lineIndex < 6) {
            //iterate through line 4 to 6
            for (line = 4; line < 7; line++) {
                //iterate through columns 1 to 3
                for (column = 0; column < 3; column++) {
                    //check that we don't include our own value
                    if (!(line === lineIndex && column === index)) {
                        squareValue.push(grid[line][column]);
                    }
                }
            }
            return squareValue;
        } else if (index < 6 && lineIndex < 6) {
            //iterate through line 4 to 6
            for (line = 3; line < 6; line++) {
                //iterate through columns 4 to 6
                for (column = 4; column < 6; column++) {
                    //check that we don't include our own value
                    if (!(line === lineIndex && column === index)) {
                        squareValue.push(grid[line][column]);
                    }
                }
            }
            return squareValue;
        } else if (index < 9 && lineIndex < 6) {
            //iterate through line 4 to 6
            for (line = 3; line < 6; line++) {
                //iterate through columns 6 to 9
                for (column = 6; column < 9; column++) {
                    //check that we don't include our own value
                    if (!(line === lineIndex && column === index)) {
                        squareValue.push(grid[line][column]);
                    }
                }
            }
            return squareValue;
        } else if (index < 3 && lineIndex < 9) {
            //iterate through line 6 to 9
            for (line = 6; line < 9; line++) {
                //iterate through columns 1 to 3
                for (column = 0; column < 3; column++) {
                    //check that we don't include our own value
                    if (!(line === lineIndex && column === index)) {
                        squareValue.push(grid[line][column]);
                    }
                }
            }
            return squareValue;
        } else if (index < 6 && lineIndex < 9) {
            //iterate through line 6 to 9
            for (line = 6; line < 9; line++) {
                //iterate through columns 1 to 3
                for (column = 3; column < 6; column++) {
                    //check that we don't include our own value
                    if (!(line === lineIndex && column === index)) {
                        squareValue.push(grid[line][column]);
                    }
                }
            }
            return squareValue;
        } else if (index < 9 && lineIndex < 9) {
            //iterate through line 6 to 9
            for (line = 6; line < 9; line++) {
                //iterate through columns 1 to 3
                for (column = 6; column < 9; column++) {
                    //check that we don't include our own value
                    if (!(line === lineIndex && column === index)) {
                        squareValue.push(grid[line][column]);
                    }
                }
            }
            return squareValue;
        } else {
            return "Some fuckery went there";
        }
    }

    //iterate through the lines of the grid 
    for (let line of grid) {
        //iterate through each numbers of the grid
        for (let num of line) {
            //if a case is empty, we can try some numbers
            if (num === "") {
                //our answer must be between 1 to 0 to be correct
                for (x of ["1", "2" ,"3", "4"," 5", "6", "7", "8", "9"]) {
                    if (!(line.includes(x)) && !(verticalLine(x, line).includes(x) &&) {

                    }
                }
            }
        }
    }
}

solveIt.addEventListener("click", solve);