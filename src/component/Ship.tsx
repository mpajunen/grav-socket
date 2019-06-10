import React from 'react'
import { Rect } from 'react-konva'
import * as Game from '../model/game'

type Props = {
  ship: Game.Ship
}

const EDGE = 50
const HALF_EDGE = EDGE / 2

const Ship: React.FC<Props> = ({ ship }) => {
  return (
    <Rect
      x={ship.position.x - HALF_EDGE}
      y={ship.position.y - HALF_EDGE}
      width={EDGE}
      height={EDGE}
      fill="black"
      shadowBlur={5}
    />
  )
}

export default Ship
