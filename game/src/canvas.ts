import { ctx, deltaTime } from "./main"
import { getMovementVector } from "./inputs"
import Vector from "./vector"

let playerPos = new Vector(0, 0)
const playerSpeed = 0.2
export function onDraw() {
   const movementVector = getMovementVector()
   playerPos = playerPos.addPos(movementVector.multiply(playerSpeed).multiply(deltaTime))
   drawPlayer(playerPos.x, playerPos.y) // 🤓👆
}

export function drawPlayer(x: number, y: number) {
   ctx.fillStyle = "#f1f5f9"
   ctx.strokeStyle = "#cbd5e1"
   ctx.beginPath()
   ctx.roundRect(x, y, 50, 50, 6)
   ctx.fill()
   ctx.lineWidth = 3
   ctx.stroke()
}
