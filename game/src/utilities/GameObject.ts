import { Position } from "../types/world"
import { cameraX, cameraY } from "../draw/canvas"

export const gameObjects: Record<string, GameObject> = {}

export type DrawFunction = (gameObject: GameObject) => void
export default class GameObject {
   position: { x: number; y: number }
   private readonly drawFunc: DrawFunction
   data: any

   constructor(position: Position, drawFunc: DrawFunction, data: any) {
      this.position = position
      this.drawFunc = drawFunc
      this.data = data
   }

   draw() {
      this.drawFunc(this)
   }

   inBounds(sizeX: number, sizeY: number): boolean {
      return (
         this.position.x + sizeX > cameraX && // west
         this.position.x < cameraX + window.innerWidth && // east
         this.position.y < cameraY && // south
         this.position.y + sizeY > cameraY - window.innerHeight // north korea
      )
   }
}
