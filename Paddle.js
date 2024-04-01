const SPEED = 0.02

export default class Paddle {
    constructor(paddleElemnt) {
        this.paddleElemnt = paddleElemnt
        this.reset()
    }

    rect () {
        return this.paddleElemnt.getBoundingClientRect()
    }

    get position () {
        return parseFloat(getComputedStyle(this.paddleElemnt).getPropertyValue('--position'))
    }

    set position (value) {
        this.paddleElemnt.style.setProperty('--position',value)
    }

    reset () {
        this.position = 50
        console.log(this.rect())
    }

    update(delta, ballHeight) {
        this.position += SPEED * delta * (ballHeight - this.position)  
    }

}

