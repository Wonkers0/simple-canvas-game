import handlePlayerConnect from "./networking/player-connect"
import handlePositionUpdate from "./networking/position-update"
import Vector from "./vector"

interface ServerConfig {
   address: string
}

export let ws: WebSocket
export let socketReady = false
export let players: Record<string, Player> = {}

export interface Player {
   id: string
   position: {
      x: number
      y: number
   }
   newPosition: {
      x: number
      y: number
   }
   movementDir?: Vector
}

export let initPacket: {
   type: "init"
   you: string
   players: Player[]
}

export async function connect() {
   const { address }: ServerConfig = await (await fetch("server.json")).json()

   ws = new WebSocket(address)
   ws.addEventListener("open", () => {
      console.log("connection established")
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

            for (const player of initPacket.players) {
               if (player.id != initPacket.you) players[player.id] = player
            }
            return
         }
         case "position-update":
            return handlePositionUpdate(data)
         case "player-connect":
            return handlePlayerConnect(data)
         case "player-disconnect":
            delete players[data.id]
      }
   })

   ws.addEventListener("close", () => {
      console.warn("socket disconnected")
      socketReady = false
   })
}
