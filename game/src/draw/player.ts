import Vector from "../utilities/vector"
import { ctx, deltaTime } from "../main"
import { playerSpeed, playerPos } from "./canvas"
import { Position } from "../types/world"
import type { DrawFunction } from "../utilities/GameObject"
import { chatOpen, drawChatBase, drawPlayerChat, message } from "./chat"
import { initPacket } from "../networking/client"

export function drawSelf() {
   drawPlayerGraphics(playerPos.x, playerPos.y, {
      fill: "#f1f5f9",
      outline: "#cbd5e1"
   })
   if (initPacket.you.chatMessages) {
      drawPlayerChat(playerPos.x, playerPos.y, initPacket.you)
   }
   if (chatOpen) drawChatBase(playerPos.x, playerPos.y, message, true)
}

export const drawOtherPlayer: DrawFunction = (gameObject) => {
   // if (!gameObject.inBounds(playerSize, playerSize)) return

   const { x, y } = calculatePlayerPosition(gameObject.position, gameObject.data.newPosition)

   drawPlayerGraphics(x, y, { fill: "#ffb8a7", outline: "#ff5932" })
   drawPlayerChat(x, y, gameObject.data)
}

export const playerSize = 50
function drawPlayerGraphics(x: number, y: number, colors: { fill: string; outline: string }) {
   ctx.fillStyle = colors.fill
   ctx.strokeStyle = colors.outline
   ctx.beginPath()
   ctx.roundRect(x, y, playerSize, playerSize, 6)
   ctx.fill()
   ctx.lineWidth = 3
   ctx.stroke()
}

function calculatePlayerPosition(position: Position, newPosition: Position | null) {
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
