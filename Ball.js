const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.00001

export default class Ball {
    constructor(ballElemen) {
        this.ballElemen = ballElemen
        this.reset()
    }

    rect() {
        return this.ballElemen.getBoundingClientRect()
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElemen).getPropertyValue('--x'))
    }

    set x(value) {
        this.ballElemen.style.setProperty('--x', value)
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElemen).getPropertyValue('--y'))
    }

    set y(value) {
        this.ballElemen.style.setProperty('--y', value)
    }

    reset() {
        this.x = 50
        this.y = 50
        this.direction = { x: 0 }
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
            const heading = randomNumBetweenTwoNum(0, 2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = INITIAL_VELOCITY
    }
    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        this.velocity += delta * VELOCITY_INCREASE
        const rect = this.rect()

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1
        }

        if (paddleRects.some(r => isCollision(r, this.ballElemen.getBoundingClientRect()))) {
            this.direction.x *= -1
        }

    }

}


function randomNumBetweenTwoNum(min, max) {
    return Math.random() * (max - min) + min
}
function isCollision(paddleRect, ballRect) {
    return (paddleRect.left <= ballRect.right
        && paddleRect.right >= ballRect.left
        && paddleRect.top <= ballRect.bottom
        && paddleRect.bottom >= ballRect.top)
}