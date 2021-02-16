import { CanvasView } from './view/CanvasView'
import { Ball } from './sprites/Ball'
import { Brick } from './sprites/Brick'
import { Paddle } from './sprites/Paddle'

// Images
import PADDLE_IMAGE from './images/paddle.png'
import BALL_IMAGE from './images/ball.png'
// Level and colors
import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY,
} from './setup'
//helpers

import { createBricks } from './helpers'

let gameOver = false
let score = 0

function setGameOver(view: CanvasView) {
    view.drawInfo('Game Over!')
    gameOver = false
}

function setGameWin(view: CanvasView) {
    view.drawInfo('Game Win!')
    gameOver = false
}

function gameLoop(
    view: CanvasView,
    bricks: Brick[]
    // paddle: Paddle,
    // ball: Ball
) {
    view.clear()
    view.drawBricks(bricks)

    requestAnimationFrame(() => gameLoop(view, bricks))
}

function startGame(view: CanvasView) {
    //reset displays
    score = 0
    view.drawInfo('')
    view.drawScore(0)
    //create all bricks
    const bricks = createBricks()
    // Create a paddle
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {
            x: PADDLE_STARTX,
            y: view.canvas.height - PADDLE_HEIGHT - 5,
        },
        PADDLE_IMAGE
    )

    gameLoop(view, bricks)
}

//create a new view
const view = new CanvasView('#playField')
view.initStartButton(startGame)
