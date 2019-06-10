import { activeControls, Control } from '../control'
import {
  add,
  gravityAcceleration,
  Mass,
  Motion,
  Orientation,
  Position,
  Radius,
  sum,
  updateMotion,
  Vector,
  zero,
} from './physics'

export type Body = Position & Mass & Radius

export type Ship = Motion & Orientation

export type Player = {
  ship: Ship
}

export type State = {
  bodies: Body[]
  player: Player
}

export const TICK_RATE = 30
export const TICK_MS = 1000 / TICK_RATE

const TURN_RATE = 5 // Degrees / tick

const START_POSITION: Vector = { x: 200, y: 200 }

const FULL_CIRCLE = 360

const UPWARD = 90

export const degToRad = (deg: number): number => 2 * Math.PI / FULL_CIRCLE * deg

const createShip = (position: Vector): Ship => ({
  position,
  velocity: zero,
  orientation: UPWARD,
})

export const initial: State = {
  bodies: [
    { position: { x: 300, y: 100 }, radius: 30, mass: 30 },
    { position: { x: 500, y: 600 }, radius: 50, mass: 100 },
    { position: { x: 100, y: 500 }, radius: 30, mass: 30 },
  ],
  player: {
    ship: createShip(START_POSITION),
  },
}

export const tick = (keys: string[], game: State): State => {
  const controls = activeControls(keys)

  const player = updatePlayer(controls, game)

  return { ...game, player }
}

const updatePlayer = (controls: Control[], game: State): Player => {
  const orientation = changeOrientation(game.player.ship, controls)
  const acceleration = add(
    controlAcceleration({ orientation }, controls),
    sum(game.bodies.map(body => gravityAcceleration(game.player.ship, body))),
  )
  const ship: Ship = {
    ...game.player.ship,
    orientation,
    ...updateMotion(game.player.ship, acceleration),
  }

  return { ship }
}

const changeOrientation = ({ orientation }: Orientation, controls: Control[]): number => {
  const changed = orientation + orientationChange(controls)

  return changed >= FULL_CIRCLE ? changed - FULL_CIRCLE : changed < 0 ? changed + FULL_CIRCLE : changed
}

const orientationChange = (controls: Control[]): number => {
  const left = controls.includes('left')
  const right = controls.includes('right')

  return left && !right ? TURN_RATE : right && !left ? -TURN_RATE : 0
}

const controlAcceleration = ({ orientation }: Orientation, controls: Control[]): Vector => {
  // No reverse / deceleration at least for now
  if (!controls.includes('up')) {
    return zero
  }

  const rad = degToRad(orientation)

  return { x: Math.cos(rad), y: -Math.sin(rad) }
}
