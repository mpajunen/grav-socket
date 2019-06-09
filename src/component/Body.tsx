import React from 'react'
import { Circle } from 'react-konva'
import { Position, Radius } from '../model/physics'

type Props = {
  position: Position
  radius: Radius
}

const Body: React.FC<Props> = ({ position, radius }) => {
  return (
    <Circle
      radius={radius.r}
      x={position.p.x}
      y={position.p.y}
      fill="grey"
      shadowBlur={5}
    />
  )
}

export default Body
