export interface Player {
   // This is only used for the init packet
   id: string
   position: {
      x: number
      y: number
   }
   newPosition: {
      x: number
      y: number
   }
   chatMessages: {
      time: number
      message: string
   }[]
}
