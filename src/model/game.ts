import { activeControls, Control } from '../control'
import {
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

export type Ship = Motion

export type Player = {
  ship: Ship
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
    { position: { x: 300, y: 100 }, radius: 30, mass: 30 },
    { position: { x: 500, y: 600 }, radius: 50, mass: 100 },
    { position: { x: 100, y: 500 }, radius: 30, mass: 30 },
  ],
  player: {
    ship: restingAt(START_POSITION),
  },
}

export const tick = (keys: string[], game: State): State => {
  const controls = activeControls(keys)

  const player = updatePlayer(controls, game)

  return { ...game, player }
}

const updatePlayer = (controls: Control[], game: State): Player => {
  const acceleration = add(
    controlAcceleration(controls),
    sum(game.bodies.map(body => gravityAcceleration(game.player.ship, body))),
  )
  const ship = updateMotion(game.player.ship, acceleration)

  return { ship }
}

const units: Record<Control, Vector> = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
}

const controlAcceleration = (active: Control[]): Vector =>
  sum(active.map(control => units[control]))
