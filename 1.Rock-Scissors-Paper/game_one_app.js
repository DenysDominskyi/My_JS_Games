const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('.button')
let userChoice
let computerChoice
let result

const newClassBox = document.querySelector('.game-box')

possibleChoices.forEach(possibleChoices => possibleChoices.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
    getNewClass()
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1
    if (randomNumber === 1) {
        computerChoice = 'rock'
    }
    if (randomNumber === 2) {
        computerChoice = 'paper'
    }
    if (randomNumber === 3) {
        computerChoice = 'scissors'
    }
    computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {
    if (computerChoice === userChoice) {
        result = 'Its a draw'
    }
    // ROCK
    if (computerChoice === 'rock' && userChoice === "paper") {
        result = 'You WIN !'
    }
    if (computerChoice === 'rock' && userChoice === "scissors") {
        result = 'You lose'
    }
    // PAPER
    if (computerChoice === 'paper' && userChoice === "scissors") {
        result = 'You WIN !'
    }
    if (computerChoice === 'paper' && userChoice === "rock") {
        result = 'You lose'
    }
    // SCISSORS
    if (computerChoice === 'scissors' && userChoice === "rock") {
        result = 'You WIN !'
    }
    if (computerChoice === 'scissors' && userChoice === "paper") {
        result = 'You lose'
    }
    resultDisplay.innerHTML = result
}

function getNewClass() {
    if (result === 'You WIN !') {
        newClassBox.classList.add('win')
        newClassBox.classList.remove('lose')
        newClassBox.classList.remove('its-a-draw')
    }

    if (result === 'You lose') {
        newClassBox.classList.add('lose')        
        newClassBox.classList.remove('win')
        newClassBox.classList.remove('its-a-draw')
    }
    
    if (result === 'Its a draw') {
        newClassBox.classList.add('its-a-draw')
        newClassBox.classList.remove('win')
        newClassBox.classList.remove('lose')
    }
}