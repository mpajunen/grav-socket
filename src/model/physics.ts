import { Ship } from './game'

export type Vector = {
  x: number
  y: number
}

export type Position = { position: Vector }

export type Velocity = { velocity: Vector }

export type Motion = Position & Velocity

export type Orientation = { orientation: number }

export type Mass = { mass: number }

export type Radius = { radius: number }

const GRAVITY_STRENGTH = 10

export const zero: Vector = { x: 0, y: 0 }

export const add = (v1: Vector, v2: Vector): Vector => ({ x: v1.x + v2.x, y: v1.y + v2.y })

export const subtract = (v1: Vector, v2: Vector): Vector => ({ x: v1.x - v2.x, y: v1.y - v2.y })

export const length = (vector: Vector): number => Math.sqrt(vector.x ** 2 + vector.y ** 2)

export const sum = (vectors: Vector[]): Vector => vectors.reduce(add, zero)

export const dotProduct = (vector: Vector, value: number): Vector => ({ x: vector.x * value, y: vector.y * value })

export const updateMotion = (motion: Motion, acceleration: Vector): Motion => {
  const velocity = add(motion.velocity, acceleration)
  const position = add(motion.position, velocity)

  return { position, velocity }
}

export const gravityAcceleration = (ship: Ship, source: Mass & Position & Radius): Vector => {
  const vector = subtract(ship.position, source.position)
  const distance = length(vector)
  if (distance < (ship.radius + source.radius)) {
    return zero
  }

  return dotProduct(vector, -GRAVITY_STRENGTH * source.mass / (distance ** 3))
}

export const applyCollision = (ship: Ship, source: Position & Radius): Ship => {
  const line = subtract(ship.position, source.position)
  const distance = length(line)
  if (distance > (ship.radius + source.radius)) {
    return ship
  }

  return { ...ship, position: ship.position, velocity: subtract(zero, ship.velocity) }
}
