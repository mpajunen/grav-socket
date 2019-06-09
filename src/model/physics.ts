export type Vector = {
  x: number
  y: number
}

export type Position = { p: Vector }

export type Velocity = { v: Vector }

export type Acceleration = { a: Vector }

export type Motion = Position & Velocity & Acceleration

export type Mass = { m: number }

export type Radius = { r: number }

export const zero: Vector = { x: 0, y: 0 }

export const add = (v1: Vector, v2: Vector): Vector => ({ x: v1.x + v2.x, y: v1.y + v2.y })

export const sum = (vectors: Vector[]): Vector => vectors.reduce(add, zero)

export const updateVelocity = ({ a }: Acceleration, { v }: Velocity): Velocity => ({ v: add(a, v) })

export const updatePosition = ({ v }: Velocity, { p }: Position): Position => ({ p: add(v, p) })

export const updateMotion = (motion: Motion, acceleration: Acceleration): Motion => {
  const velocity = updateVelocity(acceleration, motion)
  const position = updatePosition(velocity, motion)

  return { p: position.p, v: velocity.v, a: acceleration.a }
}

export const restingAt = (vector: Vector): Motion => ({
  p: vector,
  v: zero,
  a: zero,
})
