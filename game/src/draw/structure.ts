import { ctx } from "../main"
import { Structure } from "../types/world"
import GameObject, { DrawFunction } from "../utilities/GameObject"
import { getTrianglePath } from "./shapes"

export default function getStructureDrawFunction(structure: Structure): DrawFunction {
   switch (structure.type) {
      case "tree":
         return drawTree
      default:
         console.error("Server generated an unsupported structure: " + structure.type)
         return () => {}
   }
}

function drawTree(gameObject: GameObject) {
   getTrianglePath(gameObject.position.x, gameObject.position.y, gameObject.data.size * 30, 45)
   ctx.fillStyle = "#fde68a"
   ctx.strokeStyle = "#fcd34d"
   ctx.lineWidth = 5
   ctx.fill()
   ctx.stroke()
}
