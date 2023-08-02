import { ctx } from "../main"
import { cameraX, cameraY, playerPos } from "./canvas"

const CELL_SIZE = 25
export default function drawBackground() {
   drawGrid(CELL_SIZE, "#d6d3d1", true)
   //drawGrid(CELL_SIZE * 5, "#a8a29e", false)
}

function drawGrid(size: number, stroke: string, fill: boolean) {
   ctx.beginPath()
   ctx.fillStyle = "white"
   ctx.strokeStyle = "#d6d3d1"
   ctx.lineWidth = 1
   ctx.shadowColor = "gray"
   ctx.shadowBlur = 20

   const startX = Math.floor(cameraX / size)
   for (let x = startX; x <= startX + Math.ceil(window.innerWidth / size); x++) {
      ctx.moveTo(x * size, cameraY)
      ctx.lineTo(x * size, cameraY + window.innerHeight)
      ctx.strokeStyle = x % 5 ? "#d6d3d1" : "#a8a29e"

      ctx.stroke()
      ctx.beginPath()
   }

   const startY = Math.floor(cameraY / size)
   for (let y = startY; y < startY + Math.ceil(window.innerHeight / size); y++) {
      ctx.moveTo(cameraX, y * size)
      ctx.lineTo(cameraX + window.innerWidth, y * size)
      ctx.strokeStyle = y % 5 ? "#d6d3d1" : "#a8a29e"

      ctx.stroke()
      ctx.beginPath()
   }

   if (fill) ctx.fill()
   ctx.stroke()

   ctx.shadowColor = "transparent"
   ctx.shadowBlur = 0
}
