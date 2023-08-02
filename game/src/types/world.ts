export interface World {
   structures: Structure[]
}

export interface Structure {
   // Trees (for now, maybe more later)
   type: "tree"
   id: string
   position: Position
   data: {
      health: number
      size: number
   }
}

export interface Position {
   x: number
   y: number
}
