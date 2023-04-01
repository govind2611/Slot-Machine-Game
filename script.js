/*
    we are creating spinning machine
    1. Deposit the money
    2. No of lines user want to bet
    3. collect bet ammount
    4. spin the machine
    5. check if user won
    6.give use winning
    7. else try again
*/

// to play in vs code just uncomment this line
//const prompt = "prompt-sync"();

const ROWS = 3;
const COLS = 3;
const SYMBOL_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

//1. Deposit the money
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const convertToNumber = parseFloat(depositAmount);

    if (isNaN(convertToNumber) || convertToNumber <= 0) {
      console.log("Please enter a valid Deposit Amount !!");
    } else {
      return convertToNumber;
    }
  }
};

// 2. No of lines user want to bet
const getNumberofLine = () => {
  while (true) {
    const lines = prompt("Enter how many lines do you want to bet (1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Please enter lines between 1 to 3 !!");
    } else {
      return numberOfLines;
    }
  }
};

//  3. collect bet ammount
const getBet = (balance, numberOfLines) => {
  while (true) {
    const bet = prompt("Enter the bet per line : ");
    const numberOfBet = parseFloat(bet);

    if (
      isNaN(numberOfBet) ||
      numberOfBet <= 0 ||
      numberOfBet > balance / numberOfLines
    ) {
      console.log("Please enter valis bet amount");
    } else {
      return numberOfBet;
    }
  }
};
//4. spin the machine
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbols = reelSymbols[randomIndex];
      reels[i].push(selectedSymbols);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};
// transposing the matrix
const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

//  5. check if user won
const getWinnigs = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};
// 6.give use winning
const game = () => {
  let balance = deposit();
  while (true) {
    console.log("You have remainig balace of $" + balance);
    const numberOfLines = getNumberofLine();
    const bet = getBet(balance, numberOfLines);
    balance -= numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnigs(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You Won, $" + winnings.toString());
    if (balance <= 0) {
      console.log("You ran out of money...");
      break;
    }
    const playAgain = prompt("Do you Want to play again (y/n)?");
    if (playAgain != "y") break;
  }
};

game();
