import { gameObjects } from "../../utilities/GameObject"
import { Player } from "../../types/player"

export default function handleChat(data: any) {
   const { id, message } = data
   const player: Player = gameObjects[id].data

   player.chatMessages.push({
      time: performance.now(),
      message
   })
}
