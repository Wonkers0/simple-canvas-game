import { ctx, deltaTime } from "../main"
import { getMovementVector } from "../utilities/inputs"
import { ws, socketReady, initPacket } from "../networking/client"
import Vector from "../utilities/vector"
import { playerSize } from "./player"
import { gameObjects } from "../utilities/GameObject"
import { chatOpen } from "./chat"

export let playerPos = new Vector(0, 0)
export let serverPlayerPos = new Vector(0, 0)

export const playerSpeed = 0.2

export let frameCount = 0
let lastUpdate = performance.now()
const UPDATE_INTERVAL = 50

export let cameraX = 0
export let cameraY = 0
export function onDraw() {
   if (!socketReady || !initPacket) {
      ctx.font = "48px serif"
      ctx.fillText("Loading...", 10, 50)
      return
   }

   frameCount++
   if (chatOpen === false) {
      const movementVector = getMovementVector()
      playerPos = playerPos.addPos(movementVector.multiply(playerSpeed).multiply(deltaTime))
   }

   cameraX = playerPos.x - window.innerWidth / 2 + playerSize / 2
   cameraY = playerPos.y - window.innerHeight / 2 + playerSize / 2
   ctx.restore()
   ctx.save()
   ctx.translate(-cameraX, -cameraY)

   if (performance.now() - lastUpdate >= UPDATE_INTERVAL) {
      if (!serverPlayerPos.equals(playerPos)) {
         ws.send(
            JSON.stringify({
               type: "position-update",
               x: playerPos.x,
               y: playerPos.y
            })
         )
         lastUpdate = performance.now()
         serverPlayerPos = playerPos.clone()
      }
   }

   for (const gameObject of Object.values(gameObjects)) gameObject.draw()
}
