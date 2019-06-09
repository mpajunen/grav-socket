import { activeControls, Control } from '../control'
import {
  Acceleration,
  add,
  gravityAcceleration,
  Mass,
  Motion,
  Position,
  Radius,
  restingAt,
  sum,
  updateMotion,
  Vector,
} from './physics'

export type Body = Position & Mass & Radius

export type Player = {
  motion: Motion
}

export type State = {
  bodies: Body[]
  player: Player
}

export const TICK_RATE = 30
export const TICK_MS = 1000 / TICK_RATE

const START_POSITION: Vector = { x: 200, y: 200 }

export const initial: State = {
  bodies: [
    { p: { x: 300, y: 100 }, r: 30, m: 30 },
    { p: { x: 500, y: 600 }, r: 50, m: 100 },
    { p: { x: 100, y: 500 }, r: 30, m: 30 },
  ],
  player: {
    motion: restingAt(START_POSITION),
  },
}

export const tick = (keys: string[], game: State): State => {
  const controls = activeControls(keys)

  const player = updatePlayer(controls, game)

  return { ...game, player }
}

const updatePlayer = (controls: Control[], game: State): Player => {
  const acceleration = add(
    controlAcceleration(controls).a,
    sum(game.bodies.map(body => gravityAcceleration(game.player.motion, body).a)),
  )
  const motion = updateMotion(game.player.motion, { a: acceleration })

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
