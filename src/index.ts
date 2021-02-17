import { CanvasView } from './view/CanvasView'
import { Ball } from './sprites/Ball'
import { Brick } from './sprites/Brick'
import { Paddle } from './sprites/Paddle'
import { Collision } from './Collision'

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
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball,
    collision: Collision
) {
    view.clear()
    view.drawBricks(bricks)
    view.drawSprite(paddle)
    view.drawSprite(ball)

    // Move Ball
    ball.moveBall()

    // Move paddle and check so it won't exit the playfield
    if (
        (paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight &&
            paddle.pos.x < view.canvas.width - paddle.width)
    ) {
        paddle.movePaddle()
    }

    collision.checkBallCollision(ball, paddle, view)

    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision))
}

function startGame(view: CanvasView) {
    //reset displays
    score = 0
    view.drawInfo('')
    view.drawScore(0)
    //Create collision instance
    const collision = new Collision()
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

    const ball = new Ball(
        BALL_SIZE,
        { x: BALL_STARTX, y: BALL_STARTY },
        BALL_SPEED,
        BALL_IMAGE
    )

    gameLoop(view, bricks, paddle, ball, collision)
}

//create a new view
const view = new CanvasView('#playField')
view.initStartButton(startGame)
