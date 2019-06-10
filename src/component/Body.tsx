import React from 'react'
import { Circle } from 'react-konva'
import * as Game from '../model/game'

type Props = {
  body: Game.Body
}

const Body: React.FC<Props> = ({ body }) => {
  return (
    <Circle
      radius={body.radius}
      x={body.position.x}
      y={body.position.y}
      fill="grey"
      shadowBlur={5}
    />
  )
}

export default Body
