import { initPacket, players } from "../client"
import { playerPos, serverPlayerPos } from "../canvas"

export default function handlePositionUpdate(data: any) {
   if (data.id == initPacket.you) {
      console.log("Server set your position to " + JSON.stringify(data.position))
      playerPos.setX(data.position.x).setY(data.position.z)
      serverPlayerPos.setX(data.position.x).setY(data.position.z)
   } else {
      const player = players[data.id]
      if (!player) {
         console.warn(`Server tried setting position for player ${data.id}, which does not exist.`)
         return
      }
      if (player.newPosition != undefined) player.position = player.newPosition

      Object.assign(player, {
         newPosition: data.position
      })
   }
}
