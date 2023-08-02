import { ctx } from "../main"
import Vector from "./vector"

/**
 *
 * @param text the string to draw
 * @param x the x coordinate of the text
 * @param y the y coordinate of the text
 * @param size the font size in pixels
 * @param font the fontFamily
 * @param color the color of the text
 *
 * -- OPTIONALS --
 *
 * @param wrap the length at which the text should start to wrap to the next line. 0 = disable
 * @param anchor a string consisting of 2 letters, l = left, r = right, c = horizontal center, t = top, b = bottom, m = vertical center (middle), the order does not matter.
 * @param lineMargin the extra margin between two lines.
 * @param outlineWidth the width of the outline (EXPERIMENTAL)
 * @param outline the color of the outline (EXPERIMENTAL)
 * @param fontWeight the css font weight
 * @return an array [width, height]
 */
export function text(
   text: string,
   x: number | null,
   y: number | null,
   size: number,
   font: string,
   color: string,
   wrap = 0,
   anchor = "lt",
   lineMargin = 5,
   outlineWidth: number = 0,
   outline: string = "transparent",
   fontWeight?: string
) {
   function wrapFunc() {
      let words = text.split(" ")
      let lines = []
      let currentLine = words[0]

      for (let i = 1; i < words.length; i++) {
         let word = words[i]
         let width = ctx.measureText(currentLine + " " + word).width
         if (width < wrap) currentLine += " " + word
         else {
            lines.push(currentLine)
            currentLine = word
         }
      }
      lines.push(currentLine)
      return lines.join("\n")
   }

   const align_: any = {
      l: "left",
      r: "right",
      c: "center"
   }

   const baseline_: any = {
      t: "top",
      b: "bottom",
      m: "middle"
   }

   let align: unknown = ""
   let baseline: unknown = ""

   if (align_.hasOwnProperty(anchor[0])) {
      align = align_[anchor[0]]
      baseline = baseline_[anchor[1]]
   } else {
      align = align_[anchor[1]]
      baseline = baseline_[anchor[0]]
   }

   if (fontWeight) ctx.font = `${fontWeight} ${size}px ${font}`
   else ctx.font = `${size}px ${font}`
   ctx.fillStyle = color
   ctx.lineWidth = outlineWidth
   ctx.strokeStyle = outline
   ctx.textAlign = align as CanvasTextAlign
   ctx.textBaseline = baseline as CanvasTextBaseline

   const lines = wrap != 0 ? wrapFunc().split("\n") : text.split("\n")

   let offset = 0
   let peakWidth = 0
   for (const line of lines) {
      if (x != null && y != null) {
         ctx.fillText(line, x, y + offset)
         if (outlineWidth > 0) ctx.strokeText(line, x, y + offset)
      }

      const sizes = ctx.measureText(line)
      if (sizes.width > peakWidth) peakWidth = sizes.width
      offset += sizes.actualBoundingBoxDescent + lineMargin
   }

   return new Vector(peakWidth, offset)
}
