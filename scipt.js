import Ball from './Ball.js'
import Paddle from './Paddle.js'
const ball = new Ball(document.getElementById('ball'))
const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const computerPaddle = new Paddle(document.getElementById('computer-paddle'))
const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score')
console.log(computerScore)
console.log(document.getElementById('player-paddle').getBoundingClientRect())

let lastTime
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(),computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)

        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'))
        document.documentElement.style.setProperty('--hue', hue + delta * 0.01)
        console.log(hue)
        if (isLose()) handleLose()

    }
    lastTime = time
    window.requestAnimationFrame(update)

}

function isLose() {
    const rect = ball.rect()
    return rect.left <= 0 || rect.right >= window.innerWidth
}

function handleLose() {
    const rect = ball.rect()


    if (rect.right >= window.innerWidth) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1
    }

    if (rect.left <= 0) {
        computerScore.textContent = parseInt(computerScore.textContent) + 1
    }
    computerPaddle.reset()
    ball.reset()
}


window.requestAnimationFrame(update)

window.addEventListener('mousemove', e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})
