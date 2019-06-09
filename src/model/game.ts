import { activeControls, Control } from '../control'
import { Acceleration, Motion, restingAt, sum, updateMotion, Vector } from './physics'

export type Player = {
  motion: Motion
}

export type State = {
  player: Player
}

export const TICK_RATE = 30
export const TICK_MS = 1000 / TICK_RATE

const START_POSITION: Vector = { x: 200, y: 200 }

export const initial: State = {
  player: {
    motion: restingAt(START_POSITION),
  },
}

export const tick = (keys: string[], game: State): State => {
  const controls = activeControls(keys)

  const player = updatePlayer(controls, game.player)

  return { player }
}

const updatePlayer = (controls: Control[], player: Player): Player => {
  const acceleration = controlAcceleration(controls)
  const motion = updateMotion(player.motion, acceleration)

  return { motion }
}

const units: Record<Control, Vector> = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
}

const controlAcceleration = (active: Control[]): Acceleration =>
  ({ a: sum(active.map(control => units[control])) })
