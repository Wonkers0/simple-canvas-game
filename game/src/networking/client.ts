import handlePlayerConnect from "./handlers/player-connect"
import handlePositionUpdate from "./handlers/position-update"
import handleChat from "./handlers/chat"
import { playerPos } from "../draw/canvas"
import { Player } from "../types/player"
import { World } from "../types/world"
import GameObject, { gameObjects } from "../utilities/GameObject"
import { drawSelf, drawOtherPlayer } from "../draw/player"
import getStructureDrawFunction from "../draw/structure"

interface ServerConfig {
   address: string
}

export let ws: WebSocket
export let socketReady = false

export let initPacket: {
   type: "init"
   you: Player
   players: Player[] // Other players
   world: World
}

export async function connect() {
   const { address }: ServerConfig = await (await fetch("server.json")).json()

   ws = new WebSocket(address)
   ws.addEventListener("open", () => {
      console.log("Connection Established")
      socketReady = true
   })

   ws.addEventListener("message", (e) => {
      const data = JSON.parse(e.data)
      if (data.type === "debug") return console.log(`[Server-Sent Debug] ${data.message}`)
      else console.warn(data.type)

      switch (data.type) {
         case "init": {
            console.log("Storing init packet")
            initPacket = data
            playerPos.setX(data.you.position.x).setY(data.you.position.y)
            gameObjects[data.you.id] = new GameObject(data.you.position, drawSelf, {})

            for (const player of initPacket.players) {
               gameObjects[player.id] = new GameObject(player.position, drawOtherPlayer, {
                  chatMessages: []
               })
            }

            for (const structure of initPacket.world.structures) {
               gameObjects[structure.id] = new GameObject(
                  structure.position,
                  getStructureDrawFunction(structure),
                  {
                     type: structure.type,
                     ...structure.data
                  }
               )
            }

            return
         }
         case "position-update":
            return handlePositionUpdate(data)
         case "player-connect":
            return handlePlayerConnect(data)
         case "player-disconnect":
            delete gameObjects[data.id]
            break
         case "chat":
            return handleChat(data)
      }
   })

   ws.addEventListener("close", () => {
      console.warn("socket disconnected")
      socketReady = false
   })
}
