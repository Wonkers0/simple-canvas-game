import { players } from "../client"

export default function handlePlayerConnect(data: any) {
   players[data.id] = {
      id: data.id,
      position: data.position,
      newPosition: data.position
   }
}
