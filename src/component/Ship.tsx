import React from 'react'
import { Group, Wedge } from 'react-konva'
import * as Game from '../model/game'
import { degToRad } from '../model/game'

type Props = {
  ship: Game.Ship
}

const ANGLE = 32
const HALF_ANGLE = ANGLE / 2
const EDGE = 50
const HALF_EDGE = EDGE / 2

const X_ADJUST = -Math.cos(degToRad(HALF_ANGLE)) * HALF_EDGE
const Y_ADJUST = -Math.sin(degToRad(HALF_ANGLE)) * HALF_EDGE

const ROTATION_ADJUSTMENT = 180 - ANGLE / 2

const Ship: React.FC<Props> = ({ ship }) => {
  return (
    <Group
      x={ship.position.x}
      y={ship.position.y}
      rotation={ROTATION_ADJUSTMENT - ship.orientation}
    >
      <Wedge
        x={X_ADJUST}
        y={Y_ADJUST}
        angle={ANGLE}
        radius={EDGE}
        fill="black"
      />
    </Group>
  )
}

export default Ship
