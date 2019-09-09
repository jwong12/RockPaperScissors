const ROCK_CHOICE = 'Rock';
const PAPER_CHOICE = 'Paper';
const SCISSORS_CHOICE = 'Scissors';
let playerScore = 0;
let computerScore = 0;

let h1 = document.querySelector('h1');
let canvas = document.getElementById('canvas');
let roundResult = document.getElementById('roundResult');
roundResult.textContent = "Have fun and good luck!";
let endMessage = document.getElementById('endGame');
endMessage.style.background = "FireBrick";
endMessage.style.color = "snow";
endMessage.style.fontSize = "22px";
endMessage.style.margin = "5px";

let gameDisplay = document.getElementById('gameDisplay');
let playerImg;
let computerImg;
let playerDiv = document.getElementById('playerDiv');
let computerDiv = document.getElementById('computerDiv');
let playerNode = document.createTextNode(playerScore);
let computerNode = document.createTextNode(computerScore);
playerDiv.appendChild(playerNode);
computerDiv.appendChild(computerNode);
let button = document.querySelector('button');
let response;

button.onclick = function() {
    runGame();
    checkWin();
}

function runGame() {
    let displayPicBool = false;
    let playerSelection;
    response = prompt("Rock, Paper or Scissors?");

    if(response !== "" && response !== null) {
        playerSelection = response.charAt(0).toUpperCase() + response.slice(1).toLowerCase();

        if(playerSelection === ROCK_CHOICE || playerSelection === PAPER_CHOICE || playerSelection === SCISSORS_CHOICE) {
            displayPicBool = true;
        }

    } else {
        playerSelection = null;
    }

    let computerSelection = computerPlay();
    roundResult.textContent = playRound(playerSelection, computerSelection);
    playerNode.textContent = playerScore;
    computerNode.textContent = computerScore;

    if(displayPicBool === true) {
        displayPlayerPic(playerSelection);
        displayComputerPic(computerSelection);
    }
}

function displayPlayerPic(playerSelection) {
    if(typeof playerImg !== 'undefined' && playerImg !== null){
        gameDisplay.removeChild(playerImg);
    }

    playerImg = document.createElement('img');
    playerImg.height = "110";
    playerImg.style.margin = "5px";
    playerImg.style.border = "thick solid DimGrey"

    if(playerSelection === "Rock") {
        playerImg.src = "images/rock.jpeg";

    } else if(playerSelection === "Paper") {
        playerImg.src = "images/paper.jpeg";

    } else {
        playerImg.src = "images/scissors.jpeg";

    }

    gameDisplay.appendChild(playerImg);
}

function displayComputerPic(computerSelection) {
    if(typeof computerImg !== 'undefined' && computerImg !== null){
        gameDisplay.removeChild(computerImg);
    }

    computerImg = document.createElement('img');
    computerImg.height = "110";
    computerImg.style.margin = "5px";
    computerImg.style.border = "thick solid DimGrey"

    if(computerSelection === "Rock") {
        computerImg.src = "images/rock.jpeg";

    } else if(computerSelection === "Paper") {
        computerImg.src = "images/paper.jpeg";

    } else {
        computerImg.src = "images/scissors.jpeg";

    }

    gameDisplay.appendChild(computerImg);
}

function checkWin() {
    if(playerScore === 3) {
        endMessage.textContent = "Congratulations! You won.";
        createResetBut();

    } else if(computerScore === 3) {
        endMessage.textContent = "Oh no... You lost. Try again?";
        createResetBut();
    }
    
}

function createResetBut(){
    let resetDiv = document.getElementById('resetButton');
    let resetButton = document.createElement('button');
    resetButton.textContent = "Reset";
    resetButton.style.margin = "10px";
    resetButton.style.height = "35px";
    resetButton.style.width = "90px";
    resetButton.style.color = "FireBrick";
    resetDiv.appendChild(resetButton);
    button.style.display = "none";

    resetButton.onclick = function() {
        resetScores();
        endMessage.textContent = "";
        resetDiv.removeChild(resetButton);
        button.style.display = "inline-block";
    }
}

function resetScores() {
    playerScore = 0;
    computerScore = 0;
    playerNode.textContent = playerScore;
    computerNode.textContent = computerScore;
    roundResult.textContent = "Have fun and good luck!";
    gameDisplay.removeChild(playerImg);
    gameDisplay.removeChild(computerImg);
    playerImg = null;
    computerImg = null;
}

function playRound(playerSelection, computerSelection){
    if(playerSelection === computerSelection) {
        return "You tied. You both have " + playerSelection;

    } else if (playerSelection === ROCK_CHOICE && computerSelection === SCISSORS_CHOICE) {
        ++playerScore;
        return "You Win! " +  playerSelection + " beats " + computerSelection;

    } else if (playerSelection === ROCK_CHOICE && computerSelection === PAPER_CHOICE) {
        ++computerScore;
        return "You Lose! " +  computerSelection + " beats " + playerSelection;

    } else if (playerSelection === PAPER_CHOICE && computerSelection === ROCK_CHOICE) {
        ++playerScore;
        return "You Win! " +  playerSelection + " beats " + computerSelection;

    } else if (playerSelection === PAPER_CHOICE && computerSelection === SCISSORS_CHOICE) {
        ++computerScore;
        return "You Lose! " +  computerSelection + " beats " + playerSelection;

    } else if (playerSelection === SCISSORS_CHOICE && computerSelection === PAPER_CHOICE) {
        ++playerScore;
        return "You Win! " +  playerSelection + " beats " + computerSelection;

    } else if (playerSelection === SCISSORS_CHOICE && computerSelection === ROCK_CHOICE) {
        ++computerScore;
        return "You Lose! " +  computerSelection + " beats " + playerSelection;

    } else {
        return "Invalid choice.";
    }
}

function computerPlay() {
    let computerSelection;
    let rand = Math.floor((Math.random() * 3) + 1);

    switch(rand) {
        case 1:
            computerSelection = ROCK_CHOICE;
            break;

        case 2:
            computerSelection = PAPER_CHOICE;
            break;

        case 3:
            computerSelection = SCISSORS_CHOICE;
            break;

        default:
            console.log("Computer Selection error.")
            return;
    }

    return computerSelection;
}