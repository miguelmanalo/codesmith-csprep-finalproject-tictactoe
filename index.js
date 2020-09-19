// Tic Tac Toe: Miguel Manalo, Tjolanda Sullivan, Sung Y Kim (CS Prep 30)

// this is the main Tic-Tac-Toe game function that holds the whole game
// we call it to start the game fresh
function ticTacToe() {
  function randomAI(thisBoard, currPlay) {
    let aiMove = [];
    let checkValid = false;
    const aiXcoord = Math.floor(Math.random() * 3); // returns a random integer from 0 to 2
    aiMove.push(aiXcoord);
    const aiYcoord = Math.floor(Math.random() * 3); // returns a random integer from 0 to 2
    aiMove.push(aiYcoord);
    while (checkValid === false) {
      if (
        thisBoard[aiMove[0]][aiMove[1]] === `X` ||
        thisBoard[aiMove[0]][aiMove[1]] === `O`
      ) {
        aiMove = randomAI(newBoard, currentPlayer);
      } else {
        checkValid = true;
      }
    }
    return aiMove;
  }
  let playerOne;
  let playerTwo;
  let currentPlayer;
  let player = playerOne;
  function vsHuman() {
    playerOne = prompt('Player One, enter your name: '); // ask playerOne their name
    playerOne += ' is X:'; // add this info to name
    playerTwo = prompt('Player Two, enter your name: '); // same as with playerOne
    playerTwo += ' is O:';
    player = playerOne; // must initialize a value for the first turn
  }
  // this makes a fresh board
  const makeBoard = () => {
    return [
      [` `, ` `, ` `],
      [` `, ` `, ` `],
      [` `, ` `, ` `],
    ];
  };
  let newBoard = makeBoard();
  const gameType = confirm(`Do you want to play against the CPU?`);
  if (gameType === true) {
    playerOne = prompt('Player One, enter your name: '); // ask playerOne their name
    playerOne += ' is X:'; // add this info to name
    playerTwo = 'CPU is O:';
    player = playerOne; // must initialize a value for the first turn
  } else {
    vsHuman();
  }
  // this is our board renderer it receives the output of makeBoard
  const coolBoard = (board, coord) => {
    const tempArray = board;
    tempArray[coord[0]][coord[1]] = currentPlayer;
    console.log(`   0 1 2 `);
    console.log(`  _______`);
    console.log(`0| ${tempArray[0]} |`);
    console.log(`1| ${tempArray[1]} |`);
    console.log(`2| ${tempArray[2]} |`);
    console.log(`  _______`);
    return tempArray;
  };
  // getMove gets the turn the player wants to make
  function getMove() {
    // get the move in two parts: x and y coordinates
    const playerMove = [];
    let playerXcoord = null;
    let playerYcoord = null;
    alert(`${player}, it's your turn now.`);
    // this sanitizes player input at the Y coordinate level I'm sorry I named things this way
    function xMove() {
      playerXcoord = prompt(`${player}, enter your Y coordinate of 0, 1, or 2`);
      while (
        playerXcoord !== 0 ||
        playerXcoord !== 1 ||
        playerXcoord !== 2 ||
        playerXcoord === null
      ) {
        switch (playerXcoord) {
          case '0':
          case '1':
          case '2':
          case 0:
          case 1:
          case 2:
            return playerXcoord;
          default:
            console.log(playerXcoord, `playerXcoord`);
            console.log(`Invalid move. Please enter 0, 1, or 2`);
            playerXcoord = null;
            playerXcoord = prompt(
              `${player}, enter your Y coordinate of 0, 1, or 2`
            );
        }
      }
    }
    // this sanitizes player input at the X coordinate I'm sorry I named things this way
    function yMove() {
      playerYcoord = prompt(`${player}, enter your X coordinate of 0, 1, or 2`);
      while (
        playerYcoord !== 0 ||
        playerYcoord !== 1 ||
        playerYcoord !== 2 ||
        playerYcoord == null
      ) {
        switch (playerYcoord) {
          case '0':
          case '1':
          case '2':
          case 0:
          case 1:
          case 2:
            return playerYcoord;
          default:
            console.log(playerYcoord, `playerYcoord`);
            console.log(`Invalid move. Please enter 0, 1, or 2`);
            playerYcoord = null;
            playerYcoord = prompt(
              `${player}, enter your X coordinate of 0, 1, or 2`
            );
        }
      }
    }
    xMove(); // returns playerXcoord
    playerMove.push(Number(playerXcoord));
    console.log(playerMove, `your X-coordinate`);
    yMove(); // returns playerYcoord
    playerMove.push(Number(playerYcoord));
    console.log(playerMove, `your move`);
    // pass playerMove to isValidMove
    return playerMove;
  }
  function isValidMove(currBoard, currMove) {
    // takes in attemptedMove and lets it thru if its OK
    // takes in current state of Board
    // restarts getMove() if not OK
    // if the attempted move in the array is NOT empty space
    // then it's invalid
    let checkValid = false;
    // this while loops ensures that no matter how many times the player enters an invalid move it will always ask for a valid entry until it gets a legal move
    // when it does get a valid entry, checkValid is true and exits loop
    while (checkValid === false) {
      if (
        currBoard[currMove[0]][currMove[1]] === `X` ||
        currBoard[currMove[0]][currMove[1]] === `O`
      ) {
        console.log(`Invalid move, please enter a new move`);
        currMove = getMove();
      } else {
        checkValid = true;
      }
    }
    return currMove;
  }
  // this checks for winners and prints win statement
  function checkResult(result, playerName) {
    let userPlay;
    if (result === true) {
      console.log(`${playerName} won the game!`);
      console.log(`Thanks for playing our game! \n This game is brought to you by \n Tjolanda Sullivan, Sung Y Kim, Miguel Manalo \n░░░░░░░░░░░░▄▄░░░░░░░░░
  ░░░░░░░░░░░█░░█░░░░░░░░
  ░░░░░░░░░░░█░░█░░░░░░░░
  ░░░░░░░░░░█░░░█░░░░░░░░
  ░░░░░░░░░█░░░░█░░░░░░░░
  ███████▄▄█░░░░░██████▄░░
  ▓▓▓▓▓▓█░░░░░░░░░░░░░░█░
  ▓▓▓▓▓▓█░░░░░░░░░░░░░░█░
  ▓▓▓▓▓▓█░░░░░░░░░░░░░░█░
  ▓▓▓▓▓▓█░░░░░░░░░░░░░░█░
  ▓▓▓▓▓▓█░░░░░░░░░░░░░░█░
  ▓▓▓▓▓▓█████░░░░░░░░░█░░
  ██████▀░░░░▀▀██████▀░░░░\n
  idea: https://robertheaton.com/2018/10/09/programming-projects-for-advanced-beginners-3-a/`);
      userPlay = confirm(`Do you want to play again?`);
      return userPlay;
    }
    if (result === `Draw`) {
      console.log(`It's a tie`);
      userPlay = confirm(`Do you want to play again?`);
      return userPlay;
    }
  }
  const check_winner = (board) => {
    const resultList = {
      var1: 'OOO',
      var2: 'XXX',
    };
    // horizontal result
    for (let i = 0; i < board.length; i += 1) {
      const tempString = board[i][0] + board[i][1] + board[i][2];
      if (tempString === resultList.var1 && board[i][0] === currentPlayer) {
        return true;
      }
      if (tempString === resultList.var2 && board[i][0] === currentPlayer) {
        return true;
      }
    }
    // vertical result
    for (let j = 0; j < board.length; j += 1) {
      const tempString = board[0][j] + board[1][j] + board[2][j];
      if (tempString === resultList.var1 && board[0][j] === currentPlayer) {
        return true;
      }
      if (tempString === resultList.var2 && board[0][j] === currentPlayer) {
        return true;
      }
    }
    // diagonal result
    const diaResult1 = board[0][0] + board[1][1] + board[2][2];
    const diaResult2 = board[2][0] + board[1][1] + board[0][2];
    if (diaResult1 === resultList.var1 && board[1][1] === currentPlayer) {
      return true;
    }
    if (diaResult1 === resultList.var2 && board[1][1] === currentPlayer) {
      return true;
    }
    if (diaResult2 === resultList.var1 && board[1][1] === currentPlayer) {
      return true;
    }
    if (diaResult2 === resultList.var2 && board[1][1] === currentPlayer) {
      return true;
    }
    // check if all the slots are full in the tic-tac-toe board
    let valueCounter = 0;
    for (let k = 0; k < board.length; k += 1) {
      for (let l = 0; l < board.length; l += 1) {
        if (board[k][l] !== ` `) {
          valueCounter += 1;
        }
      }
    }
    if (valueCounter === 9) {
      return 'Draw';
    }
    // if none is returned, the makeBoard keeps going
    return false;
  };
  // initialize these so they're global
  let checkMove;
  let nowMove;
  // this is the bulk of the game
  const makeMove = (prevBoard, playMove) => {
    const playerInput = coolBoard(prevBoard, playMove);
    return playerInput;
  };
  for (let i = 1; i < 10; i += 1) {
    let result;
    if (i % 2 === 0) {
      currentPlayer = 'O';
      if (gameType === true) {
        checkMove = randomAI(newBoard, currentPlayer);
      } else {
        checkMove = getMove();
      }
      nowMove = isValidMove(newBoard, checkMove);
      newBoard = makeMove(newBoard, nowMove);
      result = check_winner(newBoard);
      const decision = checkResult(result, player);
      player = playerOne;
      if (decision === true) {
        ticTacToe();
        break;
      } else if (decision === false) {
        break;
      }
    } else {
      currentPlayer = 'X';
      checkMove = getMove();
      nowMove = isValidMove(newBoard, checkMove);
      newBoard = makeMove(newBoard, nowMove);
      result = check_winner(newBoard);
      const decision = checkResult(result, player);
      player = playerTwo;
      if (decision === true) {
        ticTacToe();
        break;
      } else if (decision === false) {
        break;
      }
    }
  }
}
ticTacToe();

// for refactoring
// 206: recursion instead of for loop
// in check_winner do functional programming instead of for loops
// big O notation
// for loops : n^2(O)
// n(O)
// stuff we'd add
// play against the CPU
// Left to do
// validating moves - overwriting a taken space
// validating player input - someone writes 'fart', 9
// checking for winners - play again?
// checking for ties
// make player 1 and player 2
// credits with our names, URL for game idea
// fancy stuff
// let players choose X/O
// play again prompt
// give up?
// winner art
// refining it
// computer AI
// this constatnly checks for winners every turn
function randomAI(thisBoard, currPlay) {
  let aiMove = [];
  const aiXcoord = push.aiMove(Math.floor(Math.random() * 2)); // returns a random integer from 0 to 2
  const aiYcoord = push.aiMove(Math.floor(Math.random() * 2)); // returns a random integer from 0 to 2
  aiMove = isValidMove(newBoard, checkMove);
}
