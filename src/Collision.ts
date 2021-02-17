// Types
import { Brick } from './sprites/Brick'
import { Paddle } from './sprites/Paddle'
import { Ball } from './sprites/Ball'
import { CanvasView } from './view/CanvasView'

export class Collision {
    checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
        // 1. Check ball collision with paddle
        if (
            ball.pos.x + ball.width > paddle.pos.x &&
            ball.pos.x < paddle.pos.x + paddle.width &&
            ball.pos.y + ball.height === paddle.pos.y
        ) {
            ball.changeYDirection()
        }

        // 2. check ball collision with walls
        // Ball movement X constraints

        if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
            ball.changeXDirection()
        }

        // Ball movement Y constraints
        if (ball.pos.y < 0 + ball.height) {
            ball.changeYDirection()
        }
    }
}
