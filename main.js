game_display = document.getElementById("gameboard");



const gameBoard = (() => {
    let moveBoard = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];

    const getBoard = () => {moveBoard};

    const setUp = () => {
        game_cells = Array.from(document.getElementsByClassName("gameboard-cell"));    
        game_cells.forEach(cell => cell.addEventListener("click", () => {
            if(cell.innerText !== "X" && cell.innerText !== "O") {

                if(gameController.moveCounter % 2 === 0) {
                    cell.innerText = "X";
                    gameBoard.moveBoard[cell.id] = "X";
                }
                else if(gameController.moveCounter % 2 !== 0) {
                    cell.innerText = "O";
                    gameBoard.moveBoard[cell.id] = "O";
                }


                gameController.increaseCounter();
                gameController.checkForGameState(gameBoard.moveBoard);
            }
            else {
                console.log("fail");
            }
        }))
    };

    const reset = () => {
        gameBoard.moveBoard = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];

        //Clearing each cell
        game_cells.forEach(cell => cell.remove());
        for(let i = 0; i < 9; i++) {
            tempCell = document.createElement("BUTTON");
            tempCell.classList.add("gameboard-cell");
            tempCell.id = i;
            game_display.appendChild(tempCell);
        }
        gameBoard.setUp();
    }

    return{setUp, reset, moveBoard, getBoard};
})();

const player = ((symbol) => {
    const makeMove = (coord) => {
        gameBoard.moveBoard[coord] = symbol;
    } 

    return{makeMove};
});

const gameController = (() => {
    let moveCounter = 0;

    const increaseCounter = () => { gameController.moveCounter += 1;}

    const resetCounter = () => { gameController.moveCounter = 0;}

    const checkForGameState = (board) => {
        const rowWinCondition = (((board[0] === board[1] && board[0] === board[2]) && board[0] !== "0") || ((board[3] === board[4] && board[3] === board[5]) && board[3] !== "0") || ((board[6] === board[7] && board[6] === board[8]) && board[6] !== "0"));
        const columnWinCondition = (((board[0] === board[3] && board[0] === board[6]) && board[0] !== "0") || ((board[1] === board[4] && board[1] === board[7]) && board[1] !== "0") || ((board[2] === board[5] && board[2] === board[8]) && board[2] !== "0"))
        const diagonalWinCondition = (((board[0] === board[4] && board[0] === board[8]) || board[2] === board[4] && board[2] === board[6]) && board[4] !== "0");
        
        if ((rowWinCondition) || (columnWinCondition) || (diagonalWinCondition)) {
            // Code for win
            displayWinner();
        }
        else if (!(gameBoard.moveBoard.includes("0"))) {
            // Checking for a tie
            displayTie();
        }

 
    }

    // End of Game overlay
    overlay = document.getElementById("overlay");
    overlay.addEventListener("click", () => {
            resetCounter();
            gameBoard.reset(); 

            overlay.classList.remove("overlay-active");
    })
    
    const displayWinner = () => {
        overlay.classList.add("overlay-active");

        if (gameController.moveCounter % 2 !== 0) {
            overlay.innerText = "Player 1 Wins!";
        }
        else {
            overlay.innerText = "Player 2 Wins!";
        }
    }

    const displayTie = () => {
        overlay.classList.add("overlay-active");
        overlay.innerText = "It's a tie!";
    }

    return {moveCounter, increaseCounter, checkForGameState};
})();

gameBoard.setUp();
