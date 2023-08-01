import "./style.css"
import { onDraw } from "./canvas"

const canvas = document.querySelector("canvas") as HTMLCanvasElement
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

window.addEventListener("resize", resize)
function resize() {
   canvas.width = document.body.clientWidth
   canvas.height = document.body.clientHeight
}
resize()

export let time: number
export let deltaTime: number
function renderLoop(_time: DOMHighResTimeStamp) {
   deltaTime = getDeltaTime(_time)
   time = _time

   ctx.clearRect(0, 0, canvas.width, canvas.height)
   onDraw()

   window.requestAnimationFrame(renderLoop)
}

let prevTime = 0
function getDeltaTime(time: DOMHighResTimeStamp) {
   const deltaTime = time - prevTime
   prevTime = time

   return deltaTime
}

renderLoop(0)
