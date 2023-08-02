import Vector from "./vector"

let inputs: string[] = []

document.addEventListener("keydown", (e) => {
   const key = e.key

   if (inputs.indexOf(key) == -1) inputs.push(key)
})

document.addEventListener("keyup", (e) => {
   const key = e.key
   inputs = inputs.filter((k) => k != key)
})

export function isKeyPressed(key: string) {
   return inputs.includes(key)
}

export function getInputAxis(negativeKey: string, positiveKey: string) {
   const negative = isKeyPressed(negativeKey)
   const positive = isKeyPressed(positiveKey)

   if (negative === positive) return 0 // (negative && positive) || (!negative && !positive)
   else return positive ? 1 : -1
}

export function getMovementVector() {
   const x = getInputAxis("a", "d")
   const y = getInputAxis("s", "w")
   return new Vector(x, -y)
}
