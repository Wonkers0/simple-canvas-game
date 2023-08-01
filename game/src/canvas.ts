import { ctx, deltaTime } from "./main"
import { getMovementVector } from "./inputs"
import { ws, socketReady, players, Player } from "./client"
import Vector from "./vector"

export let playerPos = new Vector(0, 0)
export let serverPlayerPos = new Vector(0, 0)
let serverMoveVec = new Vector(0, 0)

const playerSpeed = 0.2

export let frameCount = 0
let lastUpdate = performance.now()
const UPDATE_INTERVAL = 50
export function onDraw() {
   frameCount++
   const movementVector = getMovementVector()
   playerPos = playerPos.addPos(movementVector.multiply(playerSpeed).multiply(deltaTime))

   if (socketReady && performance.now() - lastUpdate >= UPDATE_INTERVAL) {
      if (!serverPlayerPos.equals(playerPos) || !serverMoveVec.equals(movementVector)) {
         ws.send(
            JSON.stringify({
               type: "position-update",
               x: playerPos.x,
               y: playerPos.y
            })
         )
         lastUpdate = performance.now()
         serverPlayerPos = playerPos.clone()
         serverMoveVec = movementVector.clone()
      }
   }

   drawPlayer(playerPos.x, playerPos.y, {
      fill: "#f1f5f9",
      outline: "#cbd5e1"
   })

   for (const id in players) {
      const player = players[id]
      const playerPos = calculatePlayerPosition(player.position, player.newPosition)

      drawPlayer(playerPos.x, playerPos.y, {
         fill: "#FFB8A7",
         outline: "#FF5932"
      })
   }
}

function calculatePlayerPosition(
   position: { x: number; y: number },
   newPosition: { x: number; y: number } | null
) {
   if (newPosition == null) return position
   const movementDir = new Vector(
      Math.sign(newPosition.x - position.x),
      Math.sign(newPosition.y - position.y)
   )
   position.x += Math.sign(movementDir.x) * playerSpeed * deltaTime
   position.y += Math.sign(movementDir.y) * playerSpeed * deltaTime

   if (isFurtherOnNumberLine(position.x, newPosition.x, movementDir.x)) position.x = newPosition.x
   if (isFurtherOnNumberLine(position.y, newPosition.y, movementDir.y)) position.y = newPosition.y

   return position
}

function isFurtherOnNumberLine(a: number, b: number, dir: number) {
   return a * dir > b * dir
}

export function drawPlayer(x: number, y: number, colors: { fill: string; outline: string }) {
   ctx.fillStyle = colors.fill
   ctx.strokeStyle = colors.outline
   ctx.beginPath()
   ctx.roundRect(x, y, 50, 50, 6)
   ctx.fill()
   ctx.lineWidth = 3
   ctx.stroke()
}
