import { ctx } from "../main"

export function getTrianglePath(x: number, y: number, size: number, deg: number = 0) {
   ctx.save()
   ctx.translate(x, y)
   ctx.rotate((deg * Math.PI) / 180)

   ctx.beginPath()
   ctx.moveTo(0, -size / Math.sqrt(3)) // Top vertex
   ctx.lineTo(-size / 2, size / (2 * Math.sqrt(3))) // Bottom left vertex
   ctx.lineTo(size / 2, size / (2 * Math.sqrt(3))) // Bottom right vertex
   ctx.closePath()

   ctx.restore()
}
