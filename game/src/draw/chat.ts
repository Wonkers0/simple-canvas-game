import { text } from "../utilities/text"
import Vector from "../utilities/vector"
import { ctx } from "../main"
import { playerSize } from "./player"
import { frameCount } from "./canvas"
import { ws } from "../networking/client"
import { Player } from "../types/player"
import { initPacket } from "../networking/client"

export let chatOpen = false
export let message = ""
document.addEventListener("keydown", (e) => {
   if (e.key === "Enter") {
      if (chatOpen && message) {
         ws.send(
            JSON.stringify({
               type: "chat",
               message: message
            })
         )

         if (!initPacket.you.chatMessages) initPacket.you.chatMessages = []
         initPacket.you.chatMessages.splice(0, 0, {
            time: performance.now(),
            message
         })
      }

      chatOpen = !chatOpen
      message = ""
   }
   if (!chatOpen) return
   if (e.key == "Escape") chatOpen = false

   let key = e.key === "Space" ? " " : e.key
   if (e.getModifierState("Shift") || e.getModifierState("CapsLock")) key = key.toUpperCase()

   if (key === "Backspace") {
      const newMessage = message.split("")
      newMessage.pop()
      message = newMessage.join("")
   } else if (key.length === 1) message += key
})

export function drawChatBase(
   x: number | null,
   y: number | null,
   message: string,
   cursor = false
): number {
   function doText(x: number | null, y: number | null) {
      return text(message, x, y, 20, "Poppins", "white", 300, "ct", 5)
   }

   const textSize = doText(null, null)
   const baseSize = textSize.add(20, 20)
   if (x == null || y == null) return baseSize.y

   const textCenterTop = new Vector(x, y).add(playerSize / 2, -textSize.y - 20)

   const basePos = textCenterTop.subtract(textSize.x / 2, 0).subtract(10, 10)

   ctx.beginPath()
   ctx.fillStyle = "#525252"
   ctx.strokeStyle = "#373C3C"
   ctx.lineWidth = 3
   ctx.roundRect(basePos.x, basePos.y, baseSize.x, baseSize.y, 6)
   ctx.fill()
   ctx.stroke()

   doText(textCenterTop.x, textCenterTop.y)

   if (cursor) {
      const opacity = Math.sin((((frameCount % 60) * 2) / 120) * Math.PI)

      const pos = textCenterTop.add(textSize.x / 2, 0)
      const size = textSize.y

      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.fillRect(pos.x, pos.y, 1, size)
   }

   return baseSize.y
}

export function drawPlayerChat(x: number, y: number, player: Player) {
   if (!player.chatMessages) return
   player.chatMessages = player.chatMessages.filter(
      (message) => performance.now() - message.time < 5000
   )

   const isClient = player.id === initPacket.you.id
   let yOffset = isClient && chatOpen ? drawChatBase(null, null, message) + 15 : 0
   for (let i = 0; i < player.chatMessages.length; i++) {
      const chat = player.chatMessages[i]
      yOffset += drawChatBase(x, y - yOffset, chat.message) + 15
   }
}
