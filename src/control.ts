import { KeyboardEvent, useState } from 'react'

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
