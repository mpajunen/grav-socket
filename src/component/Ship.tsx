import React from 'react'
import { Rect } from 'react-konva'
import { Motion } from '../model/physics'

type Props = {
  motion: Motion
}

const EDGE = 50
const HALF_EDGE = EDGE / 2

const Ship: React.FC<Props> = ({ motion }) => {
  return (
    <Rect
      x={motion.p.x - HALF_EDGE}
      y={motion.p.y - HALF_EDGE}
      width={EDGE}
      height={EDGE}
      fill="black"
      shadowBlur={5}
    />
  )
}

export default Ship
