const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let hitPosition
let currentTime = 10
let timeId = null

function randomSqueare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * 16)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(square.id == hitPosition) {
        result++
        score.textContent = result
        hitPosition = null
        }
    })
})

function moveMole() {
    timeId = setInterval(randomSqueare, 650)
}

moveMole()

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timeId)
        alert('GAME OVER! Your final score is ' + result + ' Bitcoins')
    }
}

let countDownTimerId = setInterval(countDown, 1000)
