const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const start = document.querySelector('#start')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let timerId
let xDirection = -2
let yDirection = 2
let score = 0

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

// create block
class Block {
    constructor(xAxis, yAxis, name) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
        this.name = name
    }
}

// all my blocks
const blocks = [
    new Block(10, 270, 'Z Z Z'),
    new Block(120, 270, 'putinHuilo'),
    new Block(230, 270, 'Z Z Z'),
    new Block(340, 270, 'russian warship,f*ck off'),
    new Block(450, 270, 'russian tank,f*ck off'),
    new Block(10, 240, 'putinHuilo'),
    new Block(120, 240, 'Z Z Z'),
    new Block(230, 240,'russian warship,f*ck off'),
    new Block(340, 240, 'Z Z Z'),
    new Block(450, 240, 'putinHuilo'),
    new Block(10, 210, 'russian warship,f*ck off'),
    new Block(120, 210, 'russian tank,f*ck off'),
    new Block(230, 210, 'Z Z Z'),
    new Block(340, 210, 'russian warship,f*ck off'),
    new Block(450, 210, 'russian tank,f*ck off')
]


// draw all my block

function addBlocks() {
    for (let i = 0; i < blocks.length; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.innerHTML = blocks[i].name
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)

    }
}
addBlocks()

// add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// draw the ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// move user by keyboard
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                    currentPosition[0] -= 10
                    drawUser()
            }
        break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10
                drawUser()

            }
        break
    }
}
// move user by buttons
const buttonLeft = document.querySelector('.left')
const buttonRight = document.querySelector('.right')


function moveUserLeft() {
    if (currentPosition[0] > 0) {
            currentPosition[0] -= 40
            drawUser()
    }
}
function moveUserRight() {
    if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 40
        drawUser()
    }
}

document.addEventListener('keydown', moveUser)
buttonLeft.addEventListener('click', moveUserLeft)
buttonRight.addEventListener('click', moveUserRight)

// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall
grid.appendChild(ball)

// move the ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

function go() {
    timerId = setInterval(moveBall, 15)

}
start.addEventListener('click', go)



// check for collisions
function checkForCollisions() {
    // check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] & ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            allBlocks[i].innerHTML =''
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            // check for win
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'YOU WIN'
                document.alert = 'YOU WIN'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }
    }

    // check for wall collisions
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] > (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
        ) {
        changeDirection()
    }

    // check for user collions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }
        
    // check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose'
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}