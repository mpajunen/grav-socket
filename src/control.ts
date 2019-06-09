import { KeyboardEvent, useState } from 'react'

export type Control = 'left' | 'right' | 'up' | 'down'

export type ControlKey = 'w' | 'a' | 's' | 'd' | 'ArrowUp' | 'ArrowLeft' | 'ArrowDown' | 'ArrowRight'

export const usePressedKeys = () => {
  const [currentKeys, setKeys] = useState<string[]>([])
  const onDown = ({ key }: KeyboardEvent) => {
    setKeys(keys => keys.includes(key) ? keys : [...keys, key])
  }
  const onUp = ({ key }: KeyboardEvent) => {
    setKeys(keys => keys.filter(k => k !== key))
  }

  return { currentKeys, onDown, onUp }
}

export const activeControls = (keys: string[]): Control[] =>
  keys.flatMap(key => keyMap[key as ControlKey] ? [keyMap[key as ControlKey]] : [])

const keyMap: Record<ControlKey, Control> = {
  a: 'left',
  d: 'right',
  w: 'up',
  s: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
}
