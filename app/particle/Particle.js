import 'pixi.js'

class Particle {

  constructor(pos, vel, radius) {
    this.vel = vel
    this.graphics = new PIXI.Graphics()
    this.graphics.x = pos.x
    this.graphics.y = pos.y
    this.radius = radius
  }

  update() {
    this.graphics.x += this.vel.x
    this.graphics.y += this.vel.y
  }

  draw() {
    this.graphics.beginFill(0xF20052)
    this.graphics.drawCircle(0.0, 0.0, this.radius)
    this.graphics.endFill()
  }
}

export default Particle
