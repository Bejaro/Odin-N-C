class Player{
constructor(symbol, name) {
    this.symbol = symbol;
    this.name = name;
    }
}

const player1 = new Player("X", "Player 1");
const player2 = new Player("O", "Player 2");

class GameBoard{
    constructor(){
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        this.currentPlayer = player1;
        }

    makeMove(player, row, col) {
    this.board[row] [col] = player.symbol;
    this.currentPlayer = (player === player1) ? player2 : player1;
    }

    checkWin() {
        // check rows
        for (let row = 0; row < 3; row++) {
          if (this.board[row][0] === this.board[row][1] && this.board[row][1] === this.board[row][2] && this.board[row][0] !== "") {
            return this.board[row][0];
          }
        }
        // check columns
        for (let col = 0; col < 3; col++) {
          if (this.board[0][col] === this.board[1][col] && this.board[1][col] === this.board[2][col] && this.board[0][col] !== "") {
            return this.board[0][col];
          }
        }
        // check diagonals
        if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] && this.board[0][0] !== "") {
          return this.board[0][0];
        }
        if (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0] && this.board[0][2] !== "") {
          return this.board[0][2];
        }
        // check for draw
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            if (this.board[row][col] === "") {
              return "";
            }
          }
        }
        return "draw";
      }
    }
    
const game = new GameBoard();

const board = document.getElementById("gametable");

// create board buttons
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    const button = document.createElement("button");
    button.id = `button-${row}-${col}`;
    button.className = "box";
    button.addEventListener("click", function() {
      game.makeMove(game.currentPlayer, row, col);
      updateBoard();
    });
    board.appendChild(button);
  }
}

const message = document.getElementById("message");

// create reset button
const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.addEventListener("click", function() {
  game = new GameBoard();
  updateBoard();
});
document.body.appendChild(resetButton);

function updateBoard() {
  // update board buttons
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const button = document.getElementById(`button-${row}-${col}`);
      button.textContent = game.board[row][col];
    }
  }
  // update message
  const result = game.checkWin();
  if (result === "X") {
    message.textContent = `${player1.name} wins!`;
  } else if (result === "O") {
    message.textContent = `${player2.name} wins!`;
  } else if (result === "draw") {
    message.textContent = "It's a draw!";
  } else {
    message.textContent = `${game.currentPlayer.name}'s turn`;
  }
}

updateBoard();