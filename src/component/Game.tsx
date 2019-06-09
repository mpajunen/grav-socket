import React, { useEffect, useState } from 'react'
import { Layer, Stage } from 'react-konva'
import { usePressedKeys } from '../control'
import { initial, tick, TICK_MS } from '../model/game'
import Ship from './Ship'

const Game: React.FC = () => {
  const { currentKeys, onDown, onUp } = usePressedKeys()
  const [state, setState] = useState(initial)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setState(s => tick(currentKeys, s))
    }, TICK_MS)

    return () => clearInterval(intervalId)
  }, [currentKeys])

  return (
    <div onKeyDown={onDown} onKeyUp={onUp} tabIndex={1}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Ship motion={state.player.motion} />
        </Layer>
      </Stage>
    </div>
  )
}

export default Game
