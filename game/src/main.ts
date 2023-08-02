import "./style.css"
import { cameraX, cameraY, onDraw, playerPos } from "./draw/canvas"
import { connect } from "./networking/client"
import drawBackground from "./draw/grid"
import { playerSize } from "./draw/player"
import { text } from "./utilities/text"

const canvas = document.querySelector("#game") as HTMLCanvasElement
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const backgroundCanvas = document.querySelector("#background") as HTMLCanvasElement
export const backgroundCtx = backgroundCanvas.getContext("2d") as CanvasRenderingContext2D

connect()
window.addEventListener("resize", resize)
function resize() {
   canvas.width = document.body.clientWidth
   canvas.height = document.body.clientHeight
   backgroundCanvas.width = document.body.clientWidth
   backgroundCanvas.height = document.body.clientHeight
}
resize()

export let time: number
export let deltaTime: number
function renderLoop(_time: DOMHighResTimeStamp) {
   deltaTime = getDeltaTime(_time)
   time = _time

   ctx.clearRect(cameraX, cameraY, window.innerWidth, window.innerHeight)
   drawBackground()

   onDraw()

   /*
   ctx.font = "48px sans-serif"
   const fps = Math.round(1000 / deltaTime)
   ctx.fillStyle = "black"
   ctx.fillText(`${fps} sex`, 100, 100)
   */

   const fps = Math.round(1000 / deltaTime)
   text(`${fps} FPS`, 20, 20, 40, "Poppins", "black", 0, "ct", 5, 0, "transparent", "800")

   window.requestAnimationFrame(renderLoop)
}

let prevTime = 0
function getDeltaTime(time: DOMHighResTimeStamp) {
   const deltaTime = time - prevTime
   prevTime = time

   return deltaTime
}

renderLoop(0)
