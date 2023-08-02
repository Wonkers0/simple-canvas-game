import { drawOtherPlayer } from "../../draw/player"
import GameObject, { gameObjects } from "../../utilities/GameObject"

export default function handlePlayerConnect(data: any) {
   gameObjects[data.id] = new GameObject(data.position, drawOtherPlayer, {
      id: data.id,
      newPosition: data.position,
      chatMessages: []
   })
}
