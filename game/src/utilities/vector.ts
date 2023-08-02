export default class Vector {
   x: number
   y: number

   constructor(x: number, y: number) {
      this.x = x
      this.y = y
   }

   add(x: number, y: number) {
      return new Vector(this.x + x, this.y + y)
   }

   addPos(pos: Vector) {
      return new Vector(this.x + pos.x, this.y + pos.y)
   }

   subtract(x: number, y: number) {
      return new Vector(this.x - x, this.y - y)
   }

   subtractPos(pos: Vector) {
      return new Vector(this.x - pos.x, this.y - pos.y)
   }

   max(x: number, y: number) {
      return new Vector(
         x == null ? this.x : Math.max(x, this.x),
         y == null ? this.y : Math.max(y, this.y)
      )
   }

   min(x: number, y: number) {
      return new Vector(
         x == null ? this.x : Math.min(x, this.x),
         y == null ? this.y : Math.min(y, this.y)
      )
   }

   multiply(m: number) {
      return new Vector(this.x * m, this.y * m)
   }

   /**
    * sets the positions x coordinate and returns the same instance, does not create a new position.
    */
   setX(x: number) {
      this.x = x
      return this
   }

   /**
    * sets the positions y coordinate and returns the same instance, does not create a new position.
    */
   setY(y: number) {
      this.y = y
      return this
   }

   distanceSquared(other: Vector): number {
      const dx = Math.abs(this.x - other.x)
      const dy = Math.abs(this.y - other.y)

      return dx * dx + dy * dy
   }

   distance(other: Vector): number {
      return Math.sqrt(this.distanceSquared(other))
   }

   clone() {
      return new Vector(this.x, this.y)
   }

   equals(b: Vector) {
      return this.x === b.x && this.y === b.y
   }

   asPosition() {
      return {
         x: this.x,
         y: this.y
      }
   }
}
